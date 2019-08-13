/* eslint-disable no-constant-condition */
import { put, call, fork, all, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import 'moment/locale/nb';
import { user, signInFields, signUpFields, signIn, signUp, signOut } from '../actions';
import { SIGN_IN, SIGN_OUT, SIGN_UP, USER, CALENDAR, DATE } from '../actions/types';
import firebase, { fbStore, fbAuth } from '../../config/fbConfig';
import db from '../../services/db';

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export default function* rootSaga() {
  yield all([
    fork(watchAuthActions),
    fork(watchFirebaseActions),
  ]);
}

function* watchAuthActions() {
  yield all([
    takeEvery(SIGN_IN.REQUEST, watchSignInRequest),
    takeEvery(SIGN_OUT.REQUEST, watchSignOutRequest),
    takeEvery(SIGN_UP.REQUEST, watchSignUpRequest),
  ]);
}

function* watchFirebaseActions() {
  yield all([
    takeEvery(DATE.SAVE_TO_DB, watchSaveDateToDb),
  ]);
}

function* watchSaveDateToDb({ payload }) {
  const { date } = payload;
  var userId = fbAuth.currentUser.uid;
  const rf = yield fbStore.collection('calendars').doc(`${userId}`);
  const formattedDay = moment(date.day).format('YYYY-MM-DD');
  const doc = yield db.getAll(rf);
  const updatedDates = {
    ...doc.data().dates,
    [formattedDay]: { day: formattedDay, hours: date.hours }
  };
  yield db.setDates(rf, updatedDates);
  const d = yield rf.get();

}

function* watchSignInRequest(action) {
  const { email: { value: email }, password: { value: password } } = action.payload;

  try {
    yield put(signIn.isLoading());
    let resp = yield call([fbAuth, fbAuth.signInWithEmailAndPassword], email, password);
    yield put(signIn.loadingDone());
    yield put(signIn.success());
    yield put(signInFields.reset());
  }
  catch (error) {
    yield put(signIn.loadingDone());
    yield put(signIn.failture(error.message));
  }
}

function* watchSignUpRequest(action) {
  const {
    email: { value: email },
    password: { value: password },
    firstName: { value: firstName },
    lastName: { value: lastName },
  } = action.payload;

  try {
    yield put(signUp.isLoading());
    let resp = yield call([fbAuth, fbAuth.createUserWithEmailAndPassword], email, password);
    fbStore.collection('users').doc(resp.user.uid).set({
      email,
      password,
      firstName,
      lastName,
      initials: firstName[0] + lastName[0],
    });
    fbStore
      .collection('calendars')
      .doc(resp.user.uid)
      .set({
        dates: [
          {
            calendarData: '0-00-00',
            mark: 'none',
            message: ''
          }
        ]
      });
    yield put(signUp.success());
    yield put(signUp.loadingDone());
    yield put(signUpFields.reset());
  }
  catch (error) {
    yield put(signUp.loadingDone());
    yield put(signUp.failture(error.message));
    yield put(signUpFields.reset());
  }
}

function* watchSignOutRequest() {
  try {
    yield call(fbAuth.signOut());
    yield put(signOut.success());
  } catch (error) {
    yield put(signOut.failture(error.message));
  }
}
