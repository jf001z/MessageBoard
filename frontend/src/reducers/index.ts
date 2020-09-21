import { combineReducers } from 'redux';
import { test as testReducer } from './trial';

export const allReducers = combineReducers({
  test: testReducer,
});
export const persistReducers = ['test'];
