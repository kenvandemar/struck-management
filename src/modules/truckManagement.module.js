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

const truckRecord = new Record({
  isRequestTruck: true,
  isCreateTruck: true,
  isDeleteTruck: true,
  isEditTruck: true,
  isFetchSingleTruck: true,
  isSearchTruck: true,
  trucks: List(),
  singleTruck: Map(),
  emptySearch: false,
  foundSearch: false,
  page: 1
});

const initialState = truckRecord();

/**
|--------------------------------------------------
| FETCH ALL TRUCKS
|--------------------------------------------------
*/
export const fetchAllTrucks = _ => dispatch => {
  dispatch(fetchTruckRequest());
  Api.fetchAllTrucks()
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
    truckType,
    price,
    dimension,
    parkingAddress,
    productionYear,
    status,
    description,
    publishedAt,
    updatedAt
  )
    .then(result => {
      let truckArr = [];
      truckArr.push(result.data);
      dispatch(createTruckResponse(truckArr));
      history.push('/');
    })
    .catch(err => dispatch(createTruckResponse(err)));
};

/**
|--------------------------------------------------
| DELETE A TRUCK
|--------------------------------------------------
*/
export const deleteTruck = id => dispatch => {
  dispatch(deleteTruckRequest());
  Api.deleteTruck(id)
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
export const fetchSingleTruck = id => dispatch => {
  dispatch(fetchSingTruckRequest());
  Api.fetchSingeTruck(id)
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
    truckType,
    price,
    dimension,
    parkingAddress,
    productionYear,
    status,
    description
  )
    .then(response => {
      dispatch(editTruckResponse(response));
      history.push('/');
    })
    .catch(err => dispatch(editTruckResponse(err)));
};

/**
|--------------------------------------------------
| SEARCH TRUCK
|--------------------------------------------------
*/
export const searchTruck = text => dispatch => {
  dispatch(searchTruckRequest());
  Api.searchTruck(text)
    .then(response => {
      dispatch(searchTruckResponse(response.data));
    })
    .catch(err => dispatch(searchTruckResponse(err)));
};

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
    return state.withMutations(s =>
      s.set('isDeleteTruck', true).set('trucks', List())
    );
  },
  [EDIT_TRUCK_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('isEditTruck', true).set('trucks', List())
    );
  },
  [FETCH_SINGLE_TRUCK_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('isFetchSingleTruck', true).set('trucks', List())
    );
  },
  [SEARCH_TRUCK_REQUEST]: state => {
    return state.withMutations(s =>
      s
        .set('isSearchTruck', true)
        .set('emptySearch', false)
        .set('foundSearch', false)
    );
  },
  [FETCH_TRUCKS_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.set('isRequestTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isRequestTruck', false)
          .set('trucks', state.trucks.merge(action.payload))
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
      if (action.payload.length) {
        return state.withMutations(s =>
          s
            .set('isFetchSingleTruck', false)
            .set('trucks', action.payload)
            .set('foundSearch', true)
        );
      } else {
        return state.withMutations(s =>
          s
            .set('isFetchSingleTruck', false)
            .set('trucks', action.payload)
            .set('emptySearch', true)
        );
      }
    }
  }
};

export default handleActions(actions, initialState);
