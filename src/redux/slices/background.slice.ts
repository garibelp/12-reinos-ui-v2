import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Background } from "../../interfaces/background.interface";

const initialState: { list: Background[] } = {
  list: [],
};

export const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    setBackgrounds: (state, action: PayloadAction<Background[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setBackgrounds } = backgroundSlice.actions;

export default backgroundSlice.reducer;
