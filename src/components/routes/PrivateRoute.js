import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../store/reducers/selectors';

const PrivateRoute = ({
  component: Component,
  redirectTo, redirectCondition,
  path, location,
  ...rest
}) => {
  return redirectCondition ?
    <Redirect to={{ pathname: redirectTo, state: { from: location } }} /> :
    <Route {...rest} component={Component} />;
};

export default PrivateRoute;