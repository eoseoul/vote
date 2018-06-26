import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import styles from '../styles/voteCard.module.css';

const VoteLoginView = (props) => (
  <Card className = {styles.summary}>
    <CardContent>
      <Grid container spacing={16}>
        <Grid item xs={12} className={styles.vote_head__title}>
          <div className={styles.vote__head}>
            <div className={styles.vote__head_title}>
              <h2><strong>Login</strong></h2>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid item className={styles.vote__list}>
            <Button variant="outlined" fullWidth className={styles.button_raised} onClick={props.handleLoginScatter}> Login EOS (by using scatter) </Button>
            <Button style={{textTransform : 'none', textDecoration : 'underline', float : 'right', padding : 0, marginTop : 20}} onClick={props.handleMoveSignup}> create scatter wallet? </Button>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default VoteLoginView;
