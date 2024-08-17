import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from './slices/authSlice';
import {groupStoreApi} from './groupStoreApi';

const rootReducer = combineReducers({
  authSlice: authSlice,
  [groupStoreApi.reducerPath]: groupStoreApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([groupStoreApi.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
