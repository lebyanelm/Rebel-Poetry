import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecommendedPoems.module.scss';

const RecommendedPoems = () => (
  <div className={styles.RecommendedPoems} data-testid="RecommendedPoems">
    RecommendedPoems Component
  </div>
);

RecommendedPoems.propTypes = {};

RecommendedPoems.defaultProps = {};

export default RecommendedPoems;
