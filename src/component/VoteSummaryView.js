import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import styles from '../styles/voteCard.module.css';
import {fromCoin} from '../utils/format';

const symbol = window.STATS_CONFIG.symbol;

const VoteSummary = (props) => (
  <Card className = {styles.summary}>
    <CardContent>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <div className={styles.vote__head}>
            <div className={styles.vote__head_title}>
              <h2>Vote <strong>Summary</strong></h2>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Account <strong>Name</strong></p>
                </dt>
                <dd>{props.name}</dd>
              </dl>
            </Grid>
            <Grid item xs={3} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Total <strong>{`${symbol}`}</strong></p>
                </dt>
                <dd>{fromCoin(props.eos)}</dd>
              </dl>
            </Grid>
            <Grid item xs={2} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Total <strong>Voting</strong></p>
                </dt>
                <dd>{fromCoin(props.staked)}</dd>
              </dl>
            </Grid>
            <Grid item xs={2} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Voted <strong>Producer</strong></p>
                </dt>
                <dd>{props.voteCount}/30</dd>
              </dl>
            </Grid>
            <Grid item xs={3} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Logout EOS by <strong>Scatter</strong></p>
                </dt>
                <dd><Button variant="outlined" className={styles.button_raised} onClick={props.handleLogoutScatter}> Logout </Button></dd>
              </dl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default VoteSummary;
