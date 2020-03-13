/**
 * Api class for encapsulating calls to the wanikani api in a single place.
 * @class
 * @property {string} url Base url for api calls. 
 */
class Api {

    constructor() {
        this.url = 'https://api.wanikani.com/v2';
    }

    /**
     * Retrieves the summary for the account including information on lessons and reviews.
     * @param {string} accessToken Access token for the account to query.
     * @return {object} Data returned from the api.
     */
    async fetchSummary(accessToken) {
        const url = `${this.url}/summary`;
        console.debug(`[fetchSummary] Fetching ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.debug('[fetchSummary] Response recieved from wanikani:', response);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const body = await response.json();
        return body.data;
    }

}

/**
 * Exported singleton for accessing the API methods.
 * @type {Api}
 */
export const api = new Api();