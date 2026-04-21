import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppChromeProvider } from "@/context/AppChromeContext";
import { AppSidebar } from "@/layout/AppSidebar";
import { SiteFooter } from "@/components/SiteFooter";

/** Keep in sync with `ToolPageHeader` titles and `mainNav.jsx` labels. */
const ROUTE_DOCUMENT_TITLES = {
  "/": "Home",
  "/tools/gui-editor": "Minecraft GUI editor",
  "/tools/readme-builder": "Resource README builder",
  "/tools/text-formatter": "Text formatter",
};

/**
 * Root layout for most routes: sidebar + main + footer. The `/thread` overview
 * route is declared separately in `routes.jsx` (full-width, no sidebar).
 *
 * Do not duplicate this structure on individual pages; use `<Outlet />` via nested routes only.
 */
function AppLayoutInner() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = ROUTE_DOCUMENT_TITLES[pathname];
    document.title = page ? `${page} · Craftingtable` : "Craftingtable";
  }, [pathname]);

  return (
    <div className="ct-app relative flex min-h-screen w-full flex-col bg-muted/30 md:flex-row">
      <AppSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <main className="flex-1 px-3 py-6 sm:px-5 sm:py-8 lg:px-6">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <AppChromeProvider>
      <AppLayoutInner />
    </AppChromeProvider>
  );
}

/** @deprecated Use `AppLayout` — alias for backwards compatibility */
export { AppLayout as AppShell };
