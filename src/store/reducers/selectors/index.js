import { createSelector } from 'reselect';

export const selectors = {
  getSignInFields: (state) => state.signInForm.fields,
  getSignUpFields: (state) => state.signUpForm.fields,
  getSignInLoading: (state) => state.signInForm.loading,
  getSignUpLoading: (state) => state.signUpForm.loading,
  getSignInErrorMessage: (state) => state.signInForm.errorMessage,
  getSignUpErrorMessage: (state) => state.signUpForm.errorMessage,
  getAuth: (state) => state.firebase.auth,
  getProfile: (state) => state.firebase.profile,
  getFirebase: (state) => state.firebase,
  getFirestore: (state) => state.firestore,
  getCalendarFromDb: (state, uid) => state.firestore.ordered.calendars == undefined ?
    null :
    state.firestore.ordered.calendars[0],
  getDate: (state) => state.calendar.date,
  getWorkTime: (state) => state.calendar.workTime,
  getVisibility: (state) => state.calendar.visibility,
};