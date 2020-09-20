import { combineReducers } from 'redux';
import { test as testReducer } from './trial';
import { allTeams as allTeamReducer } from './allTeams';

export const allReducers = combineReducers({
  test: testReducer,
  allTeams: allTeamReducer,
});
export const persistReducers = ['test', 'allTeams'];
