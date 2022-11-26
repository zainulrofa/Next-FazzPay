import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isFulfilled: false,
  isError: false,
  error: null,
  history: [],
};

const historyReducer = (prevState = initialState, { type, payload }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { transactionGetHistory } = ACTION_STRING;

  switch (type) {
    case transactionGetHistory.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case transactionGetHistory.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case transactionGetHistory.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        history: payload.data.data,
      };
    default:
      return prevState;
  }
};

export default historyReducer;
