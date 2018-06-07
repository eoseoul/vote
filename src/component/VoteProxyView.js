import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from '../styles/voteCard.module.css';

const VoteProxy = (props) => (
  <Card className={styles.card}>
    <CardContent>
      <div>
        proxy
        search
        proxy
      </div>
    </CardContent>
  </Card>
);

export default VoteProxy;
