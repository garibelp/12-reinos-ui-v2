import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DetailedCharacter,
  UpdateAttributePayload,
} from "../../interfaces/character.interface";

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
    updateCurrentPoints: (
      state,
      action: PayloadAction<{ id: string; data: UpdateAttributePayload }>
    ) => {
      const { list } = state;
      const {
        payload: { id, data },
      } = action;

      const charIndex = list.findIndex((c) => c.id === id);

      if (charIndex >= 0) {
        list[charIndex] = {
          ...list[charIndex],
          ...data,
        };
      }
    },
  },
});

export const { addCharacterDetails, updateCurrentPoints } =
  characterSlice.actions;

export default characterSlice.reducer;
