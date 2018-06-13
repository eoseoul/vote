import React from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import contentStyles from '../styles/content.module.css';
import VoteSummary from './VoteSummary';
import VoteState from './VoteState';
import VotePower from './VotePower';
import VoteToken from './VoteToken';
import VoteSearchProducer from './VoteSearchProducer';
import VotedProducer from './VotedProducer';
import VoteProxy from './VoteProxy';

const Vote = (props) => (
  <div className={contentStyles.content}>
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <VoteSummary
          history={props.history}
          summary={props.summary}
          eosAccount={props.eosAccount}
          totalVoteWeight={props.totalVoteWeight}/>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <VoteToken
              summary={props.summary}
              eosAccount={props.eosAccount}
              totalVoteWeight={props.totalVoteWeight}/>
          </Grid>
          <Grid item xs={6}>
            <VotePower
              summary={props.summary}
              eosAccount={props.eosAccount}
              totalVoteWeight={props.totalVoteWeight}/>
          </Grid>
        </Grid>
      </Grid>
      {!_.isEmpty(props.gState) &&
      <Grid item xs={12}>
        <VoteState producers={props.producers} totalVoteWeight={props.totalVoteWeight} gState={props.gState} />
      </Grid>
      }
      <Grid item xs={12}>
        <VoteSearchProducer
          history={props.history}
          summary={props.summary}
          producers={props.producers}
          totalVoteWeight={props.totalVoteWeight}
          eosAccount={props.eosAccount}
          handleSelected={props.handleSelected}
          handleVote={props.handleVote}/>
      </Grid>
      <Grid item xs={12}>
        <VotedProducer
          history={props.history}
          summary={props.summary}
          producers={props.producers}
          totalVoteWeight={props.totalVoteWeight}
          eosAccount={props.eosAccount}
          handleSelected={props.handleSelected}
          handleVote={props.handleVoteUpdate}/>
      </Grid>
      <Grid item xs={12}>
        <VoteProxy summary={props.summary} eosAccount={props.eosAccount}/>
      </Grid>
    </Grid>
  </div>
);

export default Vote;
