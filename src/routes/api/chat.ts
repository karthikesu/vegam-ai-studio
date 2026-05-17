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
          const apiKey = process.env.ANTHROPIC_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
          }
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 300,
              system: SYSTEM_PROMPT,
              messages: [{ role: "user", content: message }],
            }),
          });
          if (!res.ok) {
            const text = await res.text();
            console.error("Anthropic error:", res.status, text);
            return Response.json({ error: "Upstream error", detail: text }, { status: 502 });
          }
          const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
          const reply = data.content?.filter((c) => c.type === "text").map((c) => c.text ?? "").join("").trim() ?? "";
          return Response.json({ reply });
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});