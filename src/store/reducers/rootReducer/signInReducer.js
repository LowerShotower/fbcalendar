
import { SIGN_IN_FIELDS, SIGN_IN } from "store/actions/types";
import { fbStore } from 'config/fbConfig';

const INITIAL_STATE = {
  fields: {
    email: {
      value: '',
    },
    password: {
      value: '',
    },
  },
  loading: false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SIGN_IN_FIELDS.UPDATE:
    return {
      ...state, fields: { ...state.fields, ...payload } 
    };

  case SIGN_IN_FIELDS.RESET:
    return {
      ...state, fields: { ...state.fields, ...INITIAL_STATE.fields }
    };

  case SIGN_IN.IS_LOADING:
    return { 
      ...state, loading: true,
    };
  case SIGN_IN.LOADING_DONE:
    return { 
      ...state, loading: false, 
    };

  case SIGN_IN.FAILTURE:
    return { ...state, errorMessage: payload.error };
  
  case SIGN_IN.SUCCESS:
    return { ...state, errorMessage: INITIAL_STATE.errorMessage };

  default:
    return state;
  }
};
