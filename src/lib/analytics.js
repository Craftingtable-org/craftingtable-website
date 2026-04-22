/**
 * Helper to push custom events to Google Analytics 4 (GA4).
 * Uses the global `gtag` function if it exists.
 *
 * @param {string} eventName - The name of the event (e.g. 'tool_click')
 * @param {object} params - Additional parameters to send with the event
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  } else {
    // Fallback if GA is not loaded or blocked
    console.debug(`[Analytics] Tracked event: ${eventName}`, params);
  }
}

/**
 * Example usage:
 * trackEvent("tool_click", { tool_id: "gui_editor", source: "blog_post" })
 */
