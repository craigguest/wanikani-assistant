/**
 * Api class for encapsulating calls to the wanikani api in a single place.
 * @class
 * @property {string} url Base url for api calls. 
 */
class Api {

    constructor() {
        this.url = 'https://api.wanikani.com/v2';
    }

}

/**
 * Exported singleton for accessing the API methods.
 * @type {Api}
 */
export const api = new Api();