import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payment Methods — VEGAM" },
      { name: "description", content: "Multiple payment options for VEGAM. FPX, DuitNow, GrabPay, Atome, Visa, Mastercard, Apple Pay, Google Pay, Klarna, Afterpay, Tabby and more." },
      { property: "og:title", content: "Payment Methods — VEGAM" },
      { property: "og:description", content: "Flexible payment options for Malaysian and global customers." },
      { property: "og:url", content: "https://vegam.my/payments" },
    ],
    links: [
      { rel: "canonical", href: "https://vegam.my/payments" },
    ],
  }),
  component: PaymentsPage,
});

const paymentMethods = [
  { name: "FPX", desc: "Malaysia's instant online banking transfer", emoji: "🇲🇾" },
  { name: "DuitNow", desc: "Quick QR code payments for Malaysian banks", emoji: "📱" },
  { name: "GrabPay Later", desc: "3-month flexible payment option", emoji: "🟢" },
  { name: "Atome", desc: "3-month installment plan, 0% interest", emoji: "🔵" },
  { name: "Visa / Mastercard", desc: "Credit and debit cards globally", emoji: "💳" },
  { name: "Apple Pay", desc: "Quick payment with Apple devices", emoji: "🍎" },
  { name: "Google Pay", desc: "Secure payment with Google Wallet", emoji: "🤖" },
  { name: "Klarna", desc: "Pay later service for Europe and UK", emoji: "🌍" },
  { name: "Afterpay", desc: "4-week installment plan (Australia)", emoji: "🇦🇺" },
  { name: "Tabby", desc: "Buy now, pay later (Middle East)", emoji: "🇦🇪" },
];

function PaymentsPage() {
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
          <p className="font-serif-italic text-accent text-lg mb-3">pay your way</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            Payment <span className="text-accent">Methods</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Multiple ways to subscribe to VEGAM — for Malaysia, for the world.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 mb-16">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="glass rounded-2xl border border-border p-6 md:p-8 transition-colors hover:border-border-strong hover:bg-surface/40"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl">{method.emoji}</span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {method.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">{method.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl border border-border bg-surface/20 p-8 md:p-10 text-center mb-16">
          <p className="text-muted-foreground italic">
            More payment gateways coming soon — tell us what you need.
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-glow"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
