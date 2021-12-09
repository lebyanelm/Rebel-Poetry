import React from 'react';
import styles from './PreviewAvatar.module.scss';

const PreviewAvatar = ({ display_name, display_photo }) => (
  <div className={styles.PreviewAvatar}
    style={{backgroundImage: `url(${display_photo})`}} data-testid="PreviewAvatar">
    <div><div className={styles.PreviewDisplayName}>{ display_name }</div></div>
  </div>
);


export default PreviewAvatar;
