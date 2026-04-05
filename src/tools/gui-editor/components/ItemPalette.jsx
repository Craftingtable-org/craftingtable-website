import React, { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import allItems from "../data/all_items.json";

function DraggablePaletteItem({ item }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${item.material}`,
    data: {
      material: item.material,
      fromPalette: true,
      id: item.id,
      name: item.name,
      texture: item.texture,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 cursor-grab flex items-center gap-3 hover:border-blue-500 transition-colors ${isDragging ? "opacity-50" : ""}`}
    >
      {item.texture ? (
        <img
          src={item.texture}
          alt={item.name}
          className="w-8 h-8 object-contain pixelated"
          style={{ imageRendering: "pixelated" }}
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded flex items-center justify-center text-[10px]">
          ?
        </div>
      )}

      <span className="text-sm font-semibold truncate" title={item.name}>
        {item.name}
      </span>
    </div>
  );
}

export function ItemPalette() {
  const [search, setSearch] = useState("");

  // Filter out 'AIR' since it's practically an empty slot
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems.filter((item) => {
      if (item.id === "air") return false;
      if (!q) return true;
      const name = item.name.toLowerCase();
      const material = item.material.toLowerCase();
      return name.includes(q) || material.includes(q);
    });
  }, [search]);

  return (
    <div className="w-64 flex-shrink-0 flex flex-col border-r bg-white dark:bg-slate-950 p-4 overflow-hidden">
      <h2 className="font-bold mb-4">Items</h2>
      <Input
        type="text"
        placeholder="Search items…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {filtered.map((item) => (
          <DraggablePaletteItem key={item.material} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            No matches
          </p>
        )}
      </div>
    </div>
  );
}
