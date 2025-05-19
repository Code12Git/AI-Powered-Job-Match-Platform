import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose, type Reducer } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './reducers/authReducer';
import type { authState } from '../types';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','tasks','user'],
};

const rootReducer = combineReducers({
  auth: authReducer as unknown as Reducer<authState>,
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