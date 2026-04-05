import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { exportToCommandPanels, exportToDeluxeMenus } from "../utils/exporters";

export function ExportModal({ state, onClose }) {
  const [tab, setTab] = useState("commandpanels");

  const yamlOutput = useMemo(
    () =>
      tab === "commandpanels"
        ? exportToCommandPanels(state)
        : exportToDeluxeMenus(state),
    [state, tab],
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-xl w-[800px] max-w-[90vw] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Export your menu</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            variant={tab === "commandpanels" ? "default" : "outline"}
            onClick={() => setTab("commandpanels")}
          >
            CommandPanels
          </Button>
          <Button
            variant={tab === "deluxemenus" ? "default" : "outline"}
            onClick={() => setTab("deluxemenus")}
          >
            DeluxeMenus
          </Button>
        </div>

        <div className="flex-1 overflow-auto bg-slate-900 rounded p-4 relative group">
          <pre className="text-slate-50 text-sm">{yamlOutput}</pre>
          <Button
            className="absolute top-2 right-2"
            size="sm"
            onClick={() => navigator.clipboard.writeText(yamlOutput)}
          >
            Copy to clipboard
          </Button>
        </div>
      </div>
    </div>
  );
}
