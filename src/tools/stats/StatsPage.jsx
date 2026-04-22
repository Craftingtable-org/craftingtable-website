import { useEffect, useState } from "react";
import { BarChart3, Clock, Link as LinkIcon, RefreshCw, AlertTriangle } from "lucide-react";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error?.message || "Failed to fetch stats");
        }
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          crumbs={[{ label: "Stats Dashboard" }]}
          title="Platform Analytics"
          description="Real-time performance metrics and user engagement from Google Analytics."
          icon={<BarChart3 className="h-6 w-6 text-primary" aria-hidden />}
        />
      }
    >
      <div className="w-full max-w-[1480px] space-y-8">
        {error ? (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Failed to load statistics</h3>
              <p className="mt-1 text-sm opacity-90">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Conversion to Tools */}
              <Card className="relative overflow-hidden group border-border/80 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-2">
                  <CardDescription className="font-medium text-muted-foreground flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Conversion to Tools
                  </CardDescription>
                  <CardTitle className="text-4xl font-bold tracking-tight mt-2">
                    {loading ? (
                      <span className="inline-block w-24 h-10 bg-muted animate-pulse rounded-md" />
                    ) : (
                      data?.conversionToTools || "0"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Blog readers who clicked to use features (30 days)
                  </p>
                </CardContent>
              </Card>

              {/* Average Engagement Time */}
              <Card className="relative overflow-hidden group border-border/80 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-2">
                  <CardDescription className="font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Average Engagement
                  </CardDescription>
                  <CardTitle className="text-4xl font-bold tracking-tight mt-2">
                    {loading ? (
                      <span className="inline-block w-24 h-10 bg-muted animate-pulse rounded-md" />
                    ) : (
                      data?.averageEngagementTime || "0s"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Average time admins spend on the site (30 days)
                  </p>
                </CardContent>
              </Card>

              {/* Returning Visitor Rate */}
              <Card className="relative overflow-hidden group border-border/80 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-2">
                  <CardDescription className="font-medium text-muted-foreground flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Returning Visitors
                  </CardDescription>
                  <CardTitle className="text-4xl font-bold tracking-tight mt-2">
                    {loading ? (
                      <span className="inline-block w-24 h-10 bg-muted animate-pulse rounded-md" />
                    ) : (
                      data?.returningVisitorRate || "0%"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Admins who returned to the site (30 days)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Landing Pages */}
            <Card className="border-border/80 bg-card/50 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Top Landing Pages</CardTitle>
                <CardDescription>
                  Most popular pages bringing in traffic from Google Search
                  Console.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="w-1/2 h-5 bg-muted animate-pulse rounded" />
                        <div className="w-16 h-5 bg-muted animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                ) : data?.topLandingPages && data.topLandingPages.length > 0 ? (
                  <div className="divide-y divide-border/40">
                    {data.topLandingPages.map((page, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 text-sm transition-colors hover:bg-muted/50 rounded-md px-2 -mx-2"
                      >
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-primary hover:underline truncate pr-4"
                        >
                          {page.url}
                        </a>
                        <span className="text-muted-foreground font-semibold">
                          {page.clicks} clicks
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No Search Console data available.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PageTemplate>
  );
}
