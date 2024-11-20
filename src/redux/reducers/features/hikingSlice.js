// redux/reducers/features/hikingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hikingPoints: [], // Initialize with an empty array or fetch from an API
};

const hikingSlice = createSlice({
  name: 'hiking',
  initialState,
  reducers: {
    setHikingPoints: (state, action) => {
      state.hikingPoints = action.payload;
    },
  },
});

export const { setHikingPoints } = hikingSlice.actions;
export default hikingSlice.reducer;
