import React, {Component} from 'react';
// simport PropTypes from 'prop-types';
// import * as _ from 'lodash';
import styles from '../styles/Footer.module.css';

const image_path = (filename) => require(`../static/images/${filename}`);

class Footer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <footer className={styles.footer}>
        <section className={styles.footer_inner}>
          <div className={styles.left_area}>
            <ul className={styles.social_link}>
              <li>
                <a href="https://github.com/EOSeoul" target="_blank" rel="noopener noreferrer"><img src={image_path('footer__socialLink--github.png')} alt="Go to EOSeoul Github"/></a>
              </li>
              <li>
                <a href="https://t.me/eoseoul" target="_blank" rel="noopener noreferrer"><img src={image_path('footer__socialLink--telegram.png')} alt="Go to EOSeoul Telegram"/></a>
              </li>
              <li>
                <a href="https://twitter.com/eoseoul_kor" target="_blank" rel="noopener noreferrer"><img src={image_path('footer__socialLink--twitter.png')} alt="Go to EOSeoul Twitter"/></a>
              </li>
              <li>
                <a href="https://www.facebook.com/EOSeoul.kr/" target="_blank" rel="noopener noreferrer"><img src={image_path('footer__socialLink--facebook.png')} alt="Go to EOSeoul Facebook"/></a>
              </li>
              <li>
                <a href="https://steemit.com/@eoseoul" target="_blank" rel="noopener noreferrer"><img src={image_path('footer__socialLink--steemit.png')} alt="Go to EOSeoul Steemit"/></a>
              </li>
            </ul>
            <div className={styles.footer_logo}><img src={image_path('EOSeoul_logo_WH.png')} alt="EOSeoul"/></div>
          </div>
          <div className={styles.right_area}>
            <ul className={styles.footer_nav}>
              <li>
                <a href="mailto:eoseoul@neowiz.com">eoseoul@neowiz.com</a>
              </li>
              <li>
                <a href="">Terms of Use</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
            </ul>
            <p className={styles.footer_copyright}>Copyright &copy; 2018 EOSeoul | All rights reserved</p>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
