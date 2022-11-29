import { ACTION_STRING } from "src/redux/actions/actionStrings";

const initialState = {
  transferData: {
    receiverId: "",
    amount: "",
    notes: "",
    date: "",
    receiverData: null,
  },
  transferResult: {
    isLoading: false,
    isFulfilled: false,
    isError: false,
    status: 0,
    msg: "",
    data: null,
    error: "",
  },
};

const transferReducer = (prevState = initialState, { payload, type }) => {
  switch (type) {
    case ACTION_STRING.resetTransfer:
      return initialState;

    case ACTION_STRING.transferData:
      return {
        ...prevState,
        transferData: {
          receiverId: payload.body.receiverId,
          date: payload.body.date,
          amount: payload.body.amount,
          notes: payload.body.notes,
          receiverData: payload.body.receiverData,
        },
      };

    case ACTION_STRING.transfer.concat(ACTION_STRING.pending):
      return {
        ...prevState,
        transferResult: {
          isLoading: true,
          isFulfilled: false,
          isError: false,
        },
      };
    case ACTION_STRING.transfer.concat(ACTION_STRING.rejected):
      return {
        ...prevState,
        transferResult: {
          isLoading: false,
          isFulfilled: false,
          isError: true,
          error: payload.error.response.data.msg,
        },
      };
    case ACTION_STRING.transfer.concat(ACTION_STRING.fulfilled):
      return {
        ...prevState,
        transferResult: {
          isLoading: false,
          isFulfilled: true,
          status: payload.data.status,
          data: payload.data.data,
          msg: payload.data.msg,
        },
      };
    default:
      return initialState;
  }
};

export default transferReducer;
