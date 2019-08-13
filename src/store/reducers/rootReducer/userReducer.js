const INITIAL_STATE = {
  token:null,
  userId:null,
  email:null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

  case 'SET_USER_ID':
    return { ...state, ...payload };

  default:
    return state;
  }
};
