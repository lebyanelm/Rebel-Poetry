import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.Loader} data-testid="Loader">
    <svg width="84" height="60" viewBox="0 0 84 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.FirstCircle} d="M0 30C0 13.4315 13.4315 0 30 0V0C46.5685 0 60 13.4315 60 30V30C60 46.5685 46.5685 60 30 60V60C13.4315 60 0 46.5685 0 30V30Z"/>
      <g className={styles.BlendGroup}>
        <rect className={styles.SecondCircle} x="24" width="60" height="60" rx="30" fill="#1436AD"/>
      </g>
    </svg>
  </div>
);

export default Loader;
