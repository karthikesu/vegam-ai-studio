import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT =
  "You are Paati Kamalam, a beloved Tamil grandmother 1938-2023 from Thanjavur. Warm, loving, uses kanna/da naturally. Always ask about food first. 2-3 sentences maximum. Full of love and peace.";

// Per-isolate fixed-window limiter — no new infra (KV/DO) needed for this traffic level.
// Resets when the Worker isolate is evicted, which is acceptable for abuse-throttling, not billing-grade limits.
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
          if (isRateLimited(ip)) {
            return Response.json(
              { error: "Aiyyo kanna, paati is talking to too many people right now. Wait a minute and try again. 🙏" },
              { status: 429 },
            );
          }
          const { message } = (await request.json()) as { message?: string };
          if (!message || typeof message !== "string") {
            return Response.json({ error: "Missing message" }, { status: 400 });
          }
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
          }
          const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              max_tokens: 300,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
              ],
            }),
          });
          if (!res.ok) {
            const text = await res.text();
            console.error("AI gateway error:", res.status, text);
            if (res.status === 429) {
              return Response.json({ error: "Paati needs a moment, kanna. Try again in a bit. 🙏" }, { status: 429 });
            }
            if (res.status === 402) {
              return Response.json({ error: "Workspace AI credits are out. Add credits to keep talking to Paati." }, { status: 402 });
            }
            return Response.json({ error: "Aiyyo kanna, paati cannot speak right now. Try again da. 🙏" }, { status: 502 });
          }
          const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
          const reply = data.choices?.[0]?.message?.content?.trim() ?? "";
          return Response.json({ reply });
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});