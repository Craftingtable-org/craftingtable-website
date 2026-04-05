import { ImageIcon } from "lucide-react";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import { ResourceGrid } from "@/tools/thumbnail-tester/components/ResourceGrid";
import { ThumbnailControlsSidebar } from "@/tools/thumbnail-tester/components/ThumbnailControlsSidebar";
import { useThumbnailTester } from "@/tools/thumbnail-tester/useThumbnailTester";

export function ThumbnailTesterPage() {
  const t = useThumbnailTester();

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          title="A/B thumbnail tester"
          description="See how your listing looks next to real resources on BuiltByBit. Upload your art, edit the text, and switch between two versions to compare."
          icon={<ImageIcon className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="ct-thumbnail-page w-full min-w-0">
        <div className="market-content ct-market-content">
          <ResourceGrid
            cards={t.cards}
            gridLoadError={t.gridLoadError}
            blurGrid={t.blurGrid}
            darkMode={t.darkMode}
            carouselMode={t.carouselMode}
          />
          <ThumbnailControlsSidebar
            fileInputARef={t.fileInputARef}
            fileInputBRef={t.fileInputBRef}
            abTest={t.abTest}
            onAbTestChange={t.onAbTestChange}
            previewSide={t.previewSide}
            setPreviewSide={t.setPreviewSide}
            editSide={t.editSide}
            setEditSide={t.setEditSide}
            variantA={t.variantA}
            variantB={t.variantB}
            editing={t.editing}
            setEditing={t.setEditing}
            uploadError={t.uploadError}
            blurGrid={t.blurGrid}
            setBlurGrid={t.setBlurGrid}
            darkMode={t.darkMode}
            setDarkMode={t.setDarkMode}
            carouselMode={t.carouselMode}
            setCarouselMode={t.setCarouselMode}
            userInsertIndex={t.userInsertIndex}
            competitorPool={t.competitorPool}
            handleImageInputChange={t.handleImageInputChange}
            randomizeUserPosition={t.randomizeUserPosition}
            apiKey={t.apiKey}
            handleApiKeyChange={t.handleApiKeyChange}
            fetchCompetitors={t.fetchCompetitors}
            isLoadingGrid={t.isLoadingGrid}
            gridLoadError={t.gridLoadError}
          />
        </div>
      </div>
    </PageTemplate>
  );
}
