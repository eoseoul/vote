import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import _ from 'lodash';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector : (state) => state.app.login !== null,
  authenticatingSelector : (state) => state.app.login !== null,
  wrapperDisplayName : 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath : '/login'
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath : '/',
  allowRedirectBack : false,
  authenticatedSelector : (state) => state.app.login !== null && state.app.login,
  predicate : (user) => user.isAdmin,
  wrapperDisplayName : 'UserIsAdmin'
});

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector : (state) => _.isEmpty(state.app.login),
  wrapperDisplayName : 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath : (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack : false
});
