/**
 * @overview File runs in the background for the extension.
 */

var browser = require("webextension-polyfill");

const WANIKANI_URL = 'https://www.wanikani.com';
/**
 * Handle events fired when using the extension (i.e. badge, alarms, notifications ).
 * @class
 */
class Background {

    constructor() {
        browser.browserAction.onClicked.addListener(this.openWebsite);
    }

    async openWebsite() {
        const storage = await browser.storage.sync.get(['key']);//, 'reviews', 'lessons']);

        // Launch the options page if no access token has been entered yet
        if (!storage.key) {
            browser.runtime.openOptionsPage();
            return;
        }

        await browser.tabs.create({
            url: `${WANIKANI_URL}/dashboard`
        });
    }

}

/**
 * Initialise and export an instance of the background page.
 * @constant
 */
export const background = new Background();