import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import historyReducer from "./history";
import userReducer from "./user";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  history: historyReducer,
});
