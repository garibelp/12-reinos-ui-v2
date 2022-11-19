import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import backgroundReducer from "./slices/background.slice";
import characterReducer from "./slices/character.slice";
import jobReducer from "./slices/job.slice";
import lineageReducer from "./slices/lineage.slice";
import playerReducer from "./slices/player.slice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    background: backgroundReducer,
    job: jobReducer,
    lineage: lineageReducer,
    character: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
