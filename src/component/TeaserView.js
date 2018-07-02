import React from 'react';

import styles from '../styles/content.module.css';
import teaserStyle from '../styles/teaser.module.css';
const imgSrc = 'https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmfDttj2mYJMHz1yxTTc4abSy66BC5Tx6LSD4x49FK2bkQ/Screen%20Shot%202018-06-09%20at%203.09.34%20PM.png';

const TeaserView = (props) => {
  return (
    <div className={styles.content}>
      <div className={teaserStyle.wrapper}>
        <h1>
          Your Vote Matters!
        </h1>
          Hi EOS world, EOSeoul(<font className={teaserStyle.strong}>eoseouldotio</font>) here! <br/>
          The EOS mainnet will be launched  <br/>

          on 10th June, 2018, at UTC 13:00. <br/><br/>

          We are now at the final step to begin our voyager into the new world.

        <br/>
        <img src={imgSrc} alt="voting"/>
        <br/>

          That's right. <br/>
          VOTE <br/>

          With your votes, you can empower EOS.<br/>

          How to vote for EOSeoul?<br/>

          Remember <font className={teaserStyle.strong}>eoseouldotio</font>
      </div>
    </div>
  );
};

export default TeaserView;

