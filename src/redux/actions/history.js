import { ActionType } from "redux-promise-middleware";
import { getHistory } from "src/modules/api/History";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const historyPending = () => ({
  type: ACTION_STRING.transactionGetHistory.concat("_", Pending),
});
const historyRejected = (error) => ({
  type: ACTION_STRING.transactionGetHistory.concat("_", Rejected),
  payload: { error },
});
const historyFulfilled = (data) => ({
  type: ACTION_STRING.transactionGetHistory.concat("_", Fulfilled),
  payload: { data },
});

const historyThunk = (token, params) => {
  return async (dispatch) => {
    try {
      dispatch(historyPending());
      const result = await getHistory(token, params);
      dispatch(historyFulfilled(result.data));
      //   typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(historyRejected(error));
      //   typeof cbDenied === "function" && cbDenied();
    }
  };
};

const historyAction = {
  historyThunk,
};

export default historyAction;
