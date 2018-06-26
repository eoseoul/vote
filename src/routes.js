import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {userIsAuthenticatedRedir} from './auth';

import TransactionChartView from './component/TransactionChartView';
import Monitor from './component/Monitor';
import GoogleMap from './component/GoogleMap';
import Login from './component/Login';
import Registration from './component/Registration';
import Validation from './component/Validation';
import My from './component/My';
import Vote from './component/Vote';
import VoteUnauth from './component/VoteUnauth';
import VoteSignup from './component/VoteSignup';

import VoteProxy from './component/VoteProxy';
import VoteProxyUnauth from './component/VoteProxyUnauth';

import Bp from './component/Bp';

import styles from './styles/body.module.css';

const MyAuth = userIsAuthenticatedRedir(My);
const ValidationAuth = userIsAuthenticatedRedir(Validation);

export default () => (
  <div className={styles.body}>
    <Switch>
      <Route path="/chart" component={TransactionChartView}/>
      <Route path="/googlemap" component={GoogleMap}/>
      <Route path="/monitor" component={Monitor}/>
      <Route path="/login" component={Login}/>
      <Route path="/registration" component={Registration}/>
      <Route path="/validation" component={ValidationAuth}/>
      <Route path="/my" component={MyAuth}/>

      <Route path="/vote" component={Vote}/>
      <Route path="/votelogin" component={VoteUnauth}/>
      <Route path="/votesignup" component={VoteSignup}/>
      <Route path="/bp" component={Bp}/>

      <Route path="/voteproxy" component={VoteProxy}/>
      <Route path="/voteproxylogin" component={VoteProxyUnauth}/>

      <Route path="/" component={Monitor}/>
    </Switch>
  </div>
);
