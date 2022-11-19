import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IdName } from "../../interfaces/id-name.interface";
import { DetailedJob } from "../../interfaces/job.interface";

const initialState: { list: IdName[]; detailedList: DetailedJob[] } = {
  list: [],
  detailedList: [],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setBasicJobs: (state, action: PayloadAction<IdName[]>) => {
      state.list = action.payload;
    },
    addDetailedJob: (state, action: PayloadAction<DetailedJob>) => {
      const { detailedList } = state;
      const { payload } = action;

      if (!detailedList.find((j) => j.id === payload.id)) {
        detailedList.push(payload);
      }
    },
  },
});

export const { setBasicJobs, addDetailedJob } = jobSlice.actions;

export default jobSlice.reducer;
