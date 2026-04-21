import {
  Heart,
  MessageCircle,
  PanelLeftClose,
  PanelRightOpen,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAppChrome } from "@/context/AppChromeContext";
import { Button } from "@/components/ui/button";
import { SponsoredSlot } from "@/components/SponsoredSlot";
import { BRAND_LOGO_PATH, DISCORD_URL, SUPPORT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/layout/mainNav";

function navLinkClass({ isActive, collapsed }) {
  const base = collapsed
    ? "flex size-11 items-center justify-center rounded-xl transition-colors md:size-11"
    : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors";
  const active = isActive
    ? "bg-primary/12 text-primary shadow-sm ring-1 ring-primary/15"
    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground";
  return [base, active].join(" ");
}

export function AppSidebar() {
  const { navHidden, toggleNavHidden } = useAppChrome();
  const collapsed = navHidden;

  return (
    <aside
      className={cn(
        "ct-sidebar flex shrink-0 border-b border-border/70 bg-card md:sticky md:top-0 md:min-h-0 md:overflow-hidden md:border-r md:border-b-0",
        collapsed
          ? "w-full flex-row items-stretch md:h-screen md:w-16 md:max-w-[4rem] md:flex-col md:items-center md:gap-0 md:py-2"
          : "w-full flex-col md:h-screen md:w-[272px] md:max-w-[272px]",
      )}
    >
      {collapsed ? (
        <div
          className={cn(
            "flex shrink-0 items-center border-b border-border/60 md:px-3",
            "justify-center border-r border-border/60 px-2 py-2 md:border-r-0 md:border-b md:px-0 md:py-2",
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleNavHidden}
            aria-label="Expand navigation"
            title="Expand navigation"
          >
            <PanelRightOpen className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      ) : null}

      {collapsed ? (
        <nav
          className="flex min-w-0 flex-1 flex-row items-center justify-center gap-1 px-2 py-2 md:flex-col md:justify-start md:gap-1 md:px-0 md:py-1"
          aria-label="Main"
        >
          {mainNavItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={(args) => navLinkClass({ ...args, collapsed: true })}
              title={label}
              aria-label={label}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
            </NavLink>
          ))}
        </nav>
      ) : (
        <>
          <div className="flex shrink-0 items-center gap-2 border-b border-border/60 px-5 py-3">
            <NavLink
              to="/"
              className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={BRAND_LOGO_PATH}
                alt=""
                className="h-10 w-10 shrink-0 object-contain"
                width={40}
                height={40}
                decoding="async"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-bold tracking-tight text-foreground">
                  Craftingtable
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  craftingtable.org
                </p>
              </div>
            </NavLink>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={toggleNavHidden}
              aria-label="Collapse navigation"
              title="Collapse navigation"
            >
              <PanelLeftClose className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5">
            <nav className="flex flex-col gap-1" aria-label="Main">
              {mainNavItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={(args) =>
                    navLinkClass({ ...args, collapsed: false })
                  }
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="shrink-0 space-y-4 border-t border-border/60 p-5">
            <SponsoredSlot toolbarColumn />
            <div className="space-y-3 rounded-2xl bg-muted/40 p-4 ring-1 ring-border/50">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                Latest from the Blog
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                How to optimize your server configs and design better player experiences.
              </p>
              <Link
                to="/blog"
                className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                View our blog <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <Button
              variant="default"
              className="w-full gap-2 rounded-xl shadow-sm"
              asChild
            >
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                Chat on Discord
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl shadow-sm"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Heart className="h-4 w-4 shrink-0 text-red-500" aria-hidden />
                Support Craftingtable
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              Stuck? Write us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-primary hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </>
      )}
    </aside>
  );
}
