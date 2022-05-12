import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import GLOBAL from "../Config/Global";

import teamReducer from "./teamSlice";
import userTeamReducer from "./userTeamSlice";

const persistConfig = {
  key: GLOBAL.TEXTS.REDUX.USER_TEAM_KEY,
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userTeamReducer);

const rootReducer = combineReducers({
  userTeam: persistedReducer,
  team: teamReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
