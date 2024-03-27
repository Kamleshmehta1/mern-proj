import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false };

const authContextSlice = createSlice({
  name: 'authContext',
  initialState,
  reducers: {
    initialize: (state, action) => {
      const { isAuthenticated } = action.payload;
      state.isAuthenticated = isAuthenticated || false;
    },
  },
});

export const { initialize } = authContextSlice.actions;

export default authContextSlice.reducer;
