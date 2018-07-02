import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// import _ from 'lodash';

import styles from '../styles/Header.module.css';

import Button from '@material-ui/core/Button';

import {logoutUser} from '../redux/actions/app';

const image_path = (filename) => require(`../static/images/${filename}`);

class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <header className={styles.header}>
        <section className={styles.header_inner}>
          <div className={styles.logo_area}>
            <Link className={styles.logo} to="/"><img src={image_path('header__logo--default.jpg')} alt="EOStat"/>EOStat</Link>
          </div>
          <nav className={styles.nav_area}>
            <ul>
              <Button component={Link} to="vote" className={styles.header__button}> Vote Page </Button>
              { /*
                <Button component={Link} to="voteProxy" className={styles.header__button}> Vote Proxy Page </Button>
                */
              }
              <Button component={Link} to="governance" variant="outlined" color="primary"> Governance </Button>
              {/*
                (() => {
                  if (_.isEmpty(this.props.login)) {
                    return (
                      <ul>
                        <li><Button component={Link} to="/registration"> Register Producer </Button></li>
                        <li><Button component={Link} to="/login"> Login Producer </Button></li>
                      </ul>);
                  }
                  return (
                    <ul>
                      <li><Button component={Link} to="/my"> My Page </Button></li>
                      <li><Button onClick={this.props.logoutUser}>logout</Button></li>
                    </ul>);
                })()
              */
              }
            </ul>
          </nav>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  login : PropTypes.object
};

function mapStateToProps(state) {
  return {
    login : state.app.login,
    producer : state.app.producer
  };
}

export default connect(mapStateToProps, {logoutUser})(Header);
