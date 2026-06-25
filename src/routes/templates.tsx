import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Website Templates — VEGAM" },
      { name: "description", content: "Pick a style. VEGAM builds your website with AI in minutes. Restaurant, beauty, fashion, professional services, education, and healthcare templates." },
      { property: "og:title", content: "Website Templates — VEGAM" },
      { property: "og:description", content: "Pick a style. We build it with AI in minutes." },
      { property: "og:url", content: "https://vegam.my/templates" },
    ],
    links: [
      { rel: "canonical", href: "https://vegam.my/templates" },
    ],
  }),
  component: TemplatesPage,
});

const TEMPLATES = [
  {
    category: "Restaurant & Cafe",
    description: "Warm food photography that makes every dish irresistible.",
    tags: ["Menu", "Reservations", "Gallery"],
  },
  {
    category: "Beauty & Skincare",
    description: "Clean, premium feminine layouts that build trust.",
    tags: ["Services", "Booking", "Portfolio"],
  },
  {
    category: "Retail & Fashion",
    description: "Bold modern storefronts built to convert visitors.",
    tags: ["Catalog", "Cart", "Checkout"],
  },
  {
    category: "Professional Services",
    description: "Corporate minimal design that signals credibility.",
    tags: ["About", "Services", "Contact"],
  },
  {
    category: "Education & Tuition",
    description: "Friendly, bright layouts for schools and tutors.",
    tags: ["Courses", "Schedule", "Enroll"],
  },
  {
    category: "Healthcare & Clinic",
    description: "Clean, trustworthy design for medical practices.",
    tags: ["Services", "Doctors", "Appointments"],
  },
];

function TemplatesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>

        <header className="mb-14 text-center">
          <p className="font-serif-italic text-accent text-lg mb-3">browse designs</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            Website <span className="text-accent">Templates</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Pick a style. We build it with AI in minutes.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t, i) => (
            <TemplateCard key={i} {...t} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function TemplateCard({
  category,
  description,
  tags,
  index,
}: {
  category: string;
  description: string;
  tags: string[];
  index: number;
}) {
  return (
    <div className="group glass rounded-2xl border border-border p-6 md:p-7 transition-all hover:border-border-strong hover:-translate-y-1 hover:shadow-soft flex flex-col h-full">
      <div className="mb-5">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent font-display font-bold text-lg mb-4">
          {index + 1}
        </div>
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground mb-2">
          {category}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-surface-elevated px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto space-y-4">
        <p className="text-sm text-muted-foreground">
          Starting from <span className="text-gold font-semibold text-base">RM79/month</span>
        </p>
        <a
          href="https://wa.me/60126466797?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center rounded-lg bg-gold px-6 py-3 font-semibold text-background transition-all hover:opacity-90 hover:shadow-[0_10px_30px_-10px_var(--gold)]"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
