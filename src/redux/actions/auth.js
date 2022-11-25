import { ActionType } from "redux-promise-middleware";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
} from "src/modules/api/Auth";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const loginPending = () => ({
  type: ACTION_STRING.authLogin.concat("_", Pending),
});
const loginRejected = (error) => ({
  type: ACTION_STRING.authLogin.concat("_", Rejected),
  payload: { error },
});
const loginFulfilled = (data) => ({
  type: ACTION_STRING.authLogin.concat("_", Fulfilled),
  payload: { data },
});

const logoutPending = () => ({
  type: ACTION_STRING.authLogout.concat("_", Pending),
});
const logoutRejected = (error) => ({
  type: ACTION_STRING.authLogout.concat("_", Rejected),
  payload: { error },
});
const logoutFulfilled = (data) => ({
  type: ACTION_STRING.authLogout.concat("_", Fulfilled),
  payload: { data },
});

const registerPending = () => ({
  type: ACTION_STRING.authRegister.concat("_", Pending),
});
const registerRejected = (error) => ({
  type: ACTION_STRING.authRegister.concat("_", Rejected),
  payload: { error },
});
const registerFulfilled = (data) => ({
  type: ACTION_STRING.authRegister.concat("_", Fulfilled),
  payload: { data },
});

const forgotPending = () => ({
  type: ACTION_STRING.authForgot.concat("_", Pending),
});
const forgotRejected = (error) => ({
  type: ACTION_STRING.authForgot.concat("_", Rejected),
  payload: { error },
});
const forgotFulfilled = (data) => ({
  type: ACTION_STRING.authForgot.concat("_", Fulfilled),
  payload: { data },
});

const resetPending = () => ({
  type: ACTION_STRING.authReset.concat("_", Pending),
});
const resetRejected = (error) => ({
  type: ACTION_STRING.authReset.concat("_", Rejected),
  payload: { error },
});
const resetFulfilled = (data) => ({
  type: ACTION_STRING.authReset.concat("_", Fulfilled),
  payload: { data },
});

const loginThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(loginRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const logoutThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      const result = await logout();
      dispatch(logoutFulfilled(result.data));
    } catch (error) {
      dispatch(logoutRejected(error));
    }
  };
};

const registerThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      const result = await register(body);
      dispatch(registerFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(registerRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const forgotThunk = (body) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPending());
      const result = await forgotPassword(body);
      dispatch(forgotFulfilled(result.data));
    } catch (error) {
      dispatch(forgotRejected(error));
    }
  };
};

const resetThunk = (body) => {
  return async (dispatch) => {
    try {
      dispatch(resetPending());
      const result = await resetPassword(body);
      dispatch(resetFulfilled(result.data));
    } catch (error) {
      dispatch(resetRejected(error));
    }
  };
};

const authAction = {
  loginThunk,
  logoutThunk,
  registerThunk,
  forgotThunk,
  resetThunk,
};

export default authAction;
