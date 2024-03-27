import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { api } from './apiInterceptor';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api.middleware);
  },
});

store.subscribe(() => {
  // console.log(JSON.parse(JSON.stringify(store.getState())));
});

const RootState = store.getState;

export { store, RootState };
