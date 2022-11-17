import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtResponse } from "../../interfaces/jwt-response.interface";
import { PlayerState } from "../../utils/auth-utils";

const initialState: PlayerState = {
  id: null,
  username: null,
  email: null,
  roles: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<JwtResponse>) => {
      const {
        payload: { id, username, email, roles },
      } = action;
      state.id = id;
      state.username = username;
      state.email = email;
      state.roles = roles;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
