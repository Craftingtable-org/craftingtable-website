import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TOOLS_CATALOG } from "@/tools/home/toolsCatalog";

export function HomePage() {
  return (
    <PageTemplate
      header={
        <ToolPageHeader
          crumbs={[{ label: "Home" }]}
          title="Simple tools for Minecraft creators and sellers"
          description="We try to help Minecraft UGC Creators speed up their workflows."
          icon={<Sparkles className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="w-full max-w-[1480px]">
        <section aria-labelledby="tools-heading" className="space-y-4">
          <h2
            id="tools-heading"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Tools
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TOOLS_CATALOG.map((tool) => {
              const Icon = tool.icon;
              const isUnderConstruction = tool.badge === "Under construction";
              return (
                <li key={tool.to} className="flex h-full min-h-0">
                  <Card className="group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm ring-1 ring-border/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <CardHeader className="flex flex-1 flex-col space-y-3 pb-2">
                      <div className="flex shrink-0 items-start justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <span
                          className={
                            isUnderConstruction
                              ? "rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-900 ring-1 ring-amber-500/30 dark:text-amber-100"
                              : "rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                          }
                        >
                          {tool.badge}
                        </span>
                      </div>
                      <CardTitle className="shrink-0 text-xl font-semibold tracking-tight">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="min-h-[2lh] flex-1 text-sm leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto shrink-0 pt-0">
                      <Button
                        className="w-full rounded-xl shadow-sm sm:w-auto"
                        variant="default"
                        asChild
                      >
                        <Link to={tool.to} className="gap-2">
                          {tool.cta}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </PageTemplate>
  );
}
