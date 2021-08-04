import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Poet.module.scss';

const Poet = () => (
  <Link className={styles.Poet} to="/poets/@mayaan">
    <div className={styles.PoetAvatar} style={{backgroundImage: "url(https://memegenerator.net/img/images/300x300/71313125.jpg)"}}></div>
    <div className="PoetDetails">
      <b className="PoetName">William Shakespeer</b>
      <span className="PoetPoemsCount">154 Poems</span>
    </div>
  </Link>
);

export default Poet;
