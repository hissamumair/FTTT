import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booking: {},
};

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {

  },

});

export const {  } = BookingSlice.actions;

export default BookingSlice.reducer;