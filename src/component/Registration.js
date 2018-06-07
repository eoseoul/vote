import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import {withAlert} from 'react-alert';

import {resetAppError, registerProducer, getProducer} from '../redux/actions/app';
import RegistrationView from './RegistrationView';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.bAlert = false;
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    const login = this.props.login;
    if (_.isEmpty(login)) {
      return;
    }
    const prod = login.prod || {};
    const req = {params : {_id : prod._id}, login : login};
    this.props.getProducer(req);
  }

  componentWillReceiveProps(nextProps) {
    const {producer, history, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      this.props.resetAppError();
      this.props.alert.show(error.error_msg);
      return;
    }
    if (!_.isEmpty(producer)) {
      history.push('/validation');
    }
  }

  handleRegister(producer) {
    this.bAlert = true;
    const login = this.props.login || {};
    const req = {params : producer, login : login};
    this.props.registerProducer(req);
  }

  render() {
    return (
      <RegistrationView
        handleRegister={this.handleRegister}
      />
    );
  }
}

Registration.propTypes = {
  login : PropTypes.object,
  producer : PropTypes.object,
  error : PropTypes.object,
  history : PropTypes.object.isRequired,
  resetAppError : PropTypes.func.isRequired,
  registerProducer : PropTypes.func.isRequired,
  getProducer : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login : state.app.login,
    error : state.app.error,
    producer : state.app.producer
  };
}

export default connect(mapStateToProps, {resetAppError, registerProducer, getProducer})(withAlert(Registration));
