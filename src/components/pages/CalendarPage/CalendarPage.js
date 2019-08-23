import React, { Component } from "react";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './CalendarPage.scss';
import routes from 'constants/routes';
import { selectors } from 'store/reducers/selectors';
import FirebaseCalendar from 'components/layout/FirebaseCalendar';

class Home extends Component {
  render() {
    return (
      <div styleName="calendar-page">
        <FirebaseCalendar/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: selectors.getAuth(state),
  };
};

export default compose(
  firestoreConnect((props, { firebase }) => {
    const uid = firebase.auth().currentUser.uid;
    return [
      `calendars/${uid}`
    ];
  }),
  connect(mapStateToProps, null)
)(Home);