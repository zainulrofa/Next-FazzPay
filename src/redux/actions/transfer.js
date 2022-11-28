import { transfer } from "components/modules/api/Transfer";
import { ACTION_STRING } from "./actionStrings";

const transferPending = () => {
  return {
    type: ACTION_STRING.transfer.concat(ACTION_STRING.pending),
  };
};
const transferRejected = (error) => {
  return {
    type: ACTION_STRING.transfer.concat(ACTION_STRING.rejected),
    payload: { error },
  };
};
const transferFulfilled = (data) => {
  return {
    type: ACTION_STRING.transfer.concat(ACTION_STRING.fulfilled),
    payload: { data },
  };
};

const transferThunk = (token, body) => {
  return async (dispatch) => {
    try {
      dispatch(transferPending());
      const result = await transfer(token, body);
      dispatch(transferFulfilled(result.data));
    } catch (error) {
      dispatch(transferRejected(error));
    }
  };
};

const transferReset = () => {
  return {
    type: ACTION_STRING.resetTransfer,
  };
};

const transferData = (body) => {
  return {
    type: ACTION_STRING.transferData,
    payload: { body },
  };
};
const transferAction = { transferReset, transferData, transferThunk };

export default transferAction;
