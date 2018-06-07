import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {HorizontalBar} from 'react-chartjs-2';

import styles from '../styles/voteCard.module.css';

import {fromCoin} from '../utils/format';

const symbol = window.STATS_CONFIG.symbol;

const options = {
  legend : {
    display : true
  },
  scales : {
    xAxes : [{
      ticks : {
        beginAtZero : true
      },
      gridLines : {
        color : 'rgba(0,0,0,0.3)'
      }
    }],
    yAxes : [{
      gridLines : {
        color : 'rgba(0,0,0,0)'
      }
    }]
  }
};

const VotePower = (props) => (
  <Card className={styles.votePower}>
    <CardContent>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <div className={styles.vote__head}>
            <div className={styles.vote__head_title}>
              <h2>Voting <strong>Power</strong></h2>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={6} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Last <strong>Voting</strong></p>
                </dt>
                <dd>{`${fromCoin(props.lastStakeWeight)} ${symbol}`}</dd>
              </dl>
            </Grid>
            <Grid item xs={6} className={styles.vote__list}>
              <dl>
                <dt>
                  <p>Current <strong>Voting</strong></p>
                </dt>
                <dd>{`${fromCoin(props.staked)} ${symbol}`} </dd>
              </dl>
            </Grid>
            <Grid item xs={12} className={styles.vote__list}>
              <HorizontalBar width={300} height={120} data={props.data} options={options} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default VotePower;
