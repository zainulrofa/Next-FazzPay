import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  redirectUrl: "",
};

const topUpReducer = (prevState = initialState, { payload, type }) => {
  const { transactionTopUp, pending, rejected, fulfilled } = ACTION_STRING;
  switch (type) {
    case transactionTopUp.concat(pending):
      return {
        isLoading: true,
        isError: false,
      };
    case transactionTopUp.concat(rejected):
      return {
        isLoading: false,
        isError: true,
        error: payload.response.data.msg,
      };

    case transactionTopUp.concat(fulfilled):
      return {
        isLoading: false,
        isError: false,
        redirectUrl: payload.data.data.redirectUrl,
      };

    default:
      return prevState;
  }
};

export default topUpReducer;
