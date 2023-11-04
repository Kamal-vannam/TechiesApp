// export const API_BASE_URL="https://apps.apbjpdata.org"

export default class Base {
    constructor(apiClient) {
        if (!apiClient) {
            throw new Error('[apiClient] required');
        }

        this.apiClient = apiClient;
    }
}
