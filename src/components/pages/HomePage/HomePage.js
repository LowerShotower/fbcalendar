import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './HomePage.scss';
import routes from 'constants/routes';
import { selectors } from 'store/reducers/selectors';

class Home extends Component {
  render() {
    return (
      <div styleName="home-page">
        <h1>Hi</h1>
        <p>You are using Firebase Calendar</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default compose(
  firestoreConnect([
    'calendars'
  ]),
  connect(mapStateToProps, null)
)(Home);