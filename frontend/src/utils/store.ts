import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../@types';
import { allReducers, persistReducers } from '../reducers';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: persistReducers,
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
