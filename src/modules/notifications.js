// TODO: import { browser } from 'webextension-polyfill'

/**
 * Helper function for displaying a notification for available reviews.
 * @param {int} reviewCount Amount of reviews available.
  */
export function displayNotification(reviewCount) {
    browser.notifications.create('reviews-updated', {
        'type': 'basic',
        'title': 'Reviews Available',
        'message': `You now have ${reviewCount.toString()} reviews available.`,
        'iconUrl': browser.runtime.getURL('./images/icon.svg'),
    });
}