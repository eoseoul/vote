import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import {loginProducer, resetLogin, resetAppError} from '../redux/actions/app';
import LoginView from './LoginView';

import {withAlert} from 'react-alert';

class Login extends Component {
  constructor(props) {
    super(props);

    this.bAlert = false;
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {login, history, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      this.props.resetAppError();
      this.props.alert.show(error.error_msg);
      return;
    }
    if (!_.isEmpty(login)) {
      history.push('/');
    }
  }

  handleLogin(loginReq) {
    this.bAlert = true;
    const req = {
      params : loginReq
    };
    this.props.resetLogin();
    this.props.loginProducer(req);
  }

  render() {
    return (
      <LoginView
        handleLogin={this.handleLogin}
      />
    );
  }
}

Login.propTypes = {
  login : PropTypes.object,
  error : PropTypes.object,
  history : PropTypes.object.isRequired,
  loginProducer : PropTypes.func.isRequired,
  resetLogin : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login : state.app.login,
    error : state.app.error
  };
}

export default connect(mapStateToProps, {loginProducer, resetLogin, resetAppError})(withAlert(Login));
