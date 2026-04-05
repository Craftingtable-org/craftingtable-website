import yaml from "js-yaml";

export function exportToCommandPanels(state) {
  const panel = {
    panels: {
      [state.title.replace(/[^a-zA-Z0-9]/g, "_") || "custom_panel"]: {
        title: state.title || "Custom GUI",
        rows: state.size / 9,
        item: {},
      },
    },
  };

  const itemSection = panel.panels[Object.keys(panel.panels)[0]].item;

  Object.entries(state.slots).forEach(([slotIndex, item]) => {
    if (!item) return;
    const key = `item_${slotIndex}`;
    const panelItem = {
      material: item.material || "STONE",
      slot: parseInt(slotIndex, 10),
    };

    if (item.name) panelItem.name = item.name;
    if (item.lore) panelItem.lore = item.lore.split("\n");
    if (item.amount && item.amount > 1) panelItem.amount = item.amount;
    if (item.glow) panelItem.glow = true;
    if (item.custom_model_data)
      panelItem.custom_model_data = item.custom_model_data;
    if (item.damage) panelItem.damage = item.damage;
    if (item.rgb) panelItem.color = item.rgb;

    const commands = [];
    if (item.actions?.length) commands.push(...item.actions);
    if (item.leftClickActions?.length)
      commands.push(...item.leftClickActions.map((c) => `left=${c}`));
    if (item.rightClickActions?.length)
      commands.push(...item.rightClickActions.map((c) => `right=${c}`));
    if (item.shiftLeftClickActions?.length)
      commands.push(
        ...item.shiftLeftClickActions.map((c) => `shift_left=${c}`),
      );
    if (item.shiftRightClickActions?.length)
      commands.push(
        ...item.shiftRightClickActions.map((c) => `shift_right=${c}`),
      );

    if (commands.length > 0) panelItem.commands = commands;

    // View Requirements for CP
    if (item.viewRequirements?.length) {
      panelItem.view_requirement = item.viewRequirements;
    }

    // CommandPanels doesn't natively segregate click requirements by type as deeply as DM without using commands or conditionals
    // but we can map the left/right click reqs if the user provided them.
    // CP relies heavily on placeholders in commands, but we'll export them as standard array if they try.
    if (
      item.leftClickRequirements?.length ||
      item.rightClickRequirements?.length
    ) {
      panelItem.click_requirement = [
        ...(item.leftClickRequirements || []),
        ...(item.rightClickRequirements || []),
      ];
    }

    itemSection[key] = panelItem;
  });

  return yaml.dump(panel);
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
