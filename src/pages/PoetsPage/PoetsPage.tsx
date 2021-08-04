import React, { useContext, useEffect } from 'react';
import { SessionContext } from '../../App';
import Poet from '../../components/Poet/Poet';
import styles from './PoetsPage.module.scss';

const PoetsPage = () => {
  const sessionContext: any = useContext(SessionContext);
  useEffect(() => {
    document.title = [sessionContext[0].appName, 'All Rebel Poets'].join(': ')
  }, []);

  return (
    <div className="page-container">
    <h1>All Rebel Poets</h1>
    <div className={styles.Poets}>
      {[2, 1, 2, 3, 3, 4, 5, 6, 7].map((poet) => <Poet />)}
    </div>
  </div>
  )
};

export default PoetsPage;
