/**
 * @overview File runs in the background for the extension.
 */

import { BADGE_COLORS, api, updateBadge } from './modules';
var browser = require("webextension-polyfill");

const WANIKANI_URL = 'https://www.wanikani.com';
/**
 * Handle events fired when using the extension (i.e. badge, alarms, notifications ).
 * @class
 */
class Background {

    constructor() {
        browser.alarms.create('refresh-data', { periodInMinutes: 1 });

        document.addEventListener('DOMContentLoaded', this.refreshReviews);
        browser.runtime.onInstalled.addListener(browser.runtime.openOptionsPage);

        browser.alarms.onAlarm.addListener(this.refreshReviews);
        browser.browserAction.onClicked.addListener(this.openWebsite);
    }

    /**
     * Opens a new browser to the options/reviews/dashbord depending on the number of outstanding reviews.
     */
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

    /**
     * Retrieves the reviews from WaniKani and displays the number of oustanding reviews as an extension badge.
     */
    async refreshReviews() {
        const storage = await browser.storage.sync.get(['key']);//, 'reviews', 'lessons']);

        if (!storage.key) {
            updateBadge(browser.i18n.getMessage('badgeTextNoAccessToken'), '!', BADGE_COLORS.danger);
            return;
        }

        updateBadge('', '', BADGE_COLORS.neutral);
        try {
            const response = (await api.fetchSummary(storage.key));

            const data = {
                reviews: response.reviews[0].subject_ids.length,
                lessons: response.lessons[0].subject_ids.length
            };
            console.debug('[refreshReviews] Response parsed:', data);

        } catch (error) {
            console.error('[refreshReviews] ', error);
        }
    }

}

/**
 * Initialise and export an instance of the background page.
 * @constant
 */
export const background = new Background();