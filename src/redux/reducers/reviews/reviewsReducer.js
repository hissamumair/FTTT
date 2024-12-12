import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Reviews: {},
};

export const ReviewsSlice = createSlice({
  name: 'Reviews',
  initialState,
  reducers: {

  },

});

export const {  } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;