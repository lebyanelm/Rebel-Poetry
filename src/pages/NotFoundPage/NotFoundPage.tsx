import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className={styles.NotFoundPage} data-testid="NotFoundPage">
    <section>
      <h1>Opps, that's a dead-end!</h1>
      <p>You seem to have fallen off the wagon. Trace your way <Link to="/">back to home.</Link></p>
    </section>
  </div>
);

export default NotFoundPage;
