import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SAFEZONE_TEMPLATES_ZIP_PATH } from "@/lib/constants";

export function ThumbnailControlsSidebar(props) {
  const {
    fileInputARef,
    fileInputBRef,
    abTest,
    onAbTestChange,
    previewSide,
    setPreviewSide,
    editSide,
    setEditSide,
    variantA,
    variantB,
    editing,
    setEditing,
    uploadError,
    blurGrid,
    setBlurGrid,
    darkMode,
    setDarkMode,
    carouselMode,
    setCarouselMode,
    userInsertIndex,
    competitorPool,
    handleImageInputChange,
    randomizeUserPosition,
    apiKey,
    handleApiKeyChange,
    fetchCompetitors,
    isLoadingGrid,
    gridLoadError,
  } = props;

  const handleRandomizeResources = () => {
    // Generate a random page between 1 and 20 to get different resources
    const randomPage = Math.floor(Math.random() * 20) + 1;
    fetchCompetitors(randomPage);
  };

  return (
    <div className="market-sidebar-toolbar space-y-4">
      <Card className="market-sidebar ct-tool-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            BuiltByBit connection
          </CardTitle>
          <CardDescription>
            Paste your{" "}
            <a
              href="https://builtbybit.com/account/api"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              BuiltByBit Ultimate API
            </a>{" "}
            key below. Prefer the full line as shown ({" "}
            <span className="font-mono">Private …</span> or{" "}
            <span className="font-mono">Shared …</span>
            ). If you paste only the secret, it is sent as a{" "}
            <span className="font-mono">Private</span> key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="api-key">API key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              placeholder="Private … or Shared …"
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="rounded-xl font-mono text-sm"
            />
            <p className="text-[11px] text-muted-foreground">
              Saved only in this browser (localStorage). Sent to BuiltByBit via
              the dev proxy; not stored on Craftingtable servers.
            </p>
          </div>
          <Button
            type="button"
            className="w-full rounded-xl"
            onClick={handleRandomizeResources}
            disabled={isLoadingGrid}
            variant="outline"
            title="Loads a fresh page of public listings from BuiltByBit each time."
          >
            {isLoadingGrid ? "Loading…" : "Load real listings"}
          </Button>
          {gridLoadError ? (
            <p
              className="text-xs font-medium leading-snug text-destructive"
              role="alert"
            >
              {gridLoadError}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <input
        ref={fileInputARef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => handleImageInputChange(e, "a")}
      />
      <input
        ref={fileInputBRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => handleImageInputChange(e, "b")}
      />

      <Card className="market-sidebar ct-tool-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Your listing
          </CardTitle>
          <CardDescription>
            Upload a thumbnail and edit how it appears in the grid.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="ab-switch">Compare two versions (A/B)</Label>
            <Switch
              id="ab-switch"
              checked={abTest}
              onCheckedChange={onAbTestChange}
            />
          </div>
          {abTest ? (
            <div className="space-y-2 rounded-xl border border-border/80 bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground">
                Show in grid
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={previewSide === "a" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl"
                  onClick={() => setPreviewSide("a")}
                >
                  Variant A
                </Button>
                <Button
                  type="button"
                  variant={previewSide === "b" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl"
                  onClick={() => setPreviewSide("b")}
                >
                  Variant B
                </Button>
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                Edit
              </p>
              <div
                className="flex gap-2"
                role="group"
                aria-label="Editing variant"
              >
                <Button
                  type="button"
                  variant={editSide === "a" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl"
                  aria-pressed={editSide === "a"}
                  onClick={() => setEditSide("a")}
                >
                  Edit A
                </Button>
                <Button
                  type="button"
                  variant={editSide === "b" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl"
                  aria-pressed={editSide === "b"}
                  onClick={() => setEditSide("b")}
                >
                  Edit B
                </Button>
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-foreground">Thumbnail</Label>
              {abTest ? (
                <div className="flex gap-2 text-[10px] text-muted-foreground">
                  <span
                    className={
                      variantA.imageUrl
                        ? "text-primary-strong dark:text-primary"
                        : ""
                    }
                  >
                    A{variantA.imageUrl ? " · set" : ""}
                  </span>
                  <span className="text-border">|</span>
                  <span
                    className={
                      variantB.imageUrl
                        ? "text-primary-strong dark:text-primary"
                        : ""
                    }
                  >
                    B{variantB.imageUrl ? " · set" : ""}
                  </span>
                </div>
              ) : editing.imageUrl ? (
                <span className="text-[10px] font-medium text-primary-strong dark:text-primary">
                  Image set
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {abTest ? (
                <>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 rounded-lg px-2.5 text-xs"
                    onClick={() => fileInputARef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Upload A
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 rounded-lg px-2.5 text-xs"
                    onClick={() => fileInputBRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Upload B
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1.5 rounded-lg px-2.5 text-xs"
                  onClick={() => fileInputARef.current?.click()}
                >
                  <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Upload
                </Button>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground">
              PNG, JPG, WebP, or GIF · max 5 MB per image.
            </p>
            {uploadError ? (
              <p className="text-xs font-medium text-destructive" role="alert">
                {uploadError}
              </p>
            ) : null}
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">Title (first line buyers see)</Label>
            <Input
              id="title"
              value={editing.title}
              placeholder="e.g. Skyblock Core | All-In-One Plugin"
              onChange={(e) => setEditing({ title: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subtitle">Author or shop name</Label>
            <Input
              id="subtitle"
              value={editing.subtitle}
              placeholder="e.g. Your Studio Name"
              onChange={(e) => setEditing({ subtitle: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={editing.price}
              placeholder="e.g. $9.99"
              onChange={(e) => setEditing({ price: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Short blurb (one or two lines)</Label>
            <Textarea
              id="description"
              rows={2}
              value={editing.description}
              placeholder="What does it do, and why would someone want it?"
              onChange={(e) => setEditing({ description: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="blur-switch">Blur other listings</Label>
              <Switch
                id="blur-switch"
                checked={blurGrid}
                onCheckedChange={setBlurGrid}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-switch">Dark mode grid</Label>
              <Switch
                id="dark-switch"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="carousel-switch">Carousel on your card</Label>
              <Switch
                id="carousel-switch"
                checked={carouselMode}
                onCheckedChange={setCarouselMode}
              />
            </div>
          </div>
          <div className="space-y-1 pt-2">
            <Button
              type="button"
              className="w-full rounded-xl"
              onClick={randomizeUserPosition}
            >
              Shuffle my position
            </Button>
            <p className="text-xs text-muted-foreground">
              Spot in the grid:{" "}
              {competitorPool.length > 0
                ? Math.min(
                    Math.max(0, userInsertIndex),
                    competitorPool.length - 1,
                  ) + 1
                : 1}{" "}
              / {Math.max(competitorPool.length, 1)}
            </p>
          </div>

          <div className="space-y-3 border-t border-border/80 pt-4">
            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl border-primary/20 bg-primary-subtle text-primary-strong shadow-sm hover:border-primary/35 hover:bg-primary-faint dark:border-primary/35 dark:bg-primary-faint/50 dark:text-primary dark:hover:bg-primary-subtle/80"
              asChild
            >
              <a href={SAFEZONE_TEMPLATES_ZIP_PATH} download>
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Download safezone templates
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
