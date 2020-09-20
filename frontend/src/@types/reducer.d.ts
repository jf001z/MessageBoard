import { allReducers } from '../reducers';

export type RootState = ReturnType<typeof allReducers>;
