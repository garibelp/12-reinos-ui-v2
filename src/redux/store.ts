import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import backgroundReducer from "./slices/background.slice";
import playerReducer from "./slices/player.slice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    background: backgroundReducer,
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
