import React, { memo, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { MinecraftItemTooltip } from "./MinecraftItemTooltip.jsx";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Slot = memo(function Slot({ id, item, isSelected, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { isSlot: true, slotIndex: id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `droppable-${id}`,
    data: { slotIndex: id },
  });

  const imgSrc = item?.texture;
  /** Minecraft-style tooltip whenever the display name is customized (& codes + fonts apply). */
  const showMinecraftTooltip = item && Boolean(item.name?.trim());

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node);
      }}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(id)}
      className={`
        w-12 h-12 bg-slate-300 dark:bg-slate-700 border-2 rounded relative
        ${isSelected ? "border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.5)]" : "border-slate-400 dark:border-slate-600 hover:border-slate-500"}
        ${isOver ? "bg-blue-100 dark:bg-blue-900 border-blue-500" : ""}
        flex items-center justify-center
      `}
    >
      {item && (
        <div className="w-9 h-9 flex items-center justify-center relative group">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={item.name || item.material}
              className="w-full h-full object-contain"
              style={{ imageRendering: "pixelated" }}
              draggable={false}
            />
          ) : null}
          <div
            className="w-full h-full flex items-center justify-center text-[8px] font-bold text-center overflow-hidden break-all bg-white dark:bg-slate-800 rounded shadow-sm p-1"
            style={{ display: imgSrc ? "none" : "flex" }}
          >
            {item.material?.slice(0, 10)}
          </div>
          {showMinecraftTooltip ? (
            <MinecraftItemTooltip name={item.name} lore={item.lore} />
          ) : (
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 max-w-[200px] -translate-x-1/2 rounded bg-black px-2 py-1 text-center text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              <span className="line-clamp-3 break-words">
                {item.name || item.material}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export function Grid({ size, slots, selectedSlot, onSelectSlot }) {
  const numRows = Math.ceil(size / 9);

  // SortableContext expects an array of strings representing ids
  const slotIds = useMemo(
    () => Array.from({ length: size }, (_, i) => String(i)),
    [size],
  );

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 overflow-auto">
      <div className="bg-[#C6C6C6] p-4 rounded-lg shadow-xl border-4 border-[#555555] inline-block">
        <SortableContext items={slotIds} strategy={rectSortingStrategy}>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
              gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
            }}
          >
            {slotIds.map((id) => (
              <Slot
                key={id}
                id={id}
                item={slots[id]}
                isSelected={selectedSlot === id}
                onClick={onSelectSlot}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
