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
        const options = { key: accessToken.value };
        console.debug('[saveOptions] Attempting to save new options.', options);

        // Save options
        await browser.storage.sync.set(options);
        this.showFeedback('Personal access token saved.', 'valid');
        console.debug('[saveOptions] Options saved sucessfully.');
    }

    /**
     * Load previously selected options from the storage and populate the page.
     */
    async restoreOptions() {
        const options = await browser.storage.sync.get(['key']);
        document.querySelector('#access-token').value = options.key || '';
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