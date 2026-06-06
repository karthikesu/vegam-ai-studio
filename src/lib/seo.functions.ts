import { createServerFn } from "@tanstack/react-start";

const SITE_URL = "https://global-tamil-ai.lovable.app/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function headers() {
  return {
    Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": process.env.GOOGLE_SEARCH_CONSOLE_API_KEY ?? "",
    "Content-Type": "application/json",
  };
}

const siteParam = encodeURIComponent(SITE_URL);

export type SitemapInfo = {
  path: string;
  lastSubmitted?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  lastDownloaded?: string;
  warnings?: string;
  errors?: string;
  contents?: Array<{ type?: string; submitted?: string; indexed?: string }>;
};

export const getSitemaps = createServerFn({ method: "GET" }).handler(async () => {
  const r = await fetch(`${GATEWAY}/webmasters/v3/sites/${siteParam}/sitemaps`, {
    headers: headers(),
  });
  if (!r.ok) return { sitemaps: [] as SitemapInfo[], error: await r.text() };
  const json = (await r.json()) as { sitemap?: SitemapInfo[] };
  return { sitemaps: json.sitemap ?? [] };
});

export type AnalyticsRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function querySearchAnalytics(body: Record<string, unknown>) {
  const r = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${siteParam}/searchAnalytics/query`,
    { method: "POST", headers: headers(), body: JSON.stringify(body) },
  );
  if (!r.ok) return { rows: [] as AnalyticsRow[], error: await r.text() };
  const json = (await r.json()) as { rows?: AnalyticsRow[] };
  return { rows: json.rows ?? [] };
}

export const getSearchTrend = createServerFn({ method: "GET" }).handler(async () => {
  const startDate = isoDaysAgo(28);
  const endDate = isoDaysAgo(1);
  const [byDay, topQueries, topPages] = await Promise.all([
    querySearchAnalytics({ startDate, endDate, dimensions: ["date"], rowLimit: 28 }),
    querySearchAnalytics({ startDate, endDate, dimensions: ["query"], rowLimit: 10 }),
    querySearchAnalytics({ startDate, endDate, dimensions: ["page"], rowLimit: 10 }),
  ]);
  const totals = byDay.rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks;
      acc.impressions += row.impressions;
      acc.position += row.position;
      acc.n += 1;
      return acc;
    },
    { clicks: 0, impressions: 0, position: 0, n: 0 },
  );
  return {
    startDate,
    endDate,
    daily: byDay.rows,
    topQueries: topQueries.rows,
    topPages: topPages.rows,
    totals: {
      clicks: totals.clicks,
      impressions: totals.impressions,
      ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
      position: totals.n ? totals.position / totals.n : 0,
    },
  };
});

export const getSiteInfo = createServerFn({ method: "GET" }).handler(async () => {
  const r = await fetch(`${GATEWAY}/webmasters/v3/sites/${siteParam}`, {
    headers: headers(),
  });
  if (!r.ok) return { site: null, error: await r.text() };
  return { site: (await r.json()) as { siteUrl?: string; permissionLevel?: string } };
});