import axios from 'axios';
import Constant from '../Config/constant';

const URL_HOST_API_ENDPOINT = Constant.host.url;

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
const fetchTrucks = page => {
  return fetchData(`${URL_HOST_API_ENDPOINT}/trucks/${page}`);
};

// CREATE A TRUCK
const createTruck = (
  truckPlate,
  cargoType,
  driver,
  truckType,
  price,
  dimension,
  parkingAddress,
  productionYear,
  status,
  description,
  publishedAt
) => {
  return axios.post(`${URL_HOST_API_ENDPOINT}/trucks`, {
    truckPlate,
    cargoType,
    driver,
    truckType,
    price,
    dimension,
    parkingAddress,
    productionYear,
    status,
    description,
    publishedAt
  });
};

// DELETE A TRUCK
const deleteTruck = (id, page) => {
  return axios.delete(`${URL_HOST_API_ENDPOINT}/trucks/${page}/${id}`);
};

// FETCH SINGLE TRUCK
const fetchSingeTruck = (id, page) => {
  return axios.get(`${URL_HOST_API_ENDPOINT}/trucks/${page}/${id}`);
};

// Search
const searchTruck = (text, page) => {
  return axios.get(`${URL_HOST_API_ENDPOINT}/search/${page}?q=${text}`);
};

// UPDATE SINGLE TRUCK
const updateSingleTruck = (
  id,
  truckPlate,
  cargoType,
  driver,
  truckType,
  price,
  dimension,
  parkingAddress,
  productionYear,
  status,
  description
) => {
  return axios.put(`${URL_HOST_API_ENDPOINT}/trucks/${id}`, {
    truckPlate,
    cargoType,
    driver,
    truckType,
    price,
    dimension,
    parkingAddress,
    productionYear,
    status,
    description
  });
};

// FILTER STATUS
const filterStatus = (status, page) => {
  return axios.get(
    `${URL_HOST_API_ENDPOINT}/search/filter/${page}?f=${status}`
  );
};

// SORT PRICE
const filterPrice = (sortCondition, page) => {
  return axios.get(
    `${URL_HOST_API_ENDPOINT}/search/price/${page}?sort=${sortCondition}`
  );
};

export default {
  fetchTrucks,
  createTruck,
  deleteTruck,
  fetchSingeTruck,
  updateSingleTruck,
  searchTruck,
  filterStatus,
  filterPrice
};
