import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Safety: {},
};

export const SafetySlice = createSlice({
  name: 'Safety',
  initialState,
  reducers: {

  },

});

export const {  } = SafetySlice.actions;

export default SafetySlice.reducer;