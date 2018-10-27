import { combineReducers } from 'redux-immutable';
import AppReducer from '../actions/app.action';
import TruckReducer from '../modules/truckManagement.module';

const rootReducer = combineReducers({
  AppReducer,
  truck: TruckReducer
});

export default rootReducer;
