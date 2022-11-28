import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import historyReducer from "./history";
import userReducer from "./user";
import topUpReducer from "./topUp";
import transferReducer from "./transfer";
import dashboardReducer from "./dashboard";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  history: historyReducer,
  topUp: topUpReducer,
  transfer: transferReducer,
  dashboard: dashboardReducer,
});
