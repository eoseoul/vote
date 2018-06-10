import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './containers/Header';
import Footer from './containers/Footer';

import routes from './routes';
import './styles/App.module.css';
import img from './static/images/background__image.png';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = 'jss-insertion-point';

const options = {
  position : 'top right',
  timeout : 5000,
  offset : '30px',
  transition : 'scale'
};

const imageUrl = `${window.STATS_CONFIG.publicPath}${img}`;
const appStyle = {
  minWidth : '1024px',
  background : `url(${imageUrl}) 0 0 no-repeat`,
  backgroundAttachment : 'fixed',
  backgroundColor : '#fff'
};

class App extends Component {
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div style={appStyle}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Header/>
            {
              (() => routes())()
            }
            <Footer />
          </AlertProvider>
        </div>
      </JssProvider>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(App);
