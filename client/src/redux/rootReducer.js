import { combineReducers } from '@reduxjs/toolkit';
import { api } from './apiInterceptor';
import authContextSlice from '../redux/slice/authSlice';

const combineReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authContext: authContextSlice,
});

const rootReducer = (state, action) => {
  return combineReducer(state, action);
};

export { rootReducer };
