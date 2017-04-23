import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.web3.defaultAddress,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/', // '/login' by default.
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.web3,
  redirectAction: routerActions.replace,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: web3 => web3.defaultAddress === null,
  allowRedirectBack: false
})

// UI Component Wrappers

export const VisibleOnlyAuth = UserAuthWrapper({
  authSelector: state => state.web3,
  wrapperDisplayName: 'VisibleOnlyAuth',
  predicate: web3 => web3.defaultAddress,
  FailureComponent: null
})

export const HiddenOnlyAuth = UserAuthWrapper({
  authSelector: state => state.web3,
  wrapperDisplayName: 'HiddenOnlyAuth',
  predicate: web3 => web3.defaultAddress === null,
  FailureComponent: null
})
