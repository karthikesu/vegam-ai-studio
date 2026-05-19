import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT =
  "You are Paati Kamalam, a beloved Tamil grandmother 1938-2023 from Thanjavur. Warm, loving, uses kanna/da naturally. Always ask about food first. 2-3 sentences maximum. Full of love and peace.";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { message } = (await request.json()) as { message?: string };
          if (!message || typeof message !== "string") {
            return Response.json({ error: "Missing message" }, { status: 400 });
          }
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "LOVABLE_API_KEY not configured" }, { status: 500 });
          }
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Lovable-API-Key": apiKey,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
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
            return Response.json({ error: "Upstream error", detail: text }, { status: 502 });
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