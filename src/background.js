/**
 * @overview File runs in the background for the extension.
 */

import { BADGE_COLORS, api, updateBadge } from './modules';
var browser = require("webextension-polyfill");

const WANIKANI_URL = 'https://www.wanikani.com';
const DATE_FORMAT = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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

        // Launch the review page if any are outstanding, lessons if they are oustanding, otherwise head to the dashboard
        try {
            let url = WANIKANI_URL;
            if (response.reviews > 0) {
                url += '/review';
            } else if (response.lessons > 0) {
                url += '/lesson';
            } else {
                url += '/dashboard';
            }
            const create = {url: url};
            await browser.tabs.create(create);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    /**
     * Retrieves the reviews from WaniKani and displays the number of oustanding reviews as an extension badge.
     */
    async refreshReviews() {
        const storage = await browser.storage.sync.get(['key']);
        console.debug('[refreshReviews] Storage polled:', storage);

        if (!storage.key) {
            console.debug('[refreshReviews] No API key found in storage.');
            updateBadge(browser.i18n.getMessage('badgeTextNoAccessToken'), '!', BADGE_COLORS.danger);
            return;
        }

        try {
            const response = await api.fetchSummary(storage.key);

            const data = {
                reviews: response.reviews[0].subject_ids.length,
                lessons: response.lessons[0].subject_ids.length
            };

            console.debug('[refreshReviews] Response parsed:', data);

            if (data.reviews > 0 || data.lessons > 0) {
                const title = browser.i18n.getMessage('badgeTextStudyAvailable', [
                    data.reviews,
                    data.lessons,
                    data.reviews > 0 ? 'reviews' : 'lessons'
                ]);
                updateBadge(title, (data.reviews + data.lessons).toString(), BADGE_COLORS.warning);
            } else {
                const nextReview = new Date(response.next_reviews_at);
                updateBadge(`You next review is at ${nextReview.toLocaleTimeString()} on ${nextReview.toLocaleDateString(DATE_FORMAT)}.`, data.reviews.toString());
            }

            await browser.storage.sync.set(data);
            console.debug('[refreshReviews] Updated local storage:', data);
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