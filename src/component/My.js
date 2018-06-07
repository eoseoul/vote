import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getProducer, updateProducer, downloadScript} from '../redux/actions/app';
import MyView from './MyView';

class My extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDownloadScript = this.handleDownloadScript.bind(this);
    this.isUpdated = false;
  }

  componentDidMount() {
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id}, login : login};
    this.props.getProducer(req);
  }

  componentWillReceiveProps(nextProps) {
    const {producer, history, error} = nextProps;
    if (!_.isEmpty(error)) {
      return;
    }
    if (this.isUpdated === true) {
      if (!_.isEmpty(producer) && producer.status !== 1) {
        history.push('/validation');
      } else {
        history.push('/');
      }
    }
  }

  handleUpdate(producer) {
    const login = this.props.login || {};
    const req = {params : producer, login : login};
    this.props.updateProducer(req);
    this.isUpdated = true;
  }

  handleDownloadScript() {
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id, name : 'eoseoul_node.zip'}, login : login};
    this.props.downloadScript(req);
  }

  render() {
    if (_.isEmpty(this.props.producer)) {
      return null;
    }
    return (
      <MyView
        handleUpdate={this.handleUpdate}
        handleDownloadScript={this.handleDownloadScript}
        producer={this.props.producer}
      />
    );
  }
}

My.propTypes = {
  login : PropTypes.object.isRequired,
  producer : PropTypes.object,
  history : PropTypes.object.isRequired,
  error : PropTypes.object
};

function mapStateToProps(state) {
  return {
    login : state.app.login,
    producer : state.app.producer
  };
}

export default connect(mapStateToProps, {getProducer, updateProducer, downloadScript})(My);
