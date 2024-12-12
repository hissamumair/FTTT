import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gadget: {},
};

export const GadgetSlice = createSlice({
  name: 'gadget',
  initialState,
  reducers: {

  },

});

export const {  } = GadgetSlice.actions;

export default GadgetSlice.reducer;