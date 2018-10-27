import Constant from '../Config/constant';

const URL_HOST_API_ENDPOINT = Constant.host.url + '/trucks';

export const E_API_AUTH_ERROR = 900001;
export const E_API_404_ERROR = 900002;
export const E_API_500_ERROR = 900003;

const fetchData = (url, options = {}) => {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        const apiError = new Error(`${response.status} ${response.statusText}`);
        if (response.status === 401) {
          apiError.code = E_API_AUTH_ERROR;
          apiError.message =
            'Account authentication failed. Please logout and login again';
        } else if (response.status === 404) {
          apiError.code = E_API_404_ERROR;
        } else if (response.status >= 500 && response.status < 600) {
          apiError.code = E_API_500_ERROR;
        }

        throw apiError;
      }
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson);

      if (!responseJson) {
        throw new Error('error: no response data');
      }

      if (responseJson.errors) {
        throw new Error(responseJson.errors[0]);
      }

      return responseJson;
    });
};
// FETCH ALL TRUCKS
const fetchAllTrucks = _ => {
  return fetchData(`${URL_HOST_API_ENDPOINT}`);
};

export default {
  fetchAllTrucks
};
