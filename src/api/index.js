import ApiClient from '../api/Apiclient';
import UserAPI from '../api/UserApi';

export const apiClient = new ApiClient();

const combinedAPI = {
  user: new UserAPI(apiClient),
};

export default combinedAPI;