import React, { useContext, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import IonIcon from '@reacticons/ionicons';
import PoemsList from '../../components/PoemsList/PoemsList';
import { SessionContext } from '../../App';

const SearchPage = () => {
  const sessionContext: any = useContext(SessionContext);
  useEffect(() =>  {
    document.title = [sessionContext[0].appName, 'Search'].join(': ');
  }, []);

  return (
    <>
      <div className="page-container">
        <h1>Search</h1>
        <div className={styles.SearchInputContainer}>
          <input className={styles.LargeSearchInput} type="text" placeholder="Search for Rebel Poems / Poets" />
          <div className={styles.SearchButton}>
            <IonIcon name="arrow-forward-sharp"></IonIcon>
          </div>
        </div>

        <h4 style={{textAlign: 'center'}}>Your search results are presented below.</h4>

        {/* POEMS SEARCH RESULTS */}
        <PoemsList></PoemsList>
      </div>
    </>
  )
};

export default SearchPage;
