import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import { HomePage } from "@/tools/home";


const GuiEditorPage = lazy(() =>
  import("@/tools/gui-editor/GuiEditorPage").then((m) => ({
    default: m.GuiEditorPage,
  })),
);


const ReadmeBuilderPage = lazy(() =>
  import("@/tools/readme-builder/ReadmeBuilderPage").then((m) => ({
    default: m.ReadmeBuilderPage,
  })),
);

const ThreadPage = lazy(() =>
  import("@/tools/thread/ThreadPage").then((m) => ({
    default: m.ThreadPage,
  })),
);

const TextFormatterPage = lazy(() =>
  import("@/tools/text-formatter/TextFormatterPage").then((m) => ({
    default: m.TextFormatterPage,
  })),
);

const BlogPage = lazy(() => import("@/tools/blog/BlogPage"));

const BlogPostPage = lazy(() => import("@/tools/blog/BlogPostPage"));

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

/**
 * App routes. `/thread` is outside `AppLayout` (no sidebar). Other tools live under
 * `src/tools/<tool-id>/` and are lazy-loaded where heavy.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/thread"
        element={
          <Suspense fallback={<RouteFallback />}>
            <ThreadPage />
          </Suspense>
        }
      />
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tools/gui-editor"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GuiEditorPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/readme-builder"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ReadmeBuilderPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/text-formatter"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TextFormatterPage />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:postId"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPostPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
