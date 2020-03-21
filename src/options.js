/**
 * @overview File loaded into the options page for the extension.
 */

var browser = require("webextension-polyfill");

/**
 * Handles interaction within the Options page and initalises required event listeners.
 * @class
 */
class Options {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.restoreOptions());
        document.querySelector('form').addEventListener('submit', (event) => this.saveOptions(event));
    }

    /**
     * Saves options selected on the page into storage.
     * @param {Event} event
     */
    async saveOptions(event) {
        event.preventDefault();

        // Retrieve options from page elements
        const accessToken = document.querySelector('#access-token');
        const storage = {
            key: accessToken.value,
            notifications: document.querySelector('input[name="notifications"]:checked').value
        };
        console.debug('[saveOptions] Attempting to save new options.', storage);

        // Save options
        await browser.storage.sync.set(storage);
        this.showFeedback('Personal access token saved.', 'valid');
        console.debug('[saveOptions] Options saved sucessfully.');
    }

    /**
     * Load previously selected options from the storage and populate the page.
     */
    async restoreOptions() {
        const storage = await browser.storage.sync.get(['key','notifications']);
        document.querySelector('#access-token').value = storage.key || '';
        document.querySelector(`#${storage.notifications || 'disable-notifications'}`).checked = true;
    }

    /**
     * Displays feedback to the end user (e.g. error, update complete).
     * @param {string} text Feedback to display on the screeen.
     * @param {string} className Class to use for the display of the feedback.
     */
    showFeedback(text, className) {
        let feedback = document.querySelector('#feedback');
        feedback.textContent = text;
        feedback.className = className;
    }
}

/**
 * Initialises the options page events.
 * @constant
 */
export const options = new Options();