import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import playerReducer from "./slices/player.slice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
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
