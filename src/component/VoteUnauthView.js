import React from 'react';

import Grid from '@material-ui/core/Grid';

import VoteLogin from './VoteLogin';
import VoteSearchProducerUnauth from './VoteSearchProducerUnauth';

import contentStyles from '../styles/content.module.css';

const VoteUnauthView = (props) => (
  <div className={contentStyles.content}>
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <VoteLogin history={props.history} />
      </Grid>
      <Grid item xs={12}>
        <VoteSearchProducerUnauth history={props.history} producers={props.producers} totalVoteWeight={props.totalVoteWeight} />
      </Grid>
    </Grid>
  </div>
);

export default VoteUnauthView;
