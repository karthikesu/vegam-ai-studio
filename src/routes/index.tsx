import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HeroOrb } from "@/components/HeroOrb";
import laptopImg from "@/assets/showcase-laptop.jpg";
import laptopVideo from "@/assets/showcase-laptop.mp4.asset.json";
const heroVideo = "/videos/showcase-stack.mp4";
const builderPreviewVideo = "/videos/builder-preview.mp4";
const kioskVideo = "/videos/kiosk-final.mp4";
const lavaVideo = "/videos/lava-waterfall.mp4";
import phoneImg from "@/assets/showcase-phone.jpg";
import tabletImg from "@/assets/showcase-tablet.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEGAM — Build Fast. Grow Global." },
      {
        name: "description",
        content:
          "AI website builder for Malaysia and the global Tamil diaspora. Tell our AI your idea — watch your website build itself live in 60 seconds.",
      },
      { property: "og:title", content: "VEGAM — Build Fast. Grow Global." },
      {
        property: "og:description",
        content:
          "Premium AI website builder. Made in Malaysia. For the world.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vegam.my/" },
    ],
    links: [
      { rel: "canonical", href: "https://vegam.my/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "VEGAM AI Website Builder",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "AI website builder for Malaysia and the global Tamil diaspora. Build a premium website in 60 seconds.",
          url: "https://vegam.my/",
          offers: [
            { "@type": "Offer", name: "VIDHAI (Starter)", price: "79", priceCurrency: "MYR" },
            { "@type": "Offer", name: "VĒR (Most Popular)", price: "199", priceCurrency: "MYR" },
            { "@type": "Offer", name: "MARAM (Business)", price: "399", priceCurrency: "MYR" },
            { "@type": "Offer", name: "KALVI (Student)", price: "29", priceCurrency: "MYR" },
          ],
        }),
      },
    ],
  }),
  component: VegamLanding,
});

const features = [
  { n: "01", icon: "🤖", title: "AI Website Builder", desc: "Describe your business. Watch a premium website generate live. No code. No designers. Zero learning curve." },
  { n: "02", icon: "⚡", title: "Live Preview", desc: "Every change updates instantly as you speak to the AI. What you see is exactly what your customers see." },
  { n: "03", icon: "💬", title: "Nila AI Chatbot", desc: "Every site gets its own AI assistant. Tamil. Malay. English. Converts visitors to buyers 24/7 while you sleep." },
  { n: "04", icon: "🌍", title: "Global Payments", desc: "DuitNow + FPX for Malaysia. Stripe, Klarna, Afterpay for the world. Every currency. Every method." },
  { n: "05", icon: "🎓", title: "Student Kalvi Tier", desc: "70% off with valid student ID. All Malaysian universities accepted. Your future starts at student prices." },
  { n: "06", icon: "🪔", title: "Uyir AI Memorial", desc: "The world's first Tamil soul preservation platform. Upload voice, photo, stories. Family talks to them forever." },
];

const marquee = ["⚡ AI Website Builder", "🪔 Uyir AI Memorial", "💬 Sakthi WhatsApp Bot", "🌍 Global Payments", "🎓 Student Kalvi Tier", "🇲🇾 Made in Malaysia", "🔱 Murugan Vazhga"];

const showcase = [
  { img: phoneImg, brand: "Uyir AI", sub: "Tamil Memorial Platform", tags: ["Claude AI", "ElevenLabs", "D-ID"], badge: "World First", badge2: "Full Platform — Coming Soon", title: "Uyir AI Memorial", desc: "Try the live demo above — chat with Paati Kamalam right now. The full platform (upload your own family's photos, voice & stories) is still in development.", href: "#paati" },
  { img: laptopImg, brand: "Irama HK", sub: "Hotel Management System", tags: ["Real-time", "Supabase", "Live"], badge: "Running Live", title: "Irama Housekeeping System", desc: "Full hotel housekeeping ops", href: "https://karthikesu.github.io/Irama/hk-login.html", status: "Live", cta: "View System" },
  { img: tabletImg, video: kioskVideo, brand: "Irama Kiosk", sub: "Cafeteria Feedback System", tags: ["Tablet UI", "Analytics", "QR Codes"], badge: "Running Live", title: "Cafeteria Feedback Kiosk", desc: "Touch-screen satisfaction surveys", href: "https://karthikesu.github.io/Irama/", status: "Live", cta: "View Kiosk" },
];

const plans = [
  { tier: "Starter", name: "VIDHAI", tamil: "விதை · The Seed", price: "RM 79", per: "per month", feats: [["1 Website", "AI Builder Basic"], ["5 Pages", "vegam.my Subdomain"], ["Nila AI Chat", "Basic"], ["Email Support"]], cta: "Get Started" },
  { tier: "Most Popular", name: "VĒR", tamil: "வேர் · The Root", price: "RM 199", per: "per month", feats: [["3 Websites", "AI Builder Full"], ["Unlimited Pages", "Custom Domain"], ["Nila AI Chat", "Pro"], ["Priority Support"]], featured: true, style: "solid", cta: "Get Started" },
  { tier: "Business", name: "MARAM", tamil: "மரம் · The Tree", price: "RM 399", per: "per month", feats: [["10 Websites", "AI Builder Pro"], ["E-Commerce", "Global Payments"], ["Klarna + Afterpay"], ["Dedicated Manager"]], style: "solid", cta: "Get Started" },
  { tier: "Enterprise", name: "KĀDU", tamil: "காடு · The Forest", price: "Custom", per: "tailored pricing", feats: [["Unlimited Sites", "Dedicated AI"], ["White Label", "API Access"], ["Custom Integrations"], ["24/7 Support"]], cta: "Contact Sales" },
  { tier: "🎓 Student", name: "KALVI", tamil: "கல்வி · Education", price: "RM 29", per: "/ month · 70% off", feats: [["2 Websites", "AI Builder Full"], ["Portfolio Template", "Student Verified"], ["Priority Onboarding"], ["Community Access"]], style: "gold", cta: "Get Started" },
];

const payments = ["🇲🇾 FPX / DuitNow","🟢 GrabPay Later","🔵 Atome 3x","💳 Visa / Mastercard","🍎 Apple Pay","🤖 Google Pay","🌍 Klarna (EU/UK)","🇦🇺 Afterpay","🇦🇪 Tabby"];

function VegamLanding() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  type PaatiMsg = { role: "user" | "paati"; text: string };
  const [paatiMessages, setPaatiMessages] = useState<PaatiMsg[]>([
    { role: "paati", text: "Kanna… is that you? Come sit with me. Saaptingala? Have you eaten? 🙏" },
    { role: "user", text: "Paati I miss you so much" },
    { role: "paati", text: "Aiyyo kanna, I miss you every day. But I am always here — in your heart, in your kitchen, in the jasmine you smell. 🌸" },
  ]);
  const [paatiInput, setPaatiInput] = useState("");
  const [paatiLoading, setPaatiLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const sendPaati = async () => {
    const text = paatiInput.trim();
    if (!text || paatiLoading) return;
    setPaatiMessages((m) => [...m, { role: "user", text }]);
    setPaatiInput("");
    setPaatiLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setPaatiMessages((m) => [
        ...m,
        { role: "paati", text: data.reply || "Aiyyo kanna, paati cannot speak right now. Try again da. 🙏" },
      ]);
    } catch {
      setPaatiMessages((m) => [...m, { role: "paati", text: "Aiyyo kanna, paati cannot speak right now. Try again da. 🙏" }]);
    } finally {
      setPaatiLoading(false);
    }
  };

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(".h1-line", { y: 0, duration: 1.2, stagger: 0.08 }, 0)
      .to(".hero-label, .hero-sub, .hero-ctas, .scroll-hint", { opacity: 1, duration: 0.8, stagger: 0.12 }, 0.4);

    // Reveal on scroll
    const els = document.querySelectorAll<HTMLElement>(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(e.target, { opacity: 1, y: 0, x: 0, duration: 1, ease: "expo.out" });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    // Custom cursor (desktop only)
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return () => io.disconnect();

    document.body.style.cursor = "none";
    const dot = cursorDot.current!;
    const ring = cursorRing.current!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.05 });
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const hovers = document.querySelectorAll<HTMLElement>("a, button, .cursor-hover");
    const enter = () => ring.classList.add("scale-150", "border-accent");
    const leave = () => ring.classList.remove("scale-150", "border-accent");
    hovers.forEach((h) => { h.addEventListener("mouseenter", enter); h.addEventListener("mouseleave", leave); });

    window.addEventListener("mousemove", onMove);

    // Tilt-on-hover for cards
    const tiltEls = document.querySelectorAll<HTMLElement>(".tilt");
    const tiltHandlers: Array<{ el: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    tiltEls.forEach((el) => {
      const m = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 1000, duration: 0.4, ease: "power2.out" });
      };
      const l = () => { gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" }); };
      el.addEventListener("mousemove", m);
      el.addEventListener("mouseleave", l);
      tiltHandlers.push({ el, m, l });
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      hovers.forEach((h) => { h.removeEventListener("mouseenter", enter); h.removeEventListener("mouseleave", leave); });
      tiltHandlers.forEach(({ el, m, l }) => { el.removeEventListener("mousemove", m); el.removeEventListener("mouseleave", l); });
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* SVG goo filter for liquid effect */}
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Ambient mesh background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-mesh" />

      {/* REAL LAVA WATERFALL — cinematic video flowing down both sides */}
      <div className="pointer-events-none fixed top-0 bottom-0 left-0 z-[1] w-[140px] hidden md:block overflow-hidden" aria-hidden>
        <video src={lavaVideo} autoPlay loop muted playsInline
          className="h-full w-full object-cover"
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 55%, transparent 100%)",
            maskImage: "linear-gradient(90deg, #000 0%, #000 55%, transparent 100%)",
            filter: "saturate(1.2) contrast(1.05)",
          }}
        />
      </div>
      <div className="pointer-events-none fixed top-0 bottom-0 right-0 z-[1] w-[120px] hidden lg:block overflow-hidden" aria-hidden>
        <video src={lavaVideo} autoPlay loop muted playsInline
          className="h-full w-full object-cover scale-x-[-1]"
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 55%, transparent 100%)",
            maskImage: "linear-gradient(90deg, #000 0%, #000 55%, transparent 100%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Liquid ember blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60">
        <div className="goo absolute inset-0">
          <div className="animate-blob-1 absolute left-[8%] top-[18%] h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.68 0.22 38 / 0.55), transparent 70%)" }} />
          <div className="animate-blob-2 absolute right-[6%] top-[42%] h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.78 0.19 50 / 0.45), transparent 70%)" }} />
          <div className="animate-blob-3 absolute left-[32%] bottom-[8%] h-[360px] w-[360px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 280 / 0.35), transparent 70%)" }} />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* Custom cursor */}
      <div ref={cursorDot} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground hidden md:block" />
      <div ref={cursorRing} className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-foreground/30 transition-[transform,border-color] duration-200 hidden md:block" />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/70 px-6 py-5 backdrop-blur-md md:px-12 md:py-6">
        <a href="#top" className="flex items-center gap-3"><img src="/VEGAM.LOGO.png" alt="VEGAM" className="h-8 w-auto" /><span className="font-display text-lg font-extrabold uppercase tracking-[0.18em] hidden sm:inline">VEGAM</span></a>
        <div className="flex items-center gap-6 md:gap-10">
          <a href="#features" className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition hover:text-foreground md:inline">Features</a>
          <a href="#showcase" className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition hover:text-foreground md:inline">Showcase</a>
          <a href="#pricing" className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition hover:text-foreground md:inline">Pricing</a>
          <Link to="/templates" className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition hover:text-foreground md:inline">Templates</Link>
          <Link to="/about" className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition hover:text-foreground md:inline">About</Link>
          <a href="https://wa.me/60126466797?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" className="rounded-full border border-foreground/30 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/60 transition hover:border-foreground hover:text-foreground">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* 3D crystal behind text */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
          <HeroOrb />
        </div>
        {/* radial dim mask so text reads */}
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse at center, transparent 0%, oklch(0.04 0 0 / 0.5) 50%, oklch(0.04 0 0 / 0.85) 100%)" }} />

        <div className="relative z-10 flex flex-col items-center">
        <div className="hero-label flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground opacity-0">
          <span className="h-px w-8 bg-muted-foreground" />
          வேகம் · vegam.my · AI Website Builder
        </div>

        <h1 className="mt-9 text-balance">
          <span className="block overflow-hidden">
            <span className="h1-line block translate-y-full font-display text-[clamp(48px,8.5vw,128px)] font-extrabold leading-[0.92] tracking-[-0.01em]">Build Fast.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="h1-line block translate-y-full font-serif-italic text-[clamp(52px,9.5vw,140px)] font-normal leading-[0.92] text-accent">Grow Global.</span>
          </span>
        </h1>

        <p className="hero-sub mx-auto mt-9 max-w-[540px] text-[15px] font-light leading-[1.7] text-muted-foreground opacity-0 md:text-[18px]">
          Tell our AI your idea. Your website goes live — <span className="text-foreground">in 60 seconds.</span>
          <br />For Malaysia. For 77 million Tamils. For the world.
        </p>

        <div className="hero-ctas mt-12 flex flex-wrap items-center justify-center gap-3 opacity-0">
          <a href="https://wa.me/60126466797?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20starting%20a%20free%20trial" target="_blank" rel="noopener noreferrer" className="rounded-full bg-foreground px-9 py-4 text-[13px] font-medium tracking-wide text-background transition-all hover:scale-[1.04] hover:bg-accent hover:text-accent-foreground">Start Free Trial</a>
          <button onClick={() => setShowDemo(true)} className="rounded-full border border-border-strong px-9 py-4 text-[13px] tracking-wide transition-all hover:scale-[1.04] hover:border-foreground/60">See Live Demo</button>
        </div>
        </div>

        <div className="scroll-hint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 opacity-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</p>
          <div className="animate-scroll-arrow h-12 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 overflow-hidden border-y border-border bg-background py-6">
        <div className="animate-marquee flex w-max gap-16">
          {[...marquee, ...marquee, ...marquee].map((m, i) => (
            <div key={i} className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-foreground/25 whitespace-nowrap">{m}</div>
          ))}
        </div>
      </div>

      {/* APPLE-STYLE BIG PRODUCT REVEAL */}
      <section className="relative z-10 overflow-hidden px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl text-center">
          <div className="rv flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            <span className="h-px w-6 bg-accent" />The Builder
          </div>
          <h2 className="rv mt-6 font-display text-[clamp(40px,7vw,96px)] font-extrabold leading-[0.9]" style={{opacity:0,transform:"translateY(40px)"}}>
            One canvas.<br /><span className="font-serif-italic text-shimmer">Infinite sites.</span>
          </h2>
          <p className="rv mx-auto mt-6 max-w-xl text-[15px] font-light leading-[1.8] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            A studio-grade AI builder. Speak. Watch your brand assemble itself in real time — pixel-perfect, production-ready, deployed.
          </p>

          <div className="rv tilt relative mx-auto mt-20 max-w-6xl" style={{opacity:0,transform:"translateY(60px)", transformStyle:"preserve-3d"}}>
            {/* Ember halo bleeding into page */}
            <div className="pointer-events-none absolute -inset-24 -z-10 opacity-80 blur-3xl" style={{ background: "radial-gradient(ellipse at center, oklch(0.68 0.22 38 / 0.45), transparent 65%)" }} />
            {/* Frameless transparent video — black is keyed out so lava + orb show through */}
            <div className="relative">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-[80vh] max-h-[760px] w-full object-cover"
                style={{
                  mixBlendMode: "screen",
                  WebkitMaskImage: "radial-gradient(ellipse 92% 88% at center, #000 60%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 92% 88% at center, #000 60%, transparent 100%)",
                  filter: "saturate(1.15) contrast(1.05)",
                }}
                aria-label="VEGAM — floating website panels"
              />

              {/* READABLE MOCK WEBSITE OVERLAY — translucent so lava/orb bleed through */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[min(720px,82%)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-foreground/15 bg-background/25 p-8 backdrop-blur-md md:block">
                {/* faux browser chrome */}
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-jade/80" />
                  <div className="ml-3 flex-1 rounded-md bg-surface px-3 py-1 text-left text-[11px] text-muted-foreground">
                    vegam.my / your-brand
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-jade animate-status-pulse" />
                </div>
                {/* faux site content */}
                <div className="grid grid-cols-3 gap-4 pt-5 text-left">
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-accent">Live Preview</p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-foreground">
                      Your Brand,<br/><span className="font-serif-italic text-accent">Built in 60 seconds.</span>
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                      Speak your idea. VEGAM's AI assembles a production-ready site — pixel-perfect, deployed to the edge.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-foreground px-3 py-1.5 text-[10px] font-medium text-background">Get Started</span>
                      <span className="rounded-full border border-border-strong px-3 py-1.5 text-[10px] text-foreground/80">Demo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-border bg-surface/30 p-2.5 backdrop-blur-sm">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Visitors</p>
                      <p className="font-display text-lg font-bold text-foreground">12,840</p>
                    </div>
                    <div className="rounded-lg border border-border bg-surface/30 p-2.5 backdrop-blur-sm">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Conversions</p>
                      <p className="font-display text-lg font-bold text-accent">+38%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating spec chips */}
            <div className="absolute -left-4 top-12 hidden rounded-full border border-border-strong glass px-4 py-2 text-[11px] tracking-wide text-foreground/80 shadow-soft md:flex md:items-center md:gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-jade animate-status-pulse" /> Live preview
            </div>
            <div className="absolute -right-4 top-32 hidden rounded-full border border-border-strong glass px-4 py-2 text-[11px] tracking-wide text-foreground/80 shadow-soft md:block">
              ⚡ 60 second deploy
            </div>
            <div className="absolute -right-6 bottom-16 hidden rounded-full border border-border-strong glass px-4 py-2 text-[11px] tracking-wide text-foreground/80 shadow-soft md:block">
              🌍 Edge-rendered
            </div>
          </div>

          {/* Stat row */}
          <div className="rv mt-24 grid grid-cols-2 gap-px border border-border/60 bg-border/30 md:grid-cols-4" style={{opacity:0,transform:"translateY(40px)"}}>
            {[
              { n: "60s", l: "to first deploy" },
              { n: "77M", l: "Tamils worldwide" },
              { n: "10+", l: "payment methods" },
              { n: "0", l: "lines of code" },
            ].map((s) => (
              <div key={s.l} className="bg-background px-6 py-10 transition-colors hover:bg-surface/40">
                <div className="font-display text-[40px] font-extrabold leading-none text-foreground">{s.n}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="rv flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            <span className="h-px w-6 bg-accent" />Arsenal
          </div>
          <h2 className="rv mt-6 font-display text-[clamp(40px,6vw,80px)] font-extrabold leading-[0.95]" style={{opacity:0,transform:"translateY(40px)"}}>
            Everything<br /><span className="text-stroke">you need.</span>
          </h2>

          <div className="mt-20 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.n} className="group cursor-hover relative overflow-hidden bg-background/30 backdrop-blur-md p-12 transition-colors hover:bg-accent/10">
                <div className="font-display text-[11px] tracking-[0.3em] text-accent/50">{f.n}</div>
                <div className="mt-8 text-3xl grayscale transition-[filter] duration-300 group-hover:grayscale-0">{f.icon}</div>
                <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-3 text-[14px] font-light leading-[1.8] text-muted-foreground">{f.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UYIR SHOWCASE */}
      <section className="relative z-10 overflow-hidden border-y border-border bg-surface/20 backdrop-blur-sm py-32 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-12">
          <div>
            <div className="rv flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground" style={{opacity:0,transform:"translateX(-40px)"}}>
              <span className="h-px w-6 bg-accent" />World First Template
            </div>
            <h3 className="rv mt-6 font-display text-[clamp(36px,5vw,64px)] font-extrabold leading-[0.95]" style={{opacity:0,transform:"translateX(-40px)"}}>
              Uyir AI<br /><span className="text-accent">Memorial</span>
            </h3>
            <p className="rv mt-6 text-[15px] font-light leading-[1.85] text-muted-foreground" style={{opacity:0,transform:"translateX(-40px)"}}>
              Their voice. Their face. Their stories. Preserved forever. Your family talks to them — in Tamil, in their actual voice, through AI. Built for 77 million Tamil families worldwide.
            </p>
            <ul className="rv mt-8 flex flex-col gap-3 text-[13px] text-foreground/60" style={{opacity:0,transform:"translateX(-40px)"}}>
              {["AI writes their life story from your memories","ElevenLabs voice clone — hear them again","D-ID avatar — see them speak in video","Claude AI chat — talk to them, they remember"].map((x) => (
                <li key={x} className="flex items-center gap-3 border-b border-border pb-3 last:border-0"><span className="h-px w-2 bg-accent" />{x}</li>
              ))}
            </ul>
            <a href="https://wa.me/60126466797?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20the%20Uyir%20AI%20Memorial%20template" target="_blank" rel="noopener noreferrer" className="rv mt-9 inline-block rounded-full bg-gradient-ember px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-accent-foreground shadow-ember transition hover:scale-[1.02] hover:shadow-lg">
              Get This Template
            </a>
          </div>

          {/* Memorial chat card */}
          <div className="rv glass relative overflow-hidden rounded-3xl border border-border shadow-soft" style={{opacity:0,transform:"translateX(40px)"}}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="flex items-center gap-4 border-b border-border p-7">
              <div className="animate-ember-glow flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 text-2xl" style={{ background: "radial-gradient(circle at 30% 30%, oklch(0.68 0.22 38 / 0.4), transparent 60%)" }}>
                🙏
              </div>
              <div>
                <div className="font-display text-[17px] font-bold">Paati Kamalam</div>
                <div className="text-[11px] tracking-wide text-muted-foreground">1938 – 2023 · Thanjavur, Tamil Nadu</div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-jade">
                <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-jade" />Active
              </div>
            </div>
            <div className="flex min-h-[220px] flex-col gap-3 p-6">
              {paatiMessages.map((m, i) =>
                m.role === "paati" ? (
                  <div key={i} className="max-w-[85%] self-start rounded-[4px_14px_14px_14px] border border-border bg-foreground/5 px-4 py-3 text-[13px] italic leading-[1.65] text-foreground/80">{m.text}</div>
                ) : (
                  <div key={i} className="max-w-[85%] self-end rounded-[14px_4px_14px_14px] bg-accent px-4 py-3 text-[13px] text-accent-foreground">{m.text}</div>
                )
              )}
              {paatiLoading && (
                <div className="max-w-[85%] self-start rounded-[4px_14px_14px_14px] border border-border bg-foreground/5 px-4 py-3 text-[13px] italic leading-[1.65] text-foreground/50">Paati is thinking...</div>
              )}
            </div>
            <div className="flex items-center gap-2 border-t border-border p-4">
              <input
                value={paatiInput}
                onChange={(e) => setPaatiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void sendPaati(); } }}
                disabled={paatiLoading}
                className="flex-1 bg-transparent px-2 text-[13px] outline-none placeholder:text-foreground/20"
                placeholder="Type a message to Paati..."
              />
              <button
                onClick={() => void sendPaati()}
                disabled={paatiLoading || !paatiInput.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-accent-foreground transition hover:scale-110 hover:bg-accent-glow disabled:opacity-40 disabled:hover:scale-100"
              >↑</button>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE GRID */}
      <section id="showcase" className="relative z-10 px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="rv flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            <span className="h-px w-6 bg-accent" />Real Work
          </div>
          <h2 className="rv mt-6 font-display text-[clamp(40px,6vw,80px)] font-extrabold leading-[0.95]" style={{opacity:0,transform:"translateY(40px)"}}>
            Built by us.<br /><span className="text-stroke">Running live.</span>
          </h2>
          <p className="rv mt-6 max-w-2xl text-[15px] font-light leading-[1.8] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            We don't just build templates. These are real systems, running in a real hotel in Malaysia right now. This is VEGAM's standard.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {showcase.map((s) => (
              <a key={s.title} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined} className="rv tilt group flex flex-col overflow-hidden rounded-2xl border border-border transition hover:border-foreground/40" style={{opacity:0,transform:"translateY(40px)"}}>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                  {s.video ? (
                    <video src={s.video} autoPlay loop muted playsInline className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <img src={s.img} alt={s.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-border-strong bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur">{s.badge}</div>
                  {s.badge2 && <div className="absolute left-5 top-14 rounded-full border border-border-strong bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">{s.badge2}</div>}
                </div>
                <div className="p-7">
                  <div className="font-display text-base font-bold">{s.brand}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.sub}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-1 text-[10px] tracking-wide text-foreground/60">{t}</span>
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-[13px] font-light leading-[1.7] text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[12px]">
                    <span className="flex items-center gap-2 text-jade"><span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-jade" />{s.status}</span>
                    <span className="text-foreground/60 transition group-hover:text-accent">{s.cta}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="rv mt-16 rounded-2xl border border-border bg-surface/30 backdrop-blur-md p-10 text-center" style={{opacity:0,transform:"translateY(40px)"}}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Built With</div>
            <p className="mx-auto mt-5 max-w-2xl font-display text-xl italic text-foreground/80 md:text-2xl">
              "We don't sell templates.<br />We build real systems that run real businesses."
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 border-t border-border bg-surface/20 backdrop-blur-sm px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="rv flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>
            <span className="h-px w-6 bg-accent" />Plans
          </div>
          <h2 className="rv mt-6 font-display text-[clamp(40px,6vw,80px)] font-extrabold leading-[0.95]" style={{opacity:0,transform:"translateY(40px)"}}>
            Choose your<br /><span className="text-stroke">power tier.</span>
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 sm:grid-cols-2 lg:grid-cols-5">
            {plans.map((p) => (
              <div key={p.name} className={`relative flex cursor-hover flex-col p-7 backdrop-blur-md transition-all ${p.featured ? "z-10 scale-[1.05] bg-surface-elevated/60 shadow-ember ring-1 ring-accent/40 md:scale-[1.08]" : "bg-background/25 hover:bg-surface/40"}`}>
                {p.featured && <div className="absolute inset-x-0 top-0 bg-gradient-ember py-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-accent-foreground">Most Popular</div>}
                {p.style === "gold" && <div className="mb-3 inline-block w-fit rounded-full border border-gold/40 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-gold">{p.tier}</div>}
                <div className={`text-[9px] uppercase tracking-[0.35em] text-muted-foreground ${p.featured ? "mt-6" : ""} ${p.style === "gold" ? "hidden" : ""}`}>{p.tier}</div>
                <div className="mt-2 font-display text-2xl font-extrabold">{p.name}</div>
                <div className="mt-1 text-[11px] italic text-muted-foreground">{p.tamil}</div>
                <div className={`mt-7 font-display text-[44px] font-extrabold leading-none ${p.style === "gold" ? "text-gold" : ""}`}>{p.price}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{p.per}</div>
                <div className="my-6 h-px bg-border" />
                <ul className="flex flex-1 flex-col gap-2.5 text-[12px] text-muted-foreground">
                  {p.feats.flat().map((f) => (
                    <li key={f} className="flex items-start gap-2.5"><span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[9px] text-accent">✓</span>{f}</li>
                  ))}
                </ul>
                {p.cta === "Get Started" ? (
                  <a href="https://wa.me/60126466797?text=Hi%20VEGAM%2C%20I%27m%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" className={`mt-8 block w-full rounded-full px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] transition ${
                    p.style === "solid" ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground" :
                    p.style === "gold" ? "border border-gold/40 text-gold hover:bg-gold/10" :
                    "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}>{p.cta}</a>
                ) : (
                  <button className={`mt-8 w-full rounded-full px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
                    p.style === "solid" ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground" :
                    p.style === "gold" ? "border border-gold/40 text-gold hover:bg-gold/10" :
                    "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}>{p.cta}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENTS */}
      <Link to="/payments" className="relative z-10 block cursor-hover px-6 py-32 md:px-12 transition hover:opacity-80">
        <div className="mx-auto max-w-5xl text-center">
          <div className="rv inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground transition group-hover:text-accent" style={{opacity:0,transform:"translateY(40px)"}}>
            <span className="h-px w-6 bg-accent" />Payments<span className="h-px w-6 bg-accent" />
          </div>
          <h2 className="rv mt-6 font-display text-[clamp(36px,5vw,64px)] font-extrabold transition group-hover:text-accent" style={{opacity:0,transform:"translateY(40px)"}}>Pay your way.</h2>
          <div className="rv mt-12 flex flex-wrap justify-center gap-2.5" style={{opacity:0,transform:"translateY(40px)"}}>
            {payments.map((p) => (
              <div key={p} className="cursor-hover rounded-full border border-border px-5 py-2.5 text-[12px] text-muted-foreground transition hover:border-border-strong hover:text-foreground">{p}</div>
            ))}
          </div>
          <div className="rv mt-8 text-[12px] text-muted-foreground" style={{opacity:0,transform:"translateY(40px)"}}>View all payment methods →</div>
        </div>
      </Link>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-start justify-between gap-12 pb-16">
            <div>
              <div className="font-display text-2xl font-extrabold uppercase tracking-[0.18em]">VEGAM</div>
              <p className="mt-3 max-w-[280px] text-[13px] leading-[1.7] text-muted-foreground">AI-powered website builder for Malaysian businesses and the global Tamil diaspora. Built in Malaysia. For the world. வேகம்</p>
            </div>
            <div className="flex flex-wrap gap-12 md:gap-16">
              {([
                {
                  h: "Product",
                  l: [
                    { label: "Features", href: "/#features" },
                    { label: "Pricing", href: "/#pricing" },
                    { label: "Templates", to: "/templates" as const },
                    { label: "Roadmap", to: "/roadmap" as const },
                  ],
                },
                {
                  h: "Templates",
                  l: [
                    { label: "Uyir AI Memorial", href: "/#paati" },
                    { label: "Restaurant", to: "/templates" as const },
                    { label: "E-Commerce", to: "/templates" as const },
                    { label: "Portfolio", to: "/templates" as const },
                  ],
                },
                {
                  h: "Company",
                  l: [
                    { label: "About", to: "/about" as const },
                    { label: "Roadmap", to: "/roadmap" as const },
                    { label: "Contact", to: "/contact" as const },
                    { label: "vegam.my", href: "https://vegam.my", external: true },
                  ],
                },
              ]).map((c) => (
                <div key={c.h}>
                  <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/40">{c.h}</h4>
                  <div className="mt-4 flex flex-col gap-2.5">
                    {c.l.map((x) =>
                      "to" in x && x.to ? (
                        <Link key={x.label} to={x.to} className="text-[13px] text-muted-foreground transition hover:text-foreground">{x.label}</Link>
                      ) : (
                        <a
                          key={x.label}
                          href={x.href}
                          {...((x as { external?: boolean }).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-[13px] text-muted-foreground transition hover:text-foreground"
                        >
                          {x.label}
                        </a>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-[11px] tracking-wide text-foreground/25">© 2026 VEGAM · vegam.my · Karthikesu Kesavan · All rights reserved</p>
            <p className="text-[11px] tracking-[0.15em] text-accent/50">🔱 Murugan Vazhga · வேகம்</p>
          </div>
        </div>
      </footer>

      {showDemo && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/90 backdrop-blur-md p-6"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border-strong bg-background shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemo(false)}
              aria-label="Close demo"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground/70 backdrop-blur transition hover:text-foreground"
            >
              ✕
            </button>
            <video
              src={builderPreviewVideo}
              autoPlay
              loop
              controls
              playsInline
              className="w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

