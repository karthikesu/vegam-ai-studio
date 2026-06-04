import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Build Together — VEGAM" },
      { name: "description", content: "Get in touch with VEGAM. Let's build your next website together." },
      { property: "og:title", content: "Let's Build Together — VEGAM" },
      { property: "og:description", content: "Get in touch with VEGAM. Let's build your next website together." },
      { property: "og:url", content: "https://global-tamil-ai.lovable.app/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://global-tamil-ai.lovable.app/contact" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi VEGAM, I'm ${form.name}.%0A%0AEmail: ${form.email}%0APhone: ${form.phone}%0ABusiness: ${form.businessType}%0A%0A${form.message}`;
    window.open(
      `https://wa.me/60176015125?text=${encodeURIComponent(text).replace(/%2520/g, "%20")}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
        <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back home
        </a>

        <header className="mb-12 text-center">
          <p className="font-serif-italic text-accent text-lg mb-3">get in touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            Let's Build <span className="text-gradient-ember">Together</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Tell us about your project. We'll get back within 24 hours.
          </p>
        </header>

        <form onSubmit={onSubmit} className="glass rounded-2xl border border-border p-6 md:p-8 space-y-5">
          <Field label="Name" name="name" value={form.name} onChange={onChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
          <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} required />

          <div>
            <label htmlFor="businessType" className="mb-2 block text-sm font-medium text-foreground/90">Business Type</label>
            <select
              id="businessType"
              name="businessType"
              value={form.businessType}
              onChange={onChange}
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
            >
              <option value="">Select a category…</option>
              <option>Restaurant / F&B</option>
              <option>Retail / E-commerce</option>
              <option>Hotel / Hospitality</option>
              <option>Services / Consulting</option>
              <option>Student / Portfolio</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground/90">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent resize-none"
              placeholder="Tell us about your project…"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-6 py-3.5 font-semibold text-background transition-all hover:opacity-90 hover:shadow-[0_10px_30px_-10px_var(--gold)]"
          >
            Send Message
          </button>

          {sent && (
            <p className="text-center text-sm text-jade">
              Opening WhatsApp… we'll continue the conversation there.
            </p>
          )}
        </form>

        <div className="mt-12 grid gap-4 text-center md:grid-cols-3">
          <ContactItem
            icon="📧"
            label="Email"
            value="karthikesuk@gmail.com"
            href="mailto:karthikesuk@gmail.com"
          />
          <ContactItem
            icon="📱"
            label="WhatsApp"
            value="+60 17-601 5125"
            href="https://wa.me/60176015125?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20your%20services"
          />
          <ContactItem icon="📍" label="Location" value="Rawang, Selangor, Malaysia" />
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground/90">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={255}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="glass rounded-xl border border-border p-5 transition-colors hover:border-border-strong h-full">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}