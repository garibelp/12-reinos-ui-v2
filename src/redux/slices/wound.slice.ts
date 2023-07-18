import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Wound } from "../../interfaces/wound.interface";

const initialState: { list: Wound[] } = {
  list: [],
};

export const woundSlice = createSlice({
  name: "wound",
  initialState,
  reducers: {
    setWoundList: (state, action: PayloadAction<Wound[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setWoundList } = woundSlice.actions;

export default woundSlice.reducer;
