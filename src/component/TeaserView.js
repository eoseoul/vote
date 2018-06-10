import React from 'react';

import styles from '../styles/content.module.css';
import teaserStyle from '../styles/teaser.module.css';
const imgSrc = 'https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmfDttj2mYJMHz1yxTTc4abSy66BC5Tx6LSD4x49FK2bkQ/Screen%20Shot%202018-06-09%20at%203.09.34%20PM.png';

const TeaserView = (props) => {
  return (
    <div className={styles.content}>
      <div className={teaserStyle.wrapper}>
      <h1>
        Your Vote matters
      </h1>
        Hello EOS members, we are EOSeoul(<font className={teaserStyle.strong}>eoseouldotio</font>). <br/>
        June 10th UTC 13:00 EOS mainnet will be launched <br/>

        Only the last step is left for EOS to truly begin
        <br/>
        <img src={imgSrc} alt="voting"/>
        <br/>

        Yes it is. <br/>
        Vote <br/>

        With your voting rights, you can empower EOS<br/>

        How to vote for EOSeoul?<br/>

        Remember <font className={teaserStyle.strong}>eoseouldotio</font>
      </div>
    </div>
  );
};

export default TeaserView;
