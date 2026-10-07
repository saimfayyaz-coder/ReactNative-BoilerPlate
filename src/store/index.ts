import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { reduxPersistStorage } from './storage/reduxPersistStorage';
import { authReducer } from './slices/auth';
import { userReducer } from './slices/user';
import { toastReducer } from './slices/utility';
import { baseApi } from './api/baseApi';

import { authListenerMiddleware, errorInterceptorMiddleware } from './middlewares';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  toast: toastReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxPersistStorage,
  whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      baseApi.middleware,
      authListenerMiddleware.middleware,
      errorInterceptorMiddleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
export * from './slices';
export * from './api';
export * from './middlewares';
