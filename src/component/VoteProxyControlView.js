import React from 'react';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import styles from '../styles/voteCard.module.css';

const VoteProxyControlView = (props) => {
  const {handleProxy, proxyAccount, checked} = props;
  const proxyName = proxyAccount.account_name;
  const state = checked === true ? 'On' : 'Off';
  return (
    <Card >
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div className={styles.vote__head}>
              <div className={styles.vote__head_title}>
                <h2>Vote <strong>Proxy</strong></h2>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Switch
                  checked={checked}
                  onChange={handleProxy}
                  value="checked"
                  color="primary"/>
                }
                label={`${proxyName} (Proxy ${state})`}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VoteProxyControlView;
