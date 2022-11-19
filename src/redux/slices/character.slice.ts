import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedCharacter } from "../../interfaces/character.interface";

const initialState: { list: DetailedCharacter[] } = {
  list: [],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addCharacterDetails: (state, action: PayloadAction<DetailedCharacter>) => {
      const { list } = state;
      const { payload } = action;

      if (!list.find((c) => c.id === payload.id)) {
        list.push(payload);
      }
    },
  },
});

export const { addCharacterDetails } = characterSlice.actions;

export default characterSlice.reducer;
