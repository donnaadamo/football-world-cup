import { createSlice } from "@reduxjs/toolkit";
import GLOBAL from "../Config/Global";

export const teamSlice = createSlice({
  name: GLOBAL.TEXTS.REDUX.TEAM_KEY,
  initialState: { name: null, id: null, coach: null },
  reducers: {
    selectTeam: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.coach = action.payload.coach;
    },
  },
});

export const { selectTeam } = teamSlice.actions;

export default teamSlice.reducer;
