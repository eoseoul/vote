import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import styles from '../styles/Login.module.css';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginReq : {
        email : '',
        passwd : ''
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleLogin(ev) {
    ev.preventDefault();
    this.props.handleLogin(this.state.loginReq);
  }

  onChange(ev) {
    const {loginReq} = this.state;
    loginReq[ev.target.name] = ev.target.value;
    this.setState({loginReq});
  }

  render() {
    const {loginReq} = this.state;
    return (
      <div className={styles.login}>
        <div className={styles.login__head}>
          <div className={styles.login__head_title}>
            <h2>Log<strong>in</strong> Producer</h2>
          </div>
          { /* <button type="button" className={styles.login__head_findpw}>forgot password</button> */ }
        </div>
        <div className={styles.login__content}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleLogin}
          >
            <div>
              <TextValidator
                id="textField_email"
                name = "email"
                value={loginReq.email}
                onChange ={this.onChange}
                label="email address"
                placeholder="email address"
                fullWidth
                multiline
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </div>
            <div>
              <TextValidator
                id="textField_password"
                name = "passwd"
                value={loginReq.passwd}
                onChange ={this.onChange}
                label="Password"
                placeholder="Password"
                type="password"
                fullWidth
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </div>
            <div className={styles.commit_area}>
              <button type="submit">Login</button>
            </div>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

LoginView.propTypes = {
  handleLogin : PropTypes.func.isRequired
};

export default LoginView;
