import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hikings: {},
};

export const HikingSlice = createSlice({
  name: 'hiking',
  initialState,
  reducers: {

  },

});

export const {  } = HikingSlice.actions;

export default HikingSlice.reducer;