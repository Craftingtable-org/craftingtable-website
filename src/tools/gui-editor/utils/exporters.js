import yaml from "js-yaml";

/**
 * CommandPanels inventory panel format (per-panel YAML): `title`, `type`,
 * `rows`, `command`, `aliases`, `layout` (slot string → list of item ids),
 * `items` (id → material, stack, lore, conditions, actions, left-click, …).
 * @see https://docs.commandpanels.net/paneltypes/inventorypanels/configuration/
 */
function commandPanelSlug(title) {
  const slug = String(title || "panel")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
  return slug || "panel";
}

function buildCommandPanelsItemDef(item) {
  const def = {
    material: item.material || "STONE",
    stack: Math.max(1, item.amount || 1),
  };

  if (item.name) def.name = item.name;
  if (item.lore?.trim()) def.lore = item.lore.split("\n");

  if (item.glow) def.glow = true;
  if (item.custom_model_data != null && item.custom_model_data !== "") {
    def.custom_model_data = item.custom_model_data;
  }
  if (item.damage != null && item.damage !== "") def.damage = item.damage;
  if (item.rgb) def.color = item.rgb;

  if (item.viewRequirements?.length) {
    def.conditions =
      item.viewRequirements.length === 1
        ? item.viewRequirements[0]
        : item.viewRequirements.join(" $AND ");
  }

  if (item.actions?.length) {
    def.actions = { commands: item.actions };
  }

  if (item.leftClickActions?.length || item.leftClickRequirements?.length) {
    def["left-click"] = {};
    if (item.leftClickRequirements?.length) {
      def["left-click"].requirements = item.leftClickRequirements;
    }
    if (item.leftClickActions?.length) {
      def["left-click"].commands = item.leftClickActions;
    }
  }

  if (item.rightClickActions?.length || item.rightClickRequirements?.length) {
    def["right-click"] = {};
    if (item.rightClickRequirements?.length) {
      def["right-click"].requirements = item.rightClickRequirements;
    }
    if (item.rightClickActions?.length) {
      def["right-click"].commands = item.rightClickActions;
    }
  }

  if (item.shiftLeftClickActions?.length) {
    def["shift-left-click"] = {
      commands: item.shiftLeftClickActions,
    };
  }

  if (item.shiftRightClickActions?.length) {
    def["shift-right-click"] = {
      commands: item.shiftRightClickActions,
    };
  }

  return def;
}

export function exportToCommandPanels(state) {
  const rows = state.size / 9;
  const command = commandPanelSlug(state.title);

  /** @type {Record<string, string[]>} */
  const layout = {};
  /** @type {Record<string, object>} */
  const items = {};

  const slotIndices = Object.keys(state.slots)
    .filter((k) => state.slots[k])
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  for (const slotIndex of slotIndices) {
    const slotItem = state.slots[slotIndex];
    const itemId = `item_${slotIndex}`;
    layout[String(slotIndex)] = [itemId];
    items[itemId] = buildCommandPanelsItemDef(slotItem);
  }

  const panel = {
    title: state.title || "Custom GUI",
    type: "inventory",
    rows,
    command,
    aliases: [],
    layout,
    items,
  };

  return yaml.dump(panel, { lineWidth: -1, noRefs: true });
}

export function exportToDeluxeMenus(state) {
  const menu = {
    menu_title: state.title || "Custom GUI",
    open_command: "customgui",
    size: state.size,
    items: {},
  };

  Object.entries(state.slots).forEach(([slotIndex, item]) => {
    if (!item) return;
    const key = `item_${slotIndex}`;
    const dmItem = {
      material: item.material || "STONE",
      slot: parseInt(slotIndex, 10),
    };

    if (item.name) dmItem.display_name = item.name;
    if (item.lore) dmItem.lore = item.lore.split("\n");
    if (item.amount && item.amount > 1) dmItem.amount = item.amount;
    if (item.glow) dmItem.glow = true;
    if (item.custom_model_data)
      dmItem.custom_model_data = item.custom_model_data;
    if (item.damage) dmItem.damage = item.damage;
    if (item.rgb) dmItem.rgb = item.rgb;

    // DeluxeMenus uses dedicated arrays for each click
    if (item.actions?.length) {
      dmItem.left_click_commands = item.actions;
      dmItem.right_click_commands = item.actions;
    }
    if (item.leftClickActions?.length)
      dmItem.left_click_commands = item.leftClickActions;
    if (item.rightClickActions?.length)
      dmItem.right_click_commands = item.rightClickActions;
    if (item.shiftLeftClickActions?.length)
      dmItem.shift_left_click_commands = item.shiftLeftClickActions;
    if (item.shiftRightClickActions?.length)
      dmItem.shift_right_click_commands = item.shiftRightClickActions;

    // Requirements logic
    const parseReqs = (reqsList) => {
      const out = { requirements: {} };
      reqsList.forEach((req, i) => {
        // Assume it's a permission if it doesn't contain a comparator
        out.requirements[`req_${i}`] = {
          type: "has permission",
          permission: req,
        };
      });
      return out;
    };

    if (item.viewRequirements?.length) {
      dmItem.view_requirement = parseReqs(item.viewRequirements);
    }
    if (item.leftClickRequirements?.length) {
      dmItem.left_click_requirement = parseReqs(item.leftClickRequirements);
    }
    if (item.rightClickRequirements?.length) {
      dmItem.right_click_requirement = parseReqs(item.rightClickRequirements);
    }

    menu.items[key] = dmItem;
  });

  return yaml.dump(menu);
}
