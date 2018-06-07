/* eslint-disable no-constant-condition */
import {loginScatter, logoutScatter, getInfo, newAccount, getAccount, getBalance, getVoter, getProducers, stake, unstake, vote} from '../actions/eos';
import {loginScatterApi, logoutScatterApi, getInfoApi, newAccountApi, getAccountApi, getBalanceApi, getVoterApi, getProducersApi, delegatebwApi, undelegatebwApi, voteApi} from '../services/eos';
import {createWorker, createWatcher} from '../utils/saga';

const loginScatterWorker = createWorker(loginScatter.sagaAction, loginScatterApi);
const logoutScatterWorker = createWorker(logoutScatter.sagaAction, logoutScatterApi);

const getInfoWorker = createWorker(getInfo.sagaAction, getInfoApi);

const newAccountWorker = createWorker(newAccount.sagaAction, newAccountApi);
const getAccountWorker = createWorker(getAccount.sagaAction, getAccountApi);

const getBalanceWorker = createWorker(getBalance.sagaAction, getBalanceApi);
const getVoterWorker = createWorker(getVoter.sagaAction, getVoterApi);
const getProducersWorker = createWorker(getProducers.sagaAction, getProducersApi);
const stakeWorker = createWorker(stake.sagaAction, delegatebwApi);
const unstakeWorker = createWorker(unstake.sagaAction, undelegatebwApi);
const voteWorker = createWorker(vote.sagaAction, voteApi);

const watchLoginScatter = createWatcher(loginScatter.sagaTriggerType, loginScatterWorker);
const watchLogoutScatter = createWatcher(logoutScatter.sagaTriggerType, logoutScatterWorker);

const watchGetInfo = createWatcher(getInfo.sagaTriggerType, getInfoWorker);

const watchNewAccount = createWatcher(newAccount.sagaTriggerType, newAccountWorker);
const watchGetAccount = createWatcher(getAccount.sagaTriggerType, getAccountWorker);
const watchGetBalance = createWatcher(getBalance.sagaTriggerType, getBalanceWorker);
const watchGetVoter = createWatcher(getVoter.sagaTriggerType, getVoterWorker);
const watchGetProducers = createWatcher(getProducers.sagaTriggerType, getProducersWorker);
const watchStake = createWatcher(stake.sagaTriggerType, stakeWorker);
const watchUnstake = createWatcher(unstake.sagaTriggerType, unstakeWorker);
const watchVote = createWatcher(vote.sagaTriggerType, voteWorker);

export default [watchLoginScatter, watchLogoutScatter, watchGetInfo, watchNewAccount, watchGetAccount, watchGetBalance, watchGetVoter, watchGetProducers, watchStake, watchUnstake, watchVote];
