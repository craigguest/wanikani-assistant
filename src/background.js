/**
 * @overview File runs in the background for the extension.
 */

var browser = require("webextension-polyfill");

/**
 * Handle events fired when using the extension (i.e. badge, alarms, notifications ).
 * @class
 */
class Background {

    constructor() {
        browser.browserAction.onClicked.addListener(this.openWebsite);
    }

    async openWebsite() {
        await browser.tabs.create({
            url: 'https://www.wanikani.com/dashboard'
        });
    }

}

/**
 * Initialise and export an instance of the background page.
 * @constant
 */
export const background = new Background();