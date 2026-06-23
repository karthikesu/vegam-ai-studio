import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { EmberParticles } from "@/components/EmberParticles";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VEGAM AI Studio" },
      { name: "description", content: "Premium AI website builder for Malaysian and the global Tamil diaspora" },
      { name: "author", content: "Lovable" },
      { name: "google-site-verification", content: "xI-9rJKJeM3nZkZsovdGe0_pqdrpCgQMmkb9E" },
      { property: "og:title", content: "VEGAM AI Studio" },
      { property: "og:description", content: "Premium AI website builder for Malaysian and the global Tamil diaspora" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "VEGAM AI Studio" },
      { name: "twitter:description", content: "Premium AI website builder for Malaysian and the global Tamil diaspora" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0e333263-df1d-4442-a3e8-ea55ef935bf1/id-preview-dba458f3--a66934f9-d1fe-42fb-8a39-6b01d14566e6.lovable.app-1778636064603.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0e333263-df1d-4442-a3e8-ea55ef935bf1/id-preview-dba458f3--a66934f9-d1fe-42fb-8a39-6b01d14566e6.lovable.app-1778636064603.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://global-tamil-ai.lovable.app/#organization",
              name: "VEGAM",
              url: "https://global-tamil-ai.lovable.app/",
              description:
                "Malaysian AI website builder for businesses and the global Tamil diaspora.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rawang",
                addressRegion: "Selangor",
                addressCountry: "MY",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+60176015125",
                email: "karthikesuk@gmail.com",
                areaServed: "MY",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://global-tamil-ai.lovable.app/#website",
              url: "https://global-tamil-ai.lovable.app/",
              name: "VEGAM",
              publisher: { "@id": "https://global-tamil-ai.lovable.app/#organization" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <EmberParticles />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
