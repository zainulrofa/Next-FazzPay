import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  error: false,
  data: {},
};

const dashboardReducer = (prevState = initialState, { type, payload }) => {
  const { getStatistic, pending, rejected, fulfilled } = ACTION_STRING;

  switch (type) {
    case getStatistic.concat(pending):
      return { ...prevState, isLoading: true, isError: false };
    case getStatistic.concat(rejected):
      return {
        prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case getStatistic.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        data: payload.data.data,
      };

    default:
      return prevState;
  }
};

export default dashboardReducer;
