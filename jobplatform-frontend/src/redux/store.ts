import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose, type Reducer } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './reducers/authReducer';
import type { authState, jobState, profileState } from '../types';
import storage from 'redux-persist/lib/storage'; 
import profileReducer from './reducers/profileReducer';
import jobReducer from './reducers/jobReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','profile','job'],
};

const rootReducer = combineReducers({
  auth: authReducer as unknown as Reducer<authState>,
  profile:profileReducer as unknown as Reducer<profileState>,
  job:jobReducer as unknown as Reducer<jobState>

 });

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;