import * as ActionTypes from "../ActionTypes";

const initialState = {
  token: null,
  userId: null,
  expiryDate: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
      };
    case ActionTypes.AUTH_FAIL:
        return {
            ...state,
            token: null,
            userId: null,
            error: action.error,
        }
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
