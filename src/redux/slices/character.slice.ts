import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DetailedCharacter,
  UpdateAttributePayload,
} from "../../interfaces/character.interface";
import { Wound } from "../../interfaces/wound.interface";
import { DeathRollEnum } from "../../enum/death-roll.enum";

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
    updateWound: (
      state,
      action: PayloadAction<{ id: string; data?: Wound }>
    ) => {
      const { list } = state;
      const {
        payload: { id, data },
      } = action;

      const charIndex = list.findIndex((c) => c.id === id);
      if (charIndex >= 0) {
        list[charIndex] = {
          ...list[charIndex],
          wound: data,
        };
      }
    },
    updateDeathRolls: (
      state,
      action: PayloadAction<{
        id: string;
        data: {
          deathRollBody: DeathRollEnum;
          deathRollMind: DeathRollEnum;
          deathRollSpirit: DeathRollEnum;
        };
      }>
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
    updateStoreNotes: (
      state,
      action: PayloadAction<{
        id: string;
        notes?: string;
      }>
    ) => {
      const { list } = state;
      const {
        payload: { id, notes },
      } = action;

      const charIndex = list.findIndex((c) => c.id === id);
      if (charIndex >= 0) {
        list[charIndex] = {
          ...list[charIndex],
          notes,
        };
      }
    },
  },
});

export const {
  addCharacterDetails,
  updateCurrentPoints,
  updateWound,
  updateDeathRolls,
  updateStoreNotes,
} = characterSlice.actions;

export default characterSlice.reducer;
