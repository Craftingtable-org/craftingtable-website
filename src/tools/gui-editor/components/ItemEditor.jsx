import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPreview } from "../utils/colorCodes.jsx";

export function ItemEditor({ item, slotIndex, onChange, onClear }) {
  if (!item) {
    return (
      <div className="w-96 flex-shrink-0 border-l bg-white dark:bg-slate-950 p-4 flex items-center justify-center text-slate-500">
        Click a slot on the grid to edit it
      </div>
    );
  }

  const updateItem = (updates) => {
    onChange(slotIndex, { ...item, ...updates });
  };

  const handleArrayUpdate = (field, index, value) => {
    const newArr = [...(item[field] || [])];
    newArr[index] = value;
    updateItem({ [field]: newArr });
  };

  const addArrayItem = (field) => {
    const newArr = [...(item[field] || []), ""];
    updateItem({ [field]: newArr });
  };

  const removeArrayItem = (field, index) => {
    const newArr = [...(item[field] || [])];
    newArr.splice(index, 1);
    updateItem({ [field]: newArr });
  };

  const renderArrayField = (label, field, placeholder) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-xs font-semibold uppercase text-slate-500">
          {label}
        </Label>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-xs px-2"
          onClick={() => addArrayItem(field)}
        >
          + Add
        </Button>
      </div>
      {(item[field] || []).map((val, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          <Input
            value={val}
            onChange={(e) => handleArrayUpdate(field, i, e.target.value)}
            placeholder={placeholder}
            className="h-8 text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            onClick={() => removeArrayItem(field, i)}
          >
            x
          </Button>
        </div>
      ))}
      {(item[field] || []).length === 0 && (
        <p className="text-xs text-slate-400 italic">Nothing here yet.</p>
      )}
    </div>
  );

  return (
    <div className="w-96 flex-shrink-0 flex flex-col border-l bg-white dark:bg-slate-950">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold">Slot {slotIndex}</h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onClear(slotIndex)}
        >
          Clear
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <Accordion
          type="single"
          collapsible
          defaultValue="basic"
          className="w-full"
        >
          {/* BASIC SETTINGS */}
          <AccordionItem value="basic">
            <AccordionTrigger className="text-sm font-bold">
              Basics
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase">
                  Material
                </Label>
                <Input
                  value={item.material || ""}
                  onChange={(e) =>
                    updateItem({ material: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. DIAMOND_SWORD"
                  className="mt-1 h-8"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">
                  Amount
                </Label>
                <Input
                  type="number"
                  value={item.amount || 1}
                  onChange={(e) =>
                    updateItem({ amount: parseInt(e.target.value, 10) || 1 })
                  }
                  min={1}
                  max={64}
                  className="mt-1 h-8"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">Name</Label>
                <Input
                  value={item.name || ""}
                  onChange={(e) => updateItem({ name: e.target.value })}
                  placeholder="&aMy Awesome Item"
                  className="mt-1 h-8"
                />
                {item.name && (
                  <ColorPreview
                    text={item.name}
                    className="mt-2 text-xs"
                    minecraftFont
                  />
                )}
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">Lore</Label>
                <Textarea
                  value={item.lore || ""}
                  onChange={(e) => updateItem({ lore: e.target.value })}
                  placeholder="&7First line of lore&#10;&cSecond line"
                  rows={4}
                  className="mt-1 text-sm"
                />
                {item.lore && (
                  <ColorPreview
                    text={item.lore}
                    className="mt-2 text-xs"
                    minecraftFont
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ADVANCED / STYLING */}
          <AccordionItem value="advanced">
            <AccordionTrigger className="text-sm font-bold">
              Look and model data
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Enchant glint</Label>
                <Switch
                  checked={item.glow || false}
                  onCheckedChange={(checked) => updateItem({ glow: checked })}
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">
                  Custom Model Data
                </Label>
                <Input
                  type="number"
                  value={item.custom_model_data || ""}
                  onChange={(e) =>
                    updateItem({
                      custom_model_data: parseInt(e.target.value, 10) || "",
                    })
                  }
                  placeholder="e.g. 10001"
                  className="mt-1 h-8"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">
                  Damage / Durability
                </Label>
                <Input
                  type="number"
                  value={item.damage || ""}
                  onChange={(e) =>
                    updateItem({ damage: parseInt(e.target.value, 10) || "" })
                  }
                  placeholder="e.g. 15"
                  className="mt-1 h-8"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase">
                  RGB Color (Leather/Potions)
                </Label>
                <Input
                  type="text"
                  value={item.rgb || ""}
                  onChange={(e) => updateItem({ rgb: e.target.value })}
                  placeholder="e.g. 255,0,0"
                  className="mt-1 h-8"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* COMMANDS & ACTIONS */}
          <AccordionItem value="actions">
            <AccordionTrigger className="text-sm font-bold">
              Commands and clicks
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 pb-4">
              {renderArrayField("Any Click", "actions", "[player] spawn")}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField(
                "Left Click",
                "leftClickActions",
                "[console] give %player% diamond 1",
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField("Right Click", "rightClickActions", "[close]")}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField(
                "Shift-Left Click",
                "shiftLeftClickActions",
                "[message] &aShift clicked!",
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField(
                "Shift-Right Click",
                "shiftRightClickActions",
                "[sound] ENTITY_EXPERIENCE_ORB_PICKUP",
              )}
            </AccordionContent>
          </AccordionItem>

          {/* REQUIREMENTS */}
          <AccordionItem value="requirements">
            <AccordionTrigger className="text-sm font-bold">
              Who can see or click
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 pb-4">
              <p className="text-xs text-slate-500 mb-4">
                List permission nodes (or PlaceholderAPI conditions for
                CommandPanels) for who can see or use this item.
              </p>

              {renderArrayField(
                "View Requirements",
                "viewRequirements",
                "essentials.fly",
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField(
                "Left Click Requirements",
                "leftClickRequirements",
                "my.custom.perm",
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
              {renderArrayField(
                "Right Click Requirements",
                "rightClickRequirements",
                "my.other.perm",
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
