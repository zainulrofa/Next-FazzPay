import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  userData: { id: null, token: null, pin: null },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
};

const authReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { authLogin, authRegister, authLogout, authForgot, authReset } =
    ACTION_STRING;
  switch (type) {
    case authRegister.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authRegister.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.msg,
      };
    case authRegister.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
      };

    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogin.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.msg,
      };
    case authLogin.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
          pin: payload.data.data.pin,
        },
      };

    case authLogout.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogout.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.msg,
      };
    case authLogout.concat("_", Fulfilled):
      return initialState;

    default:
      return prevState;
  }
};

export default authReducer;
