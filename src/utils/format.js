import numeral from 'numeral';

const symbol = window.STATS_CONFIG.symbol;

export function fromCoin(eos, surfix = true) {
  if (surfix === true) {
    return `${numeral(eos).format('0,0.0000')} ${symbol}`;
  }
  return numeral(eos).format('0,0.0000');
}

export function toCoin(eos, surfix = true) {
  if (surfix === true) {
    return `${numeral(eos).format('0.0000')} ${symbol}`;
  }
  return numeral(eos).format('0.0000');
}

export function fromVotingPower(vp) {
  if (vp > 1000000000000 * 10000) {
    const vpt = vp / 1000000000000;
    return `${numeral(vpt).format('0,0.0000')} t`;
  }
  return numeral(vp).format('0,0.0000 a');
}

export function fromVotingScale(scale) {
  return numeral(scale).format('0.00 %');
}

export function plusCoin(coin1, coin2, surfix = true) {
  const coin = numeral(coin1).value() + numeral(coin2).value();
  return fromCoin(coin, surfix);
}

export function minusCoin(coin1, coin2, surfix = true) {
  const coin = numeral(coin1).value() - numeral(coin2).value();
  return fromCoin(coin, surfix);
}

export function stake2vote(staked) {
  const weight = calcVoteWeight();
  return (staked) * weight;
}

export function vote2Stake(vp) {
  const weight = calcVoteWeight();
  return (vp) / weight / 10000;
}

export function calcVoteWeight() {
  const seconds_per_day = 24 * 3600;
  const block_timestamp_epoch = 946684800000;
  const weight = parseInt((Date.now() / 1000 - (block_timestamp_epoch / 1000)) / (seconds_per_day * 7), 10) / 52;
  return Math.pow(2, weight);
}
