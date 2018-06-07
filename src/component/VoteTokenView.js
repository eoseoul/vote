import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Typography from '@material-ui/core/Typography';

import {Pie} from 'react-chartjs-2';

import styles from '../styles/voteCard.module.css';

const symbol = window.STATS_CONFIG.symbol;

const StakeDialog = (props) => {
  const {
    open, balance, handleClose, handleStake, handleChangeStake, stake, summary, handleStakeCPUMax, handleStakeNetMax} = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Stake</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To stake your ${symbol}, please fill the following information`} <br/>
          You have {balance} available. <br/>
          {`Total CPU Stake : ${summary.total_cpu_weight} Total NET Stake : ${summary.total_net_weight}`}
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <TextField margin="dense" id="name" label="CPU" name="stake_cpu_quantity" value={stake.stake_cpu_quantity} onChange={handleChangeStake} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleStakeCPUMax} className={styles.stake__max_button}>Max</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <TextField id="name" label="Network" name="stake_net_quantity" value={stake.stake_net_quantity} onChange={handleChangeStake} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleStakeNetMax} className={styles.stake__max_button2}>Max</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} className={styles.vote__button2}> Cancel </Button>
        <Button variant="outlined" onClick={handleStake} className={styles.vote__button}> Stake </Button>
      </DialogActions>
    </Dialog>
  );
};

const UnstakeDialog = (props) => {
  const {open, staked, handleClose, handleUnstake, handleChangeUnstake, unstake, summary, handleUnstakeCPUMax, handleUnstakeNetMax} = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Unstake</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To Unstake your ${symbol}, please fill the following information`}<br/>
          {'If you unstake, it takes 3 days to process the unstake value.'} <br/>
          {`You have staked ${staked}.`} <br/>
          {`Total CPU Stake : ${summary.total_cpu_weight} Total NET Stake : ${summary.total_net_weight}`}
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <TextField margin="dense" id="name" label="CPU" name="unstake_cpu_quantity" value={unstake.unstake_cpu_quantity} onChange={handleChangeUnstake} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleUnstakeCPUMax} className={styles.stake__max_button}>Max</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <TextField margin="dense" id="name" label="Network" name="unstake_net_quantity" value={unstake.unstake_net_quantity} onChange={handleChangeUnstake} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleUnstakeNetMax} className={styles.stake__max_button}>Max</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} className={styles.vote__button2}> Cancel </Button>
        <Button variant="outlined" onClick={handleUnstake} className={styles.vote__button}> Unstake </Button>
      </DialogActions>
    </Dialog>
  );
};

const VoteToken = (props) => (
  <Card className={styles.votePower}>
    <CardContent>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <div className={styles.vote__head}>
            <div className={styles.vote__head_title}>
              <h2><strong>Stake</strong></h2>
            </div>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={8}>
            <Grid item xs={12} className={styles.vote__list2}>
              <dl>
                <dt>
                  <p>Staked <strong>{`${symbol}`}</strong></p>
                </dt>
                <dd>{props.staked}</dd>
              </dl>
            </Grid>
            <Grid item xs={12} className={styles.vote__list2}>
              <dl>
                <dt>
                  <p>Refunding <strong>{`${symbol}`}</strong></p>
                </dt>
                <dd>{props.unstaked}</dd>
              </dl>
            </Grid>
            <Grid item xs={12} className={styles.vote__list2}>
              <dl>
                <dt>
                  <p>Balance <strong>{`${symbol}`}</strong></p>
                </dt>
                <dd>{props.balance}</dd>
              </dl>
            </Grid>
            <Grid item xs={12} className={styles.vote__list2}>
              <dl>
                <dt>
                  <p>Total <strong>{`${symbol}`}</strong></p>
                </dt>
                <dd>{props.totalBalance}</dd>
              </dl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Pie data={props.data} width={450} height={450} />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={props.handleClickOpenStake} className={styles.vote__button}> Stake </Button>
          <Button onClick={props.handleClickOpenUnstake} className={styles.vote__button2}> Unstake </Button>
        </Grid>
      </Grid>
      <StakeDialog
        open={props.openStake}
        balance={props.balance}
        summary={props.summary}
        handleClose={props.handleClickCloseStake}
        handleChangeStake={props.handleChangeStake}
        handleStake={props.handleStake}
        stake={props.stake}
        handleStakeCPUMax={props.handleStakeCPUMax}
        handleStakeNetMax={props.handleStakeNetMax}
      />
      <UnstakeDialog
        open={props.openUnstake}
        staked={props.staked}
        summary={props.summary}
        handleClose={props.handleClickCloseUnstake}
        handleChangeUnstake={props.handleChangeUnstake}
        handleUnstake={props.handleUnstake}
        unstake={props.unstake}
        handleUnstakeCPUMax={props.handleUnstakeCPUMax}
        handleUnstakeNetMax={props.handleUnstakeNetMax}
      />
    </CardContent>
  </Card>
);

export default VoteToken;
