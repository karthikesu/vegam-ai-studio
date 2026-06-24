import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — VEGAM" },
      { name: "description", content: "What VEGAM is building next — milestones for our AI website builder, Uyir AI memorial platform, and Sakthi WhatsApp bot." },
      { property: "og:title", content: "Roadmap — VEGAM" },
      { property: "og:description", content: "What we're building next at VEGAM." },
      { property: "og:url", content: "https://vegam.my/roadmap" },
    ],
    links: [
      { rel: "canonical", href: "https://vegam.my/roadmap" },
    ],
  }),
  component: RoadmapPage,
});

const MILESTONES = [
  {
    quarter: "Q2 2026",
    status: "shipping",
    title: "AI Website Builder v1",
    items: [
      "Conversational site generation in 60 seconds",
      "vegam.my subdomain + custom domain support",
      "Nila AI chatbot on every site",
    ],
  },
  {
    quarter: "Q3 2026",
    status: "next",
    title: "Uyir AI Memorial — Public Beta",
    items: [
      "Tamil voice cloning with ElevenLabs",
      "Photo-to-video memorial reels",
      "Family group chat with AI elder",
    ],
  },
  {
    quarter: "Q4 2026",
    status: "planned",
    title: "Sakthi WhatsApp Commerce",
    items: [
      "WhatsApp Business API integration",
      "DuitNow + FPX checkout in chat",
      "Multi-language: Tamil, Malay, English",
    ],
  },
  {
    quarter: "2027",
    status: "vision",
    title: "Global Expansion",
    items: [
      "Templates for 20+ industries",
      "Klarna, Afterpay, Tabby, Razorpay",
      "100+ Malaysian businesses live",
    ],
  },
];

function RoadmapPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative mx-auto max-w-3xl px-6 pt-16 pb-24 md:pt-24">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>

        <header className="mb-16 text-center">
          <p className="font-serif-italic text-accent text-lg mb-3">what's next</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            Our <span className="text-gradient-ember">Roadmap</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Where VEGAM is heading — and when.
          </p>
        </header>

        <div className="space-y-5">
          {MILESTONES.map((m) => (
            <div
              key={m.quarter}
              className="glass rounded-2xl border border-border p-6 md:p-8 transition-colors hover:border-border-strong"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {m.quarter}
                </span>
                <StatusPill status={m.status} />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground mb-4">
                {m.title}
              </h2>
              <ul className="space-y-2">
                {m.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/85">
                    <span className="text-accent mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    shipping: { label: "Shipping", cls: "bg-jade/15 text-jade" },
    next: { label: "Up Next", cls: "bg-accent/15 text-accent" },
    planned: { label: "Planned", cls: "bg-muted text-muted-foreground" },
    vision: { label: "Vision", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status] ?? map.planned;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}