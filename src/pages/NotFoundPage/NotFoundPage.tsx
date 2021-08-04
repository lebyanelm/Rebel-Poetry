import React, { useEffect } from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Rebel Poetry: Page Not Found'
  }, []);
  
  return (<div className="page-container" style={{transform: 'translateY(-100px)'}}>
    <div className={styles.NotFoundPage} data-testid="NotFoundPage">
      <section>
        <h1>Opps, for the one who's lost &mdash; this is a dead-end!</h1>
        <p>You seem to have fallen off the wagon. Trace your way <Link to="/">back to home.</Link></p>
      </section>
    </div>
  </div>)
};

export default NotFoundPage;
