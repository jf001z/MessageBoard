import { createSelector } from 'reselect';
import { RootState } from '../@types';

export const testSelector = createSelector(
  (state: RootState) => state.test,
  (t) => t,
);
