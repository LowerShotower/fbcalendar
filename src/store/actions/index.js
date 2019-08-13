import {
  USER,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIGN_IN_FIELDS,
  SIGN_UP_FIELDS,
  CALENDAR,
  DATE,
  WORK_TIME,
  VISIBILITY
} from './types';

/////////////////////////////////
//ACTION CREATORS
////////////////////////////////

function action(type, payload = {}) {
  return { type, payload };
}

export const signIn = {
  request: payload => action(SIGN_IN.REQUEST, payload),
  success: (resp) => action(SIGN_IN.SUCCESS, { resp }),
  failture: (error) => action(SIGN_IN.FAILTURE, { error }),
  isLoading: () => action(SIGN_IN.IS_LOADING),
  loadingDone: () => action(SIGN_IN.LOADING_DONE),
  errorMessageUpdate: (error) => action(SIGN_IN.ERROR_MESSAGE.UPDATE, { error }),
  errorMessageReset: () => action(SIGN_IN.ERROR_MESSAGE.RESET),
};

export const signUp = {
  request: payload => action(SIGN_UP.REQUEST, payload),
  success: (resp) => action(SIGN_UP.SUCCESS, { resp }),
  failture: (error) => action(SIGN_UP.FAILTURE, { error }),
  isLoading: () => action(SIGN_UP.IS_LOADING),
  loadingDone: () => action(SIGN_UP.LOADING_DONE),
  errorMessageUpdate: (error) => action(SIGN_UP.ERROR_MESSAGE.UPDATE, { error }),
  errorMessageReset: () => action(SIGN_UP.ERROR_MESSAGE.RESET),
};

export const signOut = {
  request: () => action(SIGN_OUT.REQUEST),
  success: () => action(SIGN_OUT.SUCCESS),
  failture: (error) => action(SIGN_OUT.FAILTURE, { error }),
  isLoading: () => action(SIGN_OUT.IS_LOADING),
  loadingDone: () => action(SIGN_OUT.LOADING_DONE),
};

export const user = {
  update: user => action(USER.UPDATE, user),
  reset: () => action(USER.RESET, null),
};

export const signInFields = {
  update: fields => action(SIGN_IN_FIELDS.UPDATE, fields),
  reset: () => action(SIGN_IN_FIELDS.RESET),
};

export const signUpFields = {
  update: fields => action(SIGN_UP_FIELDS.UPDATE, fields),
  reset: () => action(SIGN_UP_FIELDS.RESET),
};

export const calendar = {
  request: () => action(CALENDAR.REQUEST),
};

export const date = {
  update: (payload) => action(DATE.UPDATE, payload),
  saveToDb: (payload) => action(DATE.SAVE_TO_DB, payload),
};

export const workTime = {
  update: (payload) => action(WORK_TIME.UPDATE, payload),
  reset: () => action(WORK_TIME.RESET),

};

export const visibility = {
  update: (payload) => action(VISIBILITY.UPDATE, payload),
};


