import React, { useEffect } from 'react';
import Poem from '../Poem/Poem';
import styles from './PoemsList.module.scss';

const PoemsList = () => {
  const poems = [];
  
  // Request random trending poems from the API server
  useEffect(() => {
    // GET REQUEST
  }, []);
  
  return (<div className={styles.PoemsGrid}>
    {[1].map((poem) => <Poem></Poem>)}
  </div>)
};

export default PoemsList;
