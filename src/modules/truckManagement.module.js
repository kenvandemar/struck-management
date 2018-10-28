import { Record, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import Api from '../utils/Api';

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

const truckRecord = new Record({
  isRequestTruck: true,
  isCreateTruck: true,
  isDeleteTruck: true,
  isEditTruck: true,
  isFetchSingleTruck: true,
  trucks: List(),
  singleTruck: List(),
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
      let truckArr = [];
      truckArr.push(response.data);
      dispatch(fetchSingleTruckResponse(truckArr));
    })
    .catch(err => dispatch(fetchSingleTruckResponse(err)));
};

const actions = {
  [FETCH_TRUCKS_REQUEST]: state => state.set('isRequestTruck', true),
  [CREATE_TRUCK_RESPONSE]: state => state.set('isCreateTruck', true),
  [DELETE_TRUCK_REQUEST]: state => state.set('isDeleteTruck', true),
  [EDIT_TRUCK_REQUEST]: state => state.set('isEditTruck', true),
  [FETCH_SINGLE_TRUCK_REQUEST]: state => state.set('isFetchSingleTruck', true),
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
      const newArray = state.trucks.toJS().filter(theItem => {
        return theItem._id !== action.payload;
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
  }
};

export default handleActions(actions, initialState);
