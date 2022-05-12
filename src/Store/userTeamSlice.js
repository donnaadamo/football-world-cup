import { createSlice } from "@reduxjs/toolkit";
import GLOBAL from "../Config/Global";

const initialState = {
  firstTeam: {
    G: null,
    D: [],
    M: [],
    F: [],
  },
  substitutes: {
    G: null,
    D: [],
    M: [],
    F: [],
  },
  coach: null,
  playersByTeamId: {},
  playersTotal: 0,
  goalkeepersTotal: 0,
  defendersTotal: 0,
  midfieldersTotal: 0,
  forwardsTotal: 0,
};

export const userTeamSlice = createSlice({
  name: GLOBAL.TEXTS.REDUX.USER_TEAM_KEY,
  initialState,
  reducers: {
    addToFirstTeam: (state, action) => {
      addByTeamType(state, action, GLOBAL.TEXTS.REDUX.TEAM_TYPE_FIRST_TEAM);
    },
    addToSubstitutes: (state, action) => {
      addByTeamType(state, action, GLOBAL.TEXTS.REDUX.TEAM_TYPE_SUBSTITUTES);
    },
    addCoach: (state, action) => {
      state.coach = action.payload;
    },
    removeTeam: () => initialState,
    removeFromFirstTeam: (state, action) => {
      removeByTeamType(state, action, GLOBAL.TEXTS.REDUX.TEAM_TYPE_FIRST_TEAM);
    },
    removeFromSubstitutes: (state, action) => {
      removeByTeamType(state, action, GLOBAL.TEXTS.REDUX.TEAM_TYPE_SUBSTITUTES);
    },
    removeCoach: (state) => {
      state.coach = null;
    },
    addPlayersByTeamId: (state, action) => {
      const newState = { ...state.playersByTeamId };
      const playersAmount = newState[action.payload.teamId];
      newState[action.payload.teamId] = !playersAmount ? 1 : playersAmount + 1;
      state.playersByTeamId = newState;
    },
    removePlayersByTeamId: (state, action) => {
      const newState = { ...state.playersByTeamId };
      newState[action.payload.teamId]--;
      state.playersByTeamId = newState;
    },
    addToPlayersTotal: (state) => {
      state.playersTotal++;
    },
    removeFromPlayersTotal: (state) => {
      state.playersTotal--;
    },
  },
});

const addByTeamType = (state, action, type) => {
  switch (action.payload.position) {
    case GLOBAL.TEXTS.POSITIONS.GOALKEEPER:
      state[type].G = action.payload;
      state.goalkeepersTotal++;
      break;
    case GLOBAL.TEXTS.POSITIONS.DEFENDER:
      state[type].D = [...state[type].D, action.payload];
      state.defendersTotal++;
      break;
    case GLOBAL.TEXTS.POSITIONS.MIDFIELDER:
      state[type].M = [...state[type].M, action.payload];
      state.midfieldersTotal++;
      break;
    case GLOBAL.TEXTS.POSITIONS.FORWARD:
      state[type].F = [...state[type].F, action.payload];
      state.forwardsTotal++;
      break;
    default:
      return;
  }
};

const removeByTeamType = (state, action, type) => {
  switch (action.payload.position) {
    case GLOBAL.TEXTS.POSITIONS.GOALKEEPER:
      state[type].G = null;
      state.goalkeepersTotal--;
      break;
    case GLOBAL.TEXTS.POSITIONS.DEFENDER:
      state[type].D = state[type].D.filter((p) => p.id !== action.payload.id);
      state.defendersTotal--;
      break;
    case GLOBAL.TEXTS.POSITIONS.MIDFIELDER:
      state[type].M = state[type].M.filter((p) => p.id !== action.payload.id);
      state.midfieldersTotal--;
      break;
    case GLOBAL.TEXTS.POSITIONS.FORWARD:
      state[type].F = state[type].F.filter((p) => p.id !== action.payload.id);
      state.forwardsTotal--;
      break;
    default:
      return;
  }
};

export const {
  addToFirstTeam,
  addToSubstitutes,
  addCoach,
  removeTeam,
  removeFromFirstTeam,
  removeFromSubstitutes,
  removeCoach,
  addPlayersByTeamId,
  removePlayersByTeamId,
  addToPlayersTotal,
  removeFromPlayersTotal,
} = userTeamSlice.actions;

export default userTeamSlice.reducer;
