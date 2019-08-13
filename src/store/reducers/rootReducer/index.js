import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
import calendarReducer from './calendarReducer';

export default combineReducers({
  auth: authReducer,
  signUpForm: signUpReducer,
  signInForm: signInReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  calendar: calendarReducer
});