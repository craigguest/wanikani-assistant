var browser = require("webextension-polyfill");

/**
 * Map for the common colours used in the badge display for this extension.
 * @constant
 */
export const BADGE_COLORS = { neutral: '#305F72', warning: '#F1D1B5', danger: '#F18C8E' };

/**
 * Helper function for updating the action badge with a single call.
 * @param {string} title Text to display in the badge title (tooltip).
 * @param {string} text Text to display in the badge itself.
 * @param {string} color Color for the background of the badge text.
 */
export function updateBadge(title, text, color = BADGE_COLORS.neutral) {
    browser.browserAction.setTitle({title: title});
    browser.browserAction.setBadgeText({text: text});
    browser.browserAction.setBadgeBackgroundColor({color: color});
}