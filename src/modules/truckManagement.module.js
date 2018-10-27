import { Record, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import Api from '../utils/Api';

const FETCH_TRUCKS_REQUEST = 'trucks/FETCH_TRUCKS_REQUEST';
const fetchTruckRequest = createAction(FETCH_TRUCKS_REQUEST);
const FETCH_TRUCKS_RESPONSE = 'trucks/FETCH_TRUCKS_RESPONSE';
const fetchTruckResponse = createAction(FETCH_TRUCKS_RESPONSE);

const truckRecord = new Record({
  isRequestTruck: true,
  trucks: List(),
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
      console.log('SHOW ME DAT', data);
      dispatch(fetchTruckResponse(data));
    })
    .then(err => dispatch(fetchTruckResponse(err)));
};

const actions = {
  [FETCH_TRUCKS_REQUEST]: state => state.set('isRequestTruck', true),
  [FETCH_TRUCKS_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.state('isRequestTruck', false);
    } else {
      return state.withMutations(s =>
        s
          .set('isRequestTruck', false)
          .set('trucks', state.trucks.merge(action.payload))
      );
    }
  }
};

export default handleActions(actions, initialState);
