import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  gadgets: [],
};

// Create a slice
const gadgetSlice = createSlice({
  name: 'gadgets',
  initialState,
  reducers: {
    setGadgets: (state, action) => {
      state.gadgets = action.payload; // Set the gadgets array
    },
    addGadget: (state, action) => {
      state.gadgets.push(action.payload); // Add a new gadget
    },
    removeGadget: (state, action) => {
      state.gadgets = state.gadgets.filter(gadget => gadget.id !== action.payload); // Remove a gadget by id
    },
  },
});

// Export actions
export const { setGadgets, addGadget, removeGadget } = gadgetSlice.actions;

// Export reducer
export default gadgetSlice.reducer;
