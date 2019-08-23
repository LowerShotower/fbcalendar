import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, SignUpPage, NotFoundPage, CalendarPage } from '../pages';
import PrivateRoute from './PrivateRoute';
import routes from 'constants/routes';
import { connect } from 'react-redux';
import { selectors } from 'store/reducers/selectors';

const Routes = (props) =>
  <Switch>
    <PrivateRoute
      path={routes.HOME}
      redirectTo={routes.SIGN_IN}
      redirectCondition={!props.auth.uid}
      exact
      component={HomePage}
    />
    <PrivateRoute
      path={routes.CALENDAR}
      redirectTo={routes.SIGN_IN}
      redirectCondition={!props.auth.uid}
      component={CalendarPage}
    />
    <PrivateRoute
      path={routes.SIGN_IN}
      redirectTo={routes.CALENDAR}
      redirectCondition={props.auth.uid}
      component={SignInPage}
    />
    <PrivateRoute
      path={routes.SIGN_UP}
      redirectTo={routes.CALENDAR}
      redirectCondition={props.auth.uid}
      component={SignUpPage}
    />
    <Route component={NotFoundPage} />
  </Switch>;

const mapStateToProps = (state) => {
  return {
    auth: selectors.getAuth(state),
  };
};

export default connect(mapStateToProps, null)(Routes);