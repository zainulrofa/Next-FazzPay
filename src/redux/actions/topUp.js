import { ACTION_STRING } from "./actionStrings";
import { topUp } from "src/modules/api/topUp";
const { transactionTopUp, pending, rejected, fulfilled } = ACTION_STRING;

const topUpPending = () => ({
  type: transactionTopUp.concat(pending),
});
const topUpRejected = (error) => ({
  type: transactionTopUp.concat(rejected),
  payload: { error },
});
const topUpFulfilled = (data) => ({
  type: transactionTopUp.concat(fulfilled),
  payload: { data },
});

const topUpThunk = (body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(topUpPending());
      const result = await topUp(body, token);
      dispatch(topUpFulfilled(result.data));
      typeof cbSuccess === "function" &&
        cbSuccess(result.data.data.redirectUrl);
    } catch (error) {
      dispatch(topUpRejected(error));
      typeof cbDenied === "function" && cbDenied(error.response.data.msg);
    }
  };
};

const topUpAction = {
  topUpThunk,
};
export default topUpAction;
