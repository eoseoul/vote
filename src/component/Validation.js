import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import {withAlert} from 'react-alert';

import {getProducer, resetAppError, downloadConfig, downloadScript, validateNode} from '../redux/actions/app';
import ValidationView from './ValidationView';

class Validation extends Component {
  constructor(props) {
    super(props);

    this.bAlert = false;
    this.handleDownloadConfig = this.handleDownloadConfig.bind(this);
    this.handleDownloadScript = this.handleDownloadScript.bind(this);
    this.handleValidateNode = this.handleValidateNode.bind(this);
  }

  componentDidMount() {
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id}, login : login};
    this.props.getProducer(req);
  }

  componentWillReceiveProps(nextProps) {
    const {error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      this.props.resetAppError();
      this.props.alert.show(error.error_msg);
      return;
    }
  }

  handleDownloadConfig() {
    this.bAlert = true;
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id, name : 'config.ini'}, login : login};
    this.props.downloadConfig(req);
  }

  handleDownloadScript() {
    this.bAlert = true;
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id, name : 'eoseoul_node.zip'}, login : login};
    this.props.downloadScript(req);
  }

  handleValidateNode() {
    this.bAlert = true;
    const login = this.props.login || {};
    const prod = login.prod || {};
    const req = {params : {_id : prod._id}, login : login};
    this.props.validateNode(req);
  }

  render() {
    const producer = this.props.producer || {};
    const apiServer = window.STATS_CONFIG.apiServer;
    const downloadUrl = `${apiServer}/api/1/prods/${producer._id}/script`;

    return (
      <ValidationView
        handleDownloadConfig={this.handleDownloadConfig}
        handleDownloadScript={this.handleDownloadScript}
        handleValidateNode={this.handleValidateNode}
        downloadUrl={downloadUrl}
      />
    );
  }
}

Validation.propTypes = {
  login : PropTypes.object,
  producer : PropTypes.object,
  error : PropTypes.object,
  history : PropTypes.object.isRequired,
  getProducer : PropTypes.func.isRequired,
  resetAppError : PropTypes.func.isRequired,
  downloadConfig : PropTypes.func.isRequired,
  downloadScript : PropTypes.func.isRequired,
  validateNode : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login : state.app.login,
    error : state.app.error,
    producer : state.app.producer
  };
}

export default connect(mapStateToProps, {getProducer, resetAppError, downloadConfig, downloadScript, validateNode})(withAlert(Validation));
