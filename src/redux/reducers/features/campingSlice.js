// src/redux/reducers/features/campingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching camping data (mock implementation)
export const fetchCampingData = createAsyncThunk('camping/fetchCampingData', async () => {
  // Here you would typically make an API call to fetch data.
  // This is a mock example; replace it with your actual data fetching logic.
  return [
    {
      heading: "Camping Points",
      summary: "Discover the best camping points in the area.",
    },
    {
      title: "Camping Site 1",
      day: "Day 1",
      desc: "A beautiful camping site with scenic views and amenities.",
    },
    {
      title: "Camping Site 2",
      day: "Day 2",
      desc: "A secluded camping site perfect for stargazing.",
    },
    // Add more camping data as needed...
  ];
});

// Create the camping slice
const campingSlice = createSlice({
  name: 'camping',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampingData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCampingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default campingSlice.reducer;
