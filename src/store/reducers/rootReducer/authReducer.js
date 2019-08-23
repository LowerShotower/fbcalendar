import { USER, SIGN_IN, SIGN_OUT, SIGN_UP } from 'store/actions/types';

const INITIAL_STATE = {
  user: null,
  errorMessage: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

  case USER.UPDATE:
    return { ...state, user: payload };

  case USER.RESET:
    return { ...state, user: INITIAL_STATE.user };

  default:
    return state;
  }
};
