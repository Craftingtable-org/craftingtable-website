import React, { useState } from "react";
import { LayoutGrid } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

/** Prefer the cell under the cursor; closest-center mis-picks neighboring slots on small grids. */
function gridPointerCollision(args) {
  const within = pointerWithin(args);
  if (within.length > 0) return within;
  return closestCenter(args);
}
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ItemPalette } from "./components/ItemPalette";
import { Grid } from "./components/Grid";
import { ItemEditor } from "./components/ItemEditor";
import { ExportModal } from "./components/ExportModal";

function OverlayItem({ activeDragItem }) {
  const material =
    activeDragItem.type === "palette"
      ? activeDragItem.material
      : activeDragItem.item?.material;
  const name =
    activeDragItem.type === "palette"
      ? activeDragItem.name
      : activeDragItem.item?.name || activeDragItem.item?.material;

  const imgSrc =
    activeDragItem.type === "palette"
      ? activeDragItem.texture
      : activeDragItem.item?.texture;

  if (!material)
    return (
      <div className="p-2 bg-white shadow-lg border rounded opacity-80 scale-105 pointer-events-none">
        Empty slot
      </div>
    );

  return (
    <div className="p-2 bg-white shadow-lg border rounded opacity-80 scale-105 pointer-events-none flex items-center gap-3">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
          className="w-8 h-8 object-contain pixelated"
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
      ) : (
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded flex items-center justify-center text-[10px]">
          ?
        </div>
      )}
      <span className="text-sm font-semibold truncate">{name}</span>
    </div>
  );
}

export function GuiEditorPage() {
  const [title, setTitle] = useState("My menu");
  const [size, setSize] = useState(27);
  const [slots, setSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.fromPalette) {
      setActiveDragItem({
        type: "palette",
        material: active.data.current.material,
        name: active.data.current.name,
        texture: active.data.current.texture,
      });
    } else if (active.data.current?.isSlot) {
      setActiveDragItem({
        type: "slot",
        id: active.id,
        item: slots[active.id],
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const targetSlotId = over.data.current?.slotIndex;
    if (!targetSlotId) return;

    if (active.data.current?.fromPalette) {
      // Dropping a new item from palette
      const material = active.data.current.material;
      setSlots((prev) => ({
        ...prev,
        [targetSlotId]: {
          ...prev[targetSlotId],
          material,
          name: "",
          lore: "",
          texture: active.data.current.texture,
          actions: [],
          requirements: [],
        },
      }));
      setSelectedSlot(targetSlotId);
    } else if (active.data.current?.isSlot) {
      // Dragging a slot item to another slot
      const sourceSlotId = active.id;
      if (sourceSlotId === targetSlotId) return;

      setSlots((prev) => {
        const newSlots = { ...prev };
        const sourceItem = newSlots[sourceSlotId];
        const targetItem = newSlots[targetSlotId];

        // Swap items
        if (sourceItem) newSlots[targetSlotId] = sourceItem;
        else delete newSlots[targetSlotId];

        if (targetItem) newSlots[sourceSlotId] = targetItem;
        else delete newSlots[sourceSlotId];

        return newSlots;
      });
      setSelectedSlot(targetSlotId);
    }
  };

  const handleItemChange = (slotId, item) => {
    setSlots((prev) => ({
      ...prev,
      [slotId]: item,
    }));
  };

  const handleItemClear = (slotId) => {
    setSlots((prev) => {
      const newSlots = { ...prev };
      delete newSlots[slotId];
      return newSlots;
    });
    if (selectedSlot === slotId) setSelectedSlot(null);
  };

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          title="Minecraft GUI editor"
          description="Drag items onto the grid, then export YAML for CommandPanels or DeluxeMenus."
          icon={<LayoutGrid className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="flex flex-col h-[calc(100vh-140px)] border rounded-lg overflow-hidden bg-white dark:bg-slate-950">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Menu title"
              className="w-64"
            />
            <Select
              value={size.toString()}
              onValueChange={(v) => setSize(parseInt(v))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {[9, 18, 27, 36, 45, 54].map((s) => (
                  <SelectItem key={s} value={s.toString()}>
                    {s} Slots ({s / 9} Rows)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsExporting(true)}>Export YAML…</Button>
        </div>
        {/* Main Editor Area */}
        <DndContext
          sensors={sensors}
          collisionDetection={gridPointerCollision}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-1 overflow-hidden">
            <ItemPalette />

            <Grid
              size={size}
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />

            <ItemEditor
              item={selectedSlot ? slots[selectedSlot] : null}
              slotIndex={selectedSlot}
              onChange={handleItemChange}
              onClear={handleItemClear}
            />
          </div>

          {/* Drag Overlay for visual feedback */}
          <DragOverlay>
            {activeDragItem ? (
              <OverlayItem activeDragItem={activeDragItem} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {isExporting && (
        <ExportModal
          state={{ title, size, slots }}
          onClose={() => setIsExporting(false)}
        />
      )}
    </PageTemplate>
  );
}
