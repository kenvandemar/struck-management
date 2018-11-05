import { Record, List, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import Api from '../utils/Api';
import history from '../Config/history';

const FETCH_TRUCKS_REQUEST = 'trucks/FETCH_TRUCKS_REQUEST';
const fetchTruckRequest = createAction(FETCH_TRUCKS_REQUEST);
const FETCH_TRUCKS_RESPONSE = 'trucks/FETCH_TRUCKS_RESPONSE';
const fetchTruckResponse = createAction(FETCH_TRUCKS_RESPONSE);

const FETCH_SINGLE_TRUCK_REQUEST = 'trucks/FETCH_SINGLE_TRUCK_REQUEST';
const fetchSingTruckRequest = createAction(FETCH_SINGLE_TRUCK_REQUEST);
const FETCH_SINGLE_TRUCKS_RESPONSE = 'trucks/FETCH_SINGLE_TRUCKS_RESPONSE';
const fetchSingleTruckResponse = createAction(FETCH_SINGLE_TRUCKS_RESPONSE);

const CREATE_TRUCK_REQUEST = 'trucks/CREATE_TRUCK_REQUEST';
const CREATE_TRUCK_RESPONSE = 'trucks/CREATE_TRUCK_RESPONSE';
const createTruckRequest = createAction(CREATE_TRUCK_REQUEST);
const createTruckResponse = createAction(CREATE_TRUCK_RESPONSE);

const DELETE_TRUCK_REQUEST = 'trucks/DELETE_TRUCK_REQUEST';
const DELETE_TRUCK_RESPONSE = 'trucks/DELETE_TRUCK_RESPONSE';
const deleteTruckRequest = createAction(DELETE_TRUCK_REQUEST);
const deleteTruckResponse = createAction(DELETE_TRUCK_RESPONSE);

const EDIT_TRUCK_REQUEST = 'trucks/EDIT_TRUCK_REQUEST';
const EDIT_TRUCK_RESPONSE = 'trucks/EDIT_TRUCK_RESPONSE';
const editTruckRequest = createAction(EDIT_TRUCK_REQUEST);
const editTruckResponse = createAction(EDIT_TRUCK_RESPONSE);

const SEARCH_TRUCK_REQUEST = 'trucks/SEARCH_TRUCK_REQUEST';
const SEARCH_TRUCK_RESPONSE = 'trucks/SEARCH_TRUCK_RESPONSE';
const searchTruckRequest = createAction(SEARCH_TRUCK_REQUEST);
const searchTruckResponse = createAction(SEARCH_TRUCK_RESPONSE);

const FILTER_TRUCK_REQUEST = 'trucks/FILTER_STATUS_REQUEST';
const FILTER_STATUS_RESPONSE = 'trucks/FILTER_STATUS_RESPONSE';
const FILTER_PRICE_RESPONSE = 'trucks/FILTER_PRICE_RESPONSE';

const filterTruckRequest = createAction(FILTER_TRUCK_REQUEST);
const filterTruckResponse = createAction(FILTER_STATUS_RESPONSE);
const filterPriceResponse = createAction(FILTER_PRICE_RESPONSE);

const truckRecord = new Record({
  isRequestTruck: true,
  isCreateTruck: true,
  isDeleteTruck: true,
  isEditTruck: true,
  isFetchSingleTruck: true,
  isSearchTruck: true,
  isFilterTruck: true,
  trucks: List(),
  singleTruck: Map(),
  emptySearch: false,
  foundSearch: false,
  page: 1,
  currentPage: null,
  totalPages: null
});

const initialState = truckRecord();

/**
|--------------------------------------------------
| FETCH ALL TRUCKS
|--------------------------------------------------
*/
export const fetchTrucks = page => dispatch => {
  dispatch(fetchTruckRequest());
  Api.fetchTrucks(page)
    .then(data => {
      dispatch(fetchTruckResponse(data));
    })
    .catch(err => dispatch(fetchTruckResponse(err)));
};

/**
|--------------------------------------------------
| CREATE A TRUCK
|--------------------------------------------------
*/
export const createTruck = (
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
  publishedAt,
  updatedAt
) => dispatch => {
  dispatch(createTruckRequest());
  Api.createTruck(
    truckPlate,
    cargoType,
    driver,
    Number(truckType),
    price,
    dimension,
    parkingAddress,
    Number(productionYear),
    status,
    description,
    publishedAt,
    updatedAt
  )
    .then(result => {
      let truckArr = [];
      truckArr.push(result.data);
      dispatch(createTruckResponse(truckArr));
      history.push('/Home');
    })
    .catch(err => dispatch(createTruckResponse(err)));
};

/**
|--------------------------------------------------
| DELETE A TRUCK
|--------------------------------------------------
*/
export const deleteTruck = (id, page) => dispatch => {
  dispatch(deleteTruckRequest());
  Api.deleteTruck(id, page)
    .then(_ => {
      dispatch(deleteTruckResponse(id));
    })
    .catch(err => dispatch(deleteTruckResponse(err)));
};

/**
|--------------------------------------------------
| FETCH A SINGLE TRUCK
|--------------------------------------------------
*/
export const fetchSingleTruck = (id, page) => dispatch => {
  dispatch(fetchSingTruckRequest());
  Api.fetchSingeTruck(id, page)
    .then(response => {
      dispatch(fetchSingleTruckResponse(response.data));
    })
    .catch(err => dispatch(fetchSingleTruckResponse(err)));
};

/**
|--------------------------------------------------
| EDIT A TRUCK
|--------------------------------------------------
*/
export const editTruck = (
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
) => dispatch => {
  dispatch(editTruckRequest());
  Api.updateSingleTruck(
    id,
    truckPlate,
    cargoType,
    driver,
    Number(truckType),
    price,
    dimension,
    parkingAddress,
    Number(productionYear),
    status,
    description
  )
    .then(response => {
      dispatch(editTruckResponse(response));
      history.push('/Home');
    })
    .catch(err => dispatch(editTruckResponse(err)));
};

/**
|--------------------------------------------------
| SEARCH TRUCK
|--------------------------------------------------
*/
export const searchTruck = (text, page) => dispatch => {
  dispatch(searchTruckRequest());
  Api.searchTruck(text, page)
    .then(response => {
      dispatch(searchTruckResponse(response.data));
    })
    .catch(err => dispatch(searchTruckResponse(err)));
};

/**
|--------------------------------------------------
| FILTER TRUCK STATUS
|--------------------------------------------------
*/
export const filterTruckStatus = (status, page) => dispatch => {
  dispatch(filterTruckRequest());
  Api.filterStatus(status, page)
    .then(response => {
      dispatch(filterTruckResponse(response.data));
    })
    .catch(err => dispatch(filterTruckResponse(err)));
};

/**
|--------------------------------------------------
| FILTER PRICE
|--------------------------------------------------
*/
export const filterPrice = (sortCondition, page) => dispatch => {
  dispatch(filterTruckRequest());
  Api.filterPrice(sortCondition, page)
    .then(response => {
      dispatch(filterPriceResponse(response.data));
    })
    .catch(err => dispatch(filterPriceResponse(err)));
};
/**
|--------------------------------------------------
| HANDLE STATE
|--------------------------------------------------
*/
const actions = {
  [FETCH_TRUCKS_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('isRequestTruck', true).set('trucks', List())
    );
  },
  [CREATE_TRUCK_RESPONSE]: state => {
    return state.withMutations(s =>
      s.set('isCreateTruck', true).set('trucks', List())
    );
  },
  [DELETE_TRUCK_REQUEST]: state => {
    return state.withMutations(s => s.set('isDeleteTruck', true));
  },
  [EDIT_TRUCK_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('isEditTruck', true).set('trucks', List())
    );
  },
  [FETCH_SINGLE_TRUCK_REQUEST]: state => {
    return state.withMutations(s => s.set('isFetchSingleTruck', true));
  },
  [SEARCH_TRUCK_REQUEST]: state => {
    return state.withMutations(s =>
      s
        .set('isSearchTruck', true)
        .set('emptySearch', false)
        .set('foundSearch', false)
    );
  },
  [FILTER_TRUCK_REQUEST]: state => {
    return state.withMutations(s => s.set('isFilterTruck', true));
  },
  [FETCH_TRUCKS_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isRequestTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isRequestTruck', false)
          .set('trucks', state.trucks.merge(action.payload.trucks))
          .set('currentPage', action.payload.current)
          .set('totalPages', action.payload.pages)
          .set('emptySearch', false)
      );
    }
  },
  [CREATE_TRUCK_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isCreateTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isCreateTruck', false)
          .set('trucks', state.trucks.merge(action.payload))
      );
    }
  },
  [DELETE_TRUCK_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isDeleteTruck', false);
    } else {
      const newArray = state.get('trucks').filter(theItem => {
        return theItem.toJS()._id !== action.payload;
      });
      return state.withMutations(s =>
        s.set('isDeleteTruck', false).set('trucks', newArray)
      );
    }
  },
  [FETCH_SINGLE_TRUCKS_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isFetchSingleTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isFetchSingleTruck', false)
          .set('singleTruck', state.singleTruck.merge(action.payload))
          .set('emptySearch', false)
      );
    }
  },
  [EDIT_TRUCK_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isEditTruck', false);
    } else {
      return state.withMutations(s => s.set('isEditTruck', false));
    }
  },
  [SEARCH_TRUCK_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isFetchSingleTruck', false);
    } else {
      if (
        action.payload.trucks !== undefined &&
        action.payload.trucks !== null
      ) {
        return state.withMutations(s =>
          s
            .set('isSearchTruck', false)
            .set('trucks', state.trucks.merge(action.payload.trucks.trucks))
            .set('currentPage', action.payload.current)
            .set('totalPages', action.payload.trucks.pages)
            .set('foundSearch', true)
        );
      } else {
        return state.withMutations(s =>
          s
            .set('isSearchTruck', false)
            .set('trucks', List())
            .set('emptySearch', true)
        );
      }
    }
  },
  [FILTER_STATUS_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isFilterTruck', false);
    } else {
      if (
        action.payload.trucks !== undefined &&
        action.payload.trucks !== null
      ) {
        return state.withMutations(s =>
          s
            .set('isFilterTruck', false)
            .set('trucks', state.trucks.merge(action.payload.trucks.trucks))
            .set('currentPage', action.payload.current)
            .set('totalPages', action.payload.trucks.pages)
            .set('foundSearch', true)
            .set('emptySearch', false)
        );
      } else {
        return state.withMutations(s =>
          s
            .set('isFilterTruck', false)
            .set('trucks', List())
            .set('emptySearch', true)
        );
      }
    }
  },
  [FILTER_PRICE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isFilterTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isFilterTruck', false)
          .set('trucks', state.trucks.merge(action.payload.trucks))
          .set('currentPage', action.payload.current)
          .set('totalPages', action.payload.pages)
          .set('emptySearch', false)
      );
    }
  }
};

export default handleActions(actions, initialState);
