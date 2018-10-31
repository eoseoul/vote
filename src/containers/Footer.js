import React, {Component} from 'react';
import styles from '../styles/Footer.module.css';

import eoseoulLogo from '../static/images/footer__eoseoul_white.png';

const publicPath = window.STATS_CONFIG.publicPath;

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
          </div>
          <div className={styles.center_area}>
            <ul className={styles.social_link}>
              <li>
                <a href="https://www.eoseoul.io" target="_blank" rel="noopener noreferrer"><img style={{padding : '2px 10px 8px 60px', height : '50px'}} src={`${publicPath}${eoseoulLogo}`} alt="Go to EOSeoul Steemit"/></a>
              </li>
              <li>
                <a href="https://www.eoseoul.io" target="_blank" rel="noopener noreferrer"><img style={{padding : '18px 10px', width : '100px'}} src={image_path('footer__neoply.png')}alt="Go to EOSeoul Steemit"/></a>
              </li>
            </ul>
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
            <p className={styles.footer_copyright}>&copy; EOSeoul All rights reserved</p>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
