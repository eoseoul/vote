import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardContent from 'material-ui/Card/CardContent';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import InputAdornment from 'material-ui/Input/InputAdornment';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';

import styles from '../styles/Stake.module.css';

// const VoteView = () => (
export default class StakeView extends React.Component {
  state = {
    stakeOpen : false,
    unstakeOpen : false
  };

  stakeClickOpen = () => {
    this.setState({stakeOpen : true});
  };
  stakeClickClose = () => {
    this.setState({stakeOpen : false});
  };
  unstakeClickOpen = () => {
    this.setState({unstakeOpen : true});
  };
  unstakeClickClose = () => {
    this.setState({unstakeOpen : false});
  };

  render () {
    return (
      <div className={styles.stake}>
        <div className={styles.stake__head}>
          <div className={styles.stake__head_title}>
            <h2><strong>Stake</strong></h2>
          </div>
        </div>
        <div className={styles.stake__content}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>

              { /*빈 영역 입니다.*/ }

            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <Card>
                  <CardContent>
                    <h3>
                      <p>EOS <strong>Tokens</strong></p>
                    </h3>
                    <div className={styles.stake__content_section}>
                      <div className={styles.stake__table}>
                        <div className={styles.stake__datalist}>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>CPU Stake</div>
                            <div className={styles.stake__datalist_value}>50,000 EOS</div>
                          </div>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>Net Stake</div>
                            <div className={styles.stake__datalist_value}>30,000 EOS</div>
                          </div>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>unStake</div>
                            <div className={styles.stake__datalist_value}>20,000 EOS</div>
                          </div>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>revoke</div>
                            <div className={styles.stake__datalist_value}>10,000 EOS</div>
                          </div>
                        </div>
                        <div className={styles.stake__datatotal}>
                          <div className={styles.stake__datatotal_group}>
                            <div className={styles.stake__datatotal_title}>Total</div>
                            <div className={styles.stake__datatotal_value}>110,000 EOS</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.stake__chart}>
                        chart area
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button variant="raised" className={styles.button_raised} onClick={this.stakeClickOpen}>Stake</Button>
                    <Dialog
                      open={this.state.stakeOpen}
                      onClose={this.stakeClickClose}
                    >
                      <DialogContent
                        className={styles.stake__dialog}
                      >
                        <h3>
                          <p>Stake <strong>EOS</strong></p>
                        </h3>
                        <Grid container spacing={24}>
                          <Grid item xs={12} sm={6}>
                            <div className={styles.dialog__content_section}>
                              <div className={styles.dialog__inputfield}>
                                <TextField
                                  type="number"
                                  autoFocus
                                  label="CPU Stake"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: <InputAdornment position="start">EOS</InputAdornment>,
                                  }}
                                />
                                <TextField
                                  type="number"
                                  label="Net Stake"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: <InputAdornment position="start">EOS</InputAdornment>,
                                  }}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <div className={styles.dialog__table}>
                              <div className={styles.dialog__datalist}>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>CPU Stake</div>
                                  <div className={styles.dialog__datalist_value}>50,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>Net Stake</div>
                                  <div className={styles.dialog__datalist_value}>30,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>unStake</div>
                                  <div className={styles.dialog__datalist_value}>20,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>revoke</div>
                                  <div className={styles.dialog__datalist_value}>10,000 EOS</div>
                                </div>
                              </div>
                              <div className={styles.dialog__datatotal}>
                                <div className={styles.dialog__datatotal_group}>
                                  <div className={styles.dialog__datatotal_title}>Total</div>
                                  <div className={styles.dialog__datatotal_value}>110,000 EOS</div>
                                </div>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button fullWidth variant="raised" className={styles.button_raised} onClick={this.stakeClickClose}>Stake</Button>
                      </DialogActions>
                    </Dialog>


                    <Button variant="flat" className={styles.button_outlined} onClick={this.unstakeClickOpen}>Unstake</Button>
                    <Dialog
                      open={this.state.unstakeOpen}
                      onClose={this.unstakeClickClose}
                    >
                      <DialogContent
                        className={styles.stake__dialog}
                      >
                        <h3>
                          <p>Unstake <strong>EOS</strong></p>
                        </h3>
                        <Grid container spacing={24}>
                          <Grid item xs={12} sm={6}>
                            <div className={styles.dialog__content_section}>
                              <div className={styles.dialog__inputfield}>
                                <TextField
                                  type="number"
                                  autoFocus
                                  label="CPU Stake"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: <InputAdornment position="start">EOS</InputAdornment>,
                                  }}
                                />
                                <TextField
                                  type="number"
                                  label="Net Stake"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: <InputAdornment position="start">EOS</InputAdornment>,
                                  }}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <div className={styles.dialog__table}>
                              <div className={styles.dialog__datalist}>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>CPU Stake</div>
                                  <div className={styles.dialog__datalist_value}>50,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>Net Stake</div>
                                  <div className={styles.dialog__datalist_value}>30,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>unStake</div>
                                  <div className={styles.dialog__datalist_value}>20,000 EOS</div>
                                </div>
                                <div className={styles.dialog__datalist_group}>
                                  <div className={styles.dialog__datalist_title}>revoke</div>
                                  <div className={styles.dialog__datalist_value}>10,000 EOS</div>
                                </div>
                              </div>
                              <div className={styles.dialog__datatotal}>
                                <div className={styles.dialog__datatotal_group}>
                                  <div className={styles.dialog__datatotal_title}>Total</div>
                                  <div className={styles.dialog__datatotal_value}>110,000 EOS</div>
                                </div>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button fullWidth variant="raised" className={styles.button_raised} onClick={this.unstakeClickClose}>Unstake</Button>
                      </DialogActions>
                    </Dialog>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <Card>
                  <CardContent>
                    <h3>
                      <p>Vote <strong>Power</strong></p>
                    </h3>
                    <div className={styles.stake__content_section}>
                      <div className={styles.stake__table}>
                        <div className={styles.stake__datalist}>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>VP (Self)</div>
                            <div className={styles.stake__datalist_value}>80,000 EOS</div>
                          </div>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>VP (Proxy)</div>
                            <div className={styles.stake__datalist_value}>70,000 EOS</div>
                          </div>
                        </div>
                        <div className={styles.stake__datatotal}>
                          <div className={styles.stake__datatotal_group}>
                            <div className={styles.stake__datatotal_title}>Total</div>
                            <div className={styles.stake__datatotal_value}>150,000 EOS</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.stake__chart}>
                        chart area
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <Card>
                  <CardContent>
                    <h3>
                      <p>Vote <strong>Power</strong></p>
                    </h3>
                    <div className={styles.stake__content_section}>
                      <div className={styles.stake__table}>
                        <div className={styles.stake__datalist}>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>VP (Voted)</div>
                            <div className={styles.stake__datalist_value}>100,000 EOS</div>
                          </div>
                          <div className={styles.stake__datalist_group}>
                            <div className={styles.stake__datalist_title}>VP (Remain)</div>
                            <div className={styles.stake__datalist_value}>50,000 EOS</div>
                          </div>
                        </div>
                        <div className={styles.stake__datatotal}>
                          <div className={styles.stake__datatotal_group}>
                            <div className={styles.stake__datatotal_title}>Total</div>
                            <div className={styles.stake__datatotal_value}>150,000 EOS</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.stake__chart}>
                        chart area
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
