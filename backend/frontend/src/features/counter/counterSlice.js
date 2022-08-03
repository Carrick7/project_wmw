import { createSlice } from "@reduxjs/toolkit";

//initial state for counter
const initialState = {
  value: 0,
};

//reducer for counter
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    reset_c: (state) => initialState
  }
});

export const { increment, reset_c } = counterSlice.actions;
export default counterSlice.reducer;