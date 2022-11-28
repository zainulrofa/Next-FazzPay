import { statisticApi } from "src/modules/api/dashboard";
import { ACTION_STRING } from "./actionStrings";

const { getStatistic, pending, rejected, fulfilled } = ACTION_STRING;

const getStatisticPending = () => {
  return {
    type: getStatistic.concat(pending),
  };
};
const getStatisticRejected = (error) => {
  return {
    type: getStatistic.concat(rejected),
    payload: { error },
  };
};
const getStatisticFulfilled = (data) => {
  return {
    type: getStatistic.concat(fulfilled),
    payload: { data },
  };
};

const statisticThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(getStatisticPending());
      const result = await statisticApi(token, id);
      dispatch(getStatisticFulfilled(result.data));
    } catch (error) {
      dispatch(getStatisticRejected(error));
    }
  };
};

const dashboardAction = {
  statisticThunk,
};

export default dashboardAction;
