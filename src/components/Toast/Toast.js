import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toast.module.scss';

const Toast = () => (
  <div className={styles.Toast} data-testid="Toast">
    Toast Component
  </div>
);

Toast.propTypes = {};

Toast.defaultProps = {};

export default Toast;
