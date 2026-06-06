import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getSitemaps,
  getSearchTrend,
  getSiteInfo,
} from "@/lib/seo.functions";

export const Route = createFileRoute("/seo-dashboard")({
  head: () => ({
    meta: [
      { title: "SEO Monitoring · VEGAM AI Studio" },
      {
        name: "description",
        content:
          "Live sitemap status, indexing progress and Search Console metrics for global-tamil-ai.lovable.app.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SeoDashboard,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="text-xl font-semibold">Couldn't load SEO data</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  },
  notFoundComponent: () => <div className="p-8">Not found</div>,
});

function fmt(n: number, digits = 0) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function SeoDashboard() {
  const sitemapsFn = useServerFn(getSitemaps);
  const trendFn = useServerFn(getSearchTrend);
  const siteFn = useServerFn(getSiteInfo);

  const sitemaps = useQuery({ queryKey: ["seo", "sitemaps"], queryFn: () => sitemapsFn() });
  const trend = useQuery({ queryKey: ["seo", "trend"], queryFn: () => trendFn() });
  const site = useQuery({ queryKey: ["seo", "site"], queryFn: () => siteFn() });

  const totals = trend.data?.totals;
  const daily = (trend.data?.daily ?? []).map((r) => ({
    date: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    position: Number(r.position.toFixed(2)),
    ctr: Number((r.ctr * 100).toFixed(2)),
  }));

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">
            ← Home
          </Link>
          <span>/</span>
          <span>SEO Monitoring</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Monitoring</h1>
        <p className="text-sm text-muted-foreground">
          Live data from Google Search Console for{" "}
          <span className="font-medium text-foreground">global-tamil-ai.lovable.app</span>.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant={site.data?.site ? "default" : "secondary"}>
            {site.data?.site
              ? `Verified · ${site.data.site.permissionLevel ?? "owner"}`
              : site.isLoading
                ? "Checking site…"
                : "Not verified"}
          </Badge>
          {trend.data && (
            <Badge variant="outline">
              {trend.data.startDate} → {trend.data.endDate}
            </Badge>
          )}
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricCard
          label="Clicks (28d)"
          value={totals ? fmt(totals.clicks) : "—"}
          loading={trend.isLoading}
        />
        <MetricCard
          label="Impressions (28d)"
          value={totals ? fmt(totals.impressions) : "—"}
          loading={trend.isLoading}
        />
        <MetricCard
          label="Avg CTR"
          value={totals ? `${(totals.ctr * 100).toFixed(2)}%` : "—"}
          loading={trend.isLoading}
        />
        <MetricCard
          label="Avg Position"
          value={totals ? totals.position.toFixed(1) : "—"}
          loading={trend.isLoading}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Indexing & traffic over time</CardTitle>
          <CardDescription>
            Daily clicks and impressions from Search Console (last 28 days).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          {daily.length === 0 ? (
            <EmptyState
              loading={trend.isLoading}
              message="No Search Console data yet. Google usually starts reporting a few days after a sitemap is submitted."
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impressions"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sitemaps</CardTitle>
          <CardDescription>
            Status of sitemaps registered in Google Search Console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sitemaps.isLoading ? (
            <EmptyState loading message="Loading sitemap status…" />
          ) : (sitemaps.data?.sitemaps?.length ?? 0) === 0 ? (
            <EmptyState message="No sitemaps submitted yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sitemap</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Last downloaded</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sitemaps.data!.sitemaps.map((s) => {
                  const ok = !s.errors || s.errors === "0";
                  const warn = s.warnings && s.warnings !== "0";
                  return (
                    <TableRow key={s.path}>
                      <TableCell className="font-mono text-xs">{s.path}</TableCell>
                      <TableCell className="text-xs">
                        {s.lastSubmitted ? new Date(s.lastSubmitted).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {s.lastDownloaded ? new Date(s.lastDownloaded).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={ok ? (warn ? "secondary" : "default") : "destructive"}>
                          {ok
                            ? warn
                              ? `${s.warnings} warnings`
                              : "OK"
                            : `${s.errors} errors`}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top queries</CardTitle>
            <CardDescription>Search terms driving impressions.</CardDescription>
          </CardHeader>
          <CardContent>
            <QueryTable
              loading={trend.isLoading}
              rows={trend.data?.topQueries ?? []}
              labelHeader="Query"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top pages</CardTitle>
            <CardDescription>Most visible pages in search results.</CardDescription>
          </CardHeader>
          <CardContent>
            <QueryTable
              loading={trend.isLoading}
              rows={trend.data?.topPages ?? []}
              labelHeader="Page"
              isUrl
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  loading,
}: {
  label: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-semibold">{loading ? "…" : value}</div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ loading, message }: { loading?: boolean; message?: string }) {
  return (
    <div className="flex h-full min-h-32 items-center justify-center text-sm text-muted-foreground">
      {loading ? "Loading…" : (message ?? "No data")}
    </div>
  );
}

function QueryTable({
  rows,
  labelHeader,
  isUrl,
  loading,
}: {
  rows: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
  labelHeader: string;
  isUrl?: boolean;
  loading?: boolean;
}) {
  if (loading) return <EmptyState loading />;
  if (rows.length === 0) return <EmptyState message="No data yet." />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{labelHeader}</TableHead>
          <TableHead className="text-right">Clicks</TableHead>
          <TableHead className="text-right">Impr.</TableHead>
          <TableHead className="text-right">Pos.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => {
          const label = r.keys[0] ?? "—";
          return (
            <TableRow key={i}>
              <TableCell className="max-w-xs truncate text-xs">
                {isUrl ? (
                  <a href={label} className="hover:underline" target="_blank" rel="noreferrer">
                    {label.replace(/^https?:\/\/[^/]+/, "") || "/"}
                  </a>
                ) : (
                  label
                )}
              </TableCell>
              <TableCell className="text-right text-xs">{r.clicks}</TableCell>
              <TableCell className="text-right text-xs">{r.impressions}</TableCell>
              <TableCell className="text-right text-xs">{r.position.toFixed(1)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}