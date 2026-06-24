import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "KARTS HOLDING — Parent Company of VEGAM" },
      { name: "description", content: "KARTS HOLDING — Building AI tools for the Tamil diaspora. Parent company of VEGAM, Sakthi, and Uyir AI." },
      { property: "og:title", content: "KARTS HOLDING — AI for the Tamil Diaspora" },
      { property: "og:description", content: "Empowering Tamil families and businesses with AI technology." },
      { property: "og:url", content: "https://vegam.my/about" },
    ],
    links: [
      { rel: "canonical", href: "https://vegam.my/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative mx-auto max-w-3xl px-6 pt-16 pb-8 md:pt-24">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>

        <header className="mb-16 text-center">
          <p className="font-serif-italic text-accent text-lg mb-3">who we are</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            KARTS <span className="text-gradient-ember">HOLDING</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            AI tools built for the Tamil diaspora — by Tamils, for Tamils, and for the world.
          </p>
        </header>
      </section>

      {/* Origin Story */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="glass rounded-2xl border border-border p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
              Our Origin
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-foreground/90 leading-relaxed text-lg text-balance">
            KARTS HOLDING was founded in Rawang, Selangor with a mission — to build powerful AI tools for Tamil families and businesses. Our products are named for their Tamil meanings: <span className="text-gold font-medium">Vegam</span> (Speed), <span className="text-gold font-medium">Sakthi</span> (Power), and <span className="text-gold font-medium">Uyir</span> (Soul). We believe technology should speak your language, preserve your heritage, and empower your dreams.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
            Our Founders
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FounderCard
            name="Karthikesu Kesavan"
            role="Founder & CEO"
            desc="Leading the vision to make AI accessible to Tamil families and businesses worldwide."
          />
          <FounderCard
            name="Hemalatha"
            role="Creative Director"
            desc="Bringing cultural authenticity and emotional depth to every product design."
          />
        </div>
      </section>

      {/* Product Family */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
            Product Family
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ProductCard
            name="VEGAM"
            tamil="வேகம் · Speed"
            desc="AI Website Builder"
            status="live"
          />
          <ProductCard
            name="SAKTHI"
            tamil="சக்தி · Power"
            desc="WhatsApp AI Commerce"
            status="live"
          />
          <ProductCard
            name="UYIR AI"
            tamil="உயிர் · Soul"
            desc="Tamil Memorial Platform"
            status="coming"
          />
        </div>
      </section>

      {/* Vision */}
      <section className="relative mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-2xl border border-border bg-gradient-ember p-8 md:p-10 text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-background/20" />
            <h2 className="text-xs uppercase tracking-widest text-background/70 font-medium m-0">
              Our Vision
            </h2>
            <div className="h-px flex-1 bg-background/20" />
          </div>
          <p className="text-background leading-relaxed text-xl font-display font-semibold tracking-tight text-balance">
            To empower 10,000 Tamil families and businesses with AI technology by 2027.<br />
            To preserve Tamil culture for generations to come.
          </p>
        </div>
      </section>
    </main>
  );
}

function FounderCard({
  name,
  role,
  desc,
}: {
  name: string;
  role: string;
  desc: string;
}) {
  return (
    <div className="glass rounded-xl border border-border p-6 md:p-8 transition-colors hover:border-border-strong hover:bg-surface/40">
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{role}</p>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductCard({
  name,
  tamil,
  desc,
  status,
}: {
  name: string;
  tamil: string;
  desc: string;
  status: "live" | "coming";
}) {
  return (
    <div className="glass rounded-xl border border-border p-6 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        {status === "live" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-jade/15 px-2.5 py-1 text-xs font-medium text-jade">
            <span className="h-1.5 w-1.5 rounded-full bg-jade animate-status-pulse" />
            Live
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>
      <p className="text-muted-foreground text-xs font-medium italic mb-2">{tamil}</p>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}
