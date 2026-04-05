import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import { HomePage } from "@/tools/home";

const ThumbnailTesterPage = lazy(() =>
  import("@/tools/thumbnail-tester/ThumbnailTesterPage").then((m) => ({
    default: m.ThumbnailTesterPage,
  })),
);

const GuiEditorPage = lazy(() =>
  import("@/tools/gui-editor/GuiEditorPage").then((m) => ({
    default: m.GuiEditorPage,
  })),
);

const SchematicToBedrockPage = lazy(() =>
  import("@/tools/schematic-to-bedrock/SchematicToBedrockPage").then((m) => ({
    default: m.SchematicToBedrockPage,
  })),
);

const ReadmeBuilderPage = lazy(() =>
  import("@/tools/readme-builder/ReadmeBuilderPage").then((m) => ({
    default: m.ReadmeBuilderPage,
  })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

/**
 * App routes. Each tool lives under `src/tools/<tool-id>/` and is imported here.
 * Heavy tools are lazy-loaded so the home bundle stays smaller.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tools/thumbnail-tester"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ThumbnailTesterPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/gui-editor"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GuiEditorPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/schematic-to-bedrock"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SchematicToBedrockPage />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
