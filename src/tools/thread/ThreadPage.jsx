import {
  ArrowRight,
  Box,
  CheckCircle2,
  Compass,
  FileText,
  Hammer,
  LayoutGrid,
  Layers,
  Mail,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOOLS_CATALOG } from "@/tools/home/toolsCatalog";

const FAQ_ITEMS = [
  {
    q: "Is Craftingtable affiliated with BuiltByBit or Mojang?",
    a: "No. Craftingtable is an independent project. We’re not affiliated with, endorsed by, or sponsored by BuiltByBit, Mojang, or Microsoft.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Tools run in your browser. Build previews, export YAML or README files, and download assets without installing desktop software.",
  },
  {
    q: "Who is this for?",
    a: "Minecraft UGC creators: plugin and resource sellers, server owners who publish menus and docs, and anyone who wants faster iteration on listings and server-facing content.",
  },
  {
    q: "Are these tools free?",
    a: "The tools on this site are free to use in the browser. We may show sponsor placements in the UI from time to time.",
  },
];

export function ThreadPage() {
  useEffect(() => {
    document.title = "Craftingtable — Tools for Minecraft creators";
  }, []);

  return (
    <div className="ct-thread relative min-h-screen w-full bg-background text-foreground">
      {/* Subtle page background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,hsl(var(--muted)/0.5),transparent_40%,hsl(var(--muted)/0.3))]"
        aria-hidden
      />

      {/* Sticky landing nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            Craftingtable
          </Link>
          <nav
            className="flex items-center gap-2 sm:gap-3"
            aria-label="Landing navigation"
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link to="/">All tools</Link>
            </Button>
            <Button size="sm" className="rounded-lg shadow-sm" asChild>
              <a href="mailto:hi@craftingtable.org" className="gap-1.5">
                <Mail className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">Contact</span>
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-border/40 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:pt-24"
          aria-labelledby="landing-hero-title"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-[min(60vw,28rem)] w-[min(120vw,56rem)] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              In-browser tools for creators
            </p>
            <h1
              id="landing-hero-title"
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              Ship Minecraft listings &amp; server content{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent dark:from-primary dark:to-primary/80">
                without the busywork
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Compare thumbnails like a real marketplace grid, lay out server GUIs with
              drag-and-drop, write resource READMEs with placeholders and exports —
              all in one place, tuned for how UGC creators actually work.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="h-12 min-w-[11rem] rounded-xl px-8 text-base shadow-lg" asChild>
                <Link to="/" className="gap-2">
                  Explore the tool hub
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-border/80 bg-card/50 px-8 text-base backdrop-blur-sm"
                asChild
              >
                <a href="mailto:hi@craftingtable.org" className="gap-2">
                  <Mail className="h-4 w-4" aria-hidden />
                  Get in touch
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Audience strip */}
        <section
          className="border-b border-border/40 bg-muted/30 py-10 dark:bg-muted/20"
          aria-labelledby="audience-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="audience-heading" className="sr-only">
              Who we build for
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-sm font-medium text-muted-foreground sm:text-base">
              <li className="flex items-center gap-2">
                <Users className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                Marketplace sellers
              </li>
              <li className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 shrink-0 text-primary" />
                Server owners &amp; admins
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-5 w-5 shrink-0 text-primary" />
                Docs &amp; listing writers
              </li>
            </ul>
          </div>
        </section>

        {/* Problem / solution */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Why we exist
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Creators lose time context-switching between editors, listing UIs, and
                server configs.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                You shouldn’t need five tabs and a spreadsheet to pick a thumbnail, draft
                a README, and align a menu YAML with what players actually see. We build
                small, sharp tools that match real workflows — not generic “AI writer”
                boxes.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm ring-1 ring-border/40">
              <h3 className="text-lg font-semibold">What Craftingtable does instead</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Previews that look like real resource grids, not toy layouts.",
                  "Exports you can paste into CommandPanels, DeluxeMenus, or your host.",
                  "README flows with BBCode/Markdown, placeholders, and one-click downloads.",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          className="border-y border-border/40 bg-gradient-to-b from-muted/40 to-transparent py-14 dark:from-muted/25"
          aria-labelledby="stats-heading"
        >
          <h2 id="stats-heading" className="sr-only">
            At a glance
          </h2>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
            {[
              { n: "4+", label: "Focused tools" },
              { n: "0", label: "Installs required" },
              { n: "100%", label: "In your browser" },
              { n: "∞", label: "Iterations" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                  {s.n}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Flow
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How we fit into your day
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three steps — pick a tool, iterate in the preview, export or save for later.
            </p>
          </div>
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a workflow",
                body: "Thumbnail comparison, GUI layout, README drafting, or schematic conversion — each tool is scoped to one job.",
                icon: Compass,
              },
              {
                step: "02",
                title: "Edit with context",
                body: "See realistic previews, placeholders filled in, and server-style output so there are fewer surprises after export.",
                icon: Layers,
              },
              {
                step: "03",
                title: "Export & ship",
                body: "Download images, YAML, Markdown/HTML, or JSON templates — or save snapshots in your browser for the next release.",
                icon: Zap,
              },
            ].map((item) => (
              <li key={item.step}>
                <Card className="h-full rounded-2xl border-border/60 bg-card shadow-sm ring-1 ring-border/40">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {item.step}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <item.icon className="h-5 w-5" aria-hidden />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold leading-snug">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {item.body}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* Tools — bento-ish grid */}
        <section
          className="border-t border-border/40 bg-muted/25 py-20 dark:bg-muted/15"
          aria-labelledby="tools-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  The toolbox
                </p>
                <h2
                  id="tools-heading"
                  className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Everything live today
                </h2>
                <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                  Same tools as the hub — optimized for shipping, not demos.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hammer className="h-4 w-4 shrink-0" aria-hidden />
                Continuously improved
              </div>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
              {TOOLS_CATALOG.map((tool, i) => {
                const Icon = tool.icon;
                const featured = i === 0;
                return (
                  <li
                    key={tool.to}
                    className={cn(featured && "sm:col-span-2 lg:col-span-2")}
                  >
                    <Card
                      className={cn(
                        "group h-full overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm ring-1 ring-border/40 transition-all hover:shadow-md hover:ring-primary/20",
                        featured &&
                          "bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10",
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-col gap-6 p-6 sm:p-8",
                          featured && "sm:flex-row sm:items-stretch sm:justify-between sm:gap-10",
                        )}
                      >
                        <div className="min-w-0 flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                              <Icon className="h-6 w-6" aria-hidden />
                            </div>
                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {tool.badge}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                              {tool.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <div className={cn("flex shrink-0 items-end", featured && "sm:items-center")}>
                          <Button
                            className="w-full rounded-xl sm:w-auto"
                            variant={featured ? "default" : "outline"}
                            asChild
                          >
                            <Link to={tool.to} className="gap-2">
                              {tool.cta}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Principles */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Principles behind every screen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Small surface area, high signal — so you spend less time fighting the UI.
            </p>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Realistic previews",
                body: "Layouts that echo real listing grids and in-game constraints — not abstract wireframes.",
                icon: Target,
              },
              {
                title: "Fast in the browser",
                body: "No installs for everyday work. Open a tab, make a change, export, done.",
                icon: Zap,
              },
              {
                title: "Creator-native output",
                body: "YAML, Markdown, HTML, and assets formatted for the tools servers and shops already use.",
                icon: Box,
              },
            ].map((p) => (
              <li key={p.title}>
                <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center shadow-sm ring-1 ring-border/30 dark:bg-card/30">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <p.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/40 bg-muted/20 py-20 dark:bg-muted/10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Quick answers — reach out if you need more detail.
            </p>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQ_ITEMS.map((item, idx) => (
                <AccordionItem key={item.q} value={`item-${idx}`} className="border-border/60">
                  <AccordionTrigger className="text-left text-base hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary via-primary to-primary-hover px-8 py-14 text-center shadow-xl sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                Ready to speed up your workflow?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
                Jump into the hub and pick the tool that matches what you’re shipping
                this week.
              </p>
              <Button
                size="lg"
                className="mt-8 h-12 rounded-xl border-0 bg-primary-foreground px-10 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/" className="gap-2">
                  Go to all tools
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
