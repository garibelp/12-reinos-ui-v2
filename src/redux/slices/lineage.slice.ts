import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IdName } from "../../interfaces/id-name.interface";
import { DetailedLineage } from "../../interfaces/lineage.interface";

const initialState: { list: IdName[]; detailedList: DetailedLineage[] } = {
  list: [],
  detailedList: [],
};

export const lineageSlice = createSlice({
  name: "lineage",
  initialState,
  reducers: {
    setBasicLineages: (state, action: PayloadAction<IdName[]>) => {
      state.list = action.payload;
    },
    addDetailedLineage: (state, action: PayloadAction<DetailedLineage>) => {
      const { detailedList } = state;
      const { payload } = action;

      if (!detailedList.find((j) => j.id === payload.id)) {
        detailedList.push(payload);
      }
    },
  },
});

export const { setBasicLineages, addDetailedLineage } = lineageSlice.actions;

export default lineageSlice.reducer;
