import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {HorizontalBar} from 'react-chartjs-2';

import styles from '../styles/voteCard.module.css';

const options = {
  tooltips : {
    enabled : false
  },
  legend : {
    display : false
  },
  scales : {
    xAxes : [{
      stacked : true,
      ticks : {
        beginAtZero : true
      },
      gridLines : {
        color : 'rgba(0,0,0,0.3)'
      }
    }],
    yAxes : [{
      stacked : true,
      gridLines : {
        color : 'rgba(0,0,0,0)'
      }
    }]
  }
};

const VoteStateView = (props) => {
  const {data, displayInfo} = props;
  return (
    <Card className={styles.votePower}>
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <div className={styles.vote__head}>
              <div className={styles.vote__head_title}>
                <h2>EOS BP Voting <strong>Statistics</strong></h2>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={styles.stateCaption}>
            <b><font style={{color : 'rgba(67, 64, 83, 1)'}}>
              {`Actual EOS Votes: ${displayInfo.total_activated_stake_percent} (${displayInfo.total_activated_stake})`}
            </font></b> <br/>
            <font style={{color : 'rgba(167, 164, 183, 1)'}}>
              <strike>
                {`Minimum Votes Required: ${displayInfo.target_activated_stake_percent} (${displayInfo.target_activated_stake})`}
              </strike>
            </font> <br/>
            <font style={{color : 'rgba(201, 192, 249, 1)'}}>
              {`Total EOS Supply: ${displayInfo.supply_percent} (${displayInfo.supply})`}
            </font> <br/>
          </Grid>
          <Grid item xs={12}>
            <HorizontalBar width={300} height={30} data={data} options={options} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>);
};

export default VoteStateView;
