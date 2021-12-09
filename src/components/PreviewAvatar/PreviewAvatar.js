import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewAvatar.module.scss';

const PreviewAvatar = () => (
  <div className={styles.PreviewAvatar} data-testid="PreviewAvatar">
    PreviewAvatar Component
  </div>
);

PreviewAvatar.propTypes = {};

PreviewAvatar.defaultProps = {};

export default PreviewAvatar;
