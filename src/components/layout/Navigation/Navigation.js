import React from 'react';
import styled from 'styled-components';
import './Navigation.css';
import { AvatarButton, NavButton } from 'components/buttons';
import { connect } from 'react-redux';

import { selectors } from 'store/reducers/selectors';
import routes from 'constants/routes';
import { signIn, signOut } from 'store/actions';

const SignInNavigation = (props) =>
  <div>
    <NavButton href={routes.CALENDAR} >Calendar</NavButton>
    <NavButton onClick={props.signOut}>Sing Out</NavButton>
    <AvatarButton
      type='circle'
      size="large"
    >
      <b>{('' + props.profile.initials).toUpperCase()}</b>
    </AvatarButton>
  </div >;

const SignOutNavigation = () =>
  <div style={{ height: '100%', }}>
    <NavButton href={routes.SIGN_IN} >Sign In</NavButton>
    <NavButton href={routes.SIGN_UP} >Sign up</NavButton>
  </div >;

const Navigation = ({ className, auth, signOut, profile }) => {
  return <div className={className}>{
    auth.uid ?
      <SignInNavigation signOut={signOut} profile={profile} /> :
      <SignOutNavigation />}
  </div>;
};

const StyledNavigation = styled(Navigation)`
  display:flex;
  justify-content:flex-end;
`;

const mapStateToProps = (state) => {
  return {
    auth: selectors.getAuth(state),
    profile: selectors.getProfile(state),
  };
};

const mapDispatchToProps = {
  signOut: signOut.request
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledNavigation);
