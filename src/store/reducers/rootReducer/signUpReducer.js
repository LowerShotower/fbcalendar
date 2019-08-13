
import { SIGN_UP_FIELDS, SIGN_UP } from '../../actions/types';

const INITIAL_STATE = {
  fields: {
    email: {
      value: '',
    },
    firstName: {
      value: '',
    },
    lastName: {
      value: '',
    },
    password: {
      value: '',
    },
    confirm: {
      value: '',
    },
  },
  loading: false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

  case SIGN_UP_FIELDS.UPDATE:
    return { 
      ...state, fields: { ...state.fields, ...payload } 
    };

  case SIGN_UP_FIELDS.RESET:
    return { 
      ...state, fields: { ...state.fields, ...INITIAL_STATE.fields } 
    };

  case SIGN_UP.IS_LOADING:
    return { 
      ...state, loading: true,
    };
  case SIGN_UP.LOADING_DONE:
    return { 
      ...state, loading: false, 
    };


  case SIGN_UP.FAILTURE:
  case SIGN_UP.ERROR_MESSAGE.UPDATE:
    return { ...state, errorMessage: payload.error };

  case SIGN_UP.SUCCESS:
  case SIGN_UP.ERROR_MESSAGE.RESET:
    return { ...state, errorMessage: INITIAL_STATE.errorMessage };

  default:
    return state;
  }
};
