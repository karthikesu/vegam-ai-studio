import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "We Are VEGAM — VEGAM" },
      { name: "description", content: "VEGAM is a Malaysian AI website builder born in Kuala Lumpur. We make professional websites accessible to every Malaysian business." },
      { property: "og:title", content: "We Are VEGAM — VEGAM" },
      { property: "og:description", content: "Malaysian AI Website Builder — Built for Businesses Like Yours" },
      { property: "og:url", content: "https://global-tamil-ai.lovable.app/about" },
    ],
    links: [
      { rel: "canonical", href: "https://global-tamil-ai.lovable.app/about" },
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
          <p className="font-serif-italic text-accent text-lg mb-3">about us</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            We Are <span className="text-gradient-ember">VEGAM</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Malaysian AI Website Builder — Built for Businesses Like Yours
          </p>
        </header>
      </section>

      {/* Our Story */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="glass rounded-2xl border border-border p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
              Our Story
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-foreground/90 leading-relaxed text-lg text-balance">
            VEGAM was born in Kuala Lumpur with one mission — to make professional websites accessible to every Malaysian business, big or small. <span className="text-gradient-ember font-medium">Vegam</span> means <span className="text-gold font-medium">Speed</span> in Tamil. We build fast.
          </p>
        </div>
      </section>

      {/* Our Products */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
            Our Products
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ProductCard
            name="VEGAM.MY"
            desc="AI Website Builder"
            status="live"
          />
          <ProductCard
            name="UYIR AI"
            desc="Tamil Memorial Platform"
            status="soon"
          />
          <ProductCard
            name="SAKTHI"
            desc="WhatsApp AI Bot"
            status="soon"
          />
        </div>
      </section>

      {/* Our First Client */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="glass rounded-2xl border border-border p-8 md:p-10 text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium m-0">
              Our First Client
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-foreground/90 leading-relaxed text-lg text-balance">
            <span className="text-gradient-ember font-medium">Irama Hotel Kuala Lumpur</span> — Pre-opening hospitality technology partner since 2025
          </p>
        </div>
      </section>

      {/* Our Vision */}
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
            10 Malaysian businesses online by June 2026.<br />
            100 by December 2026.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  name,
  desc,
  status,
}: {
  name: string;
  desc: string;
  status: "live" | "soon";
}) {
  return (
    <div className="glass rounded-xl border border-border p-6 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
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
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}
