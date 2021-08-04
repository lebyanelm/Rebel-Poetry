import React from 'react';
import styles from './HomePage.module.scss';
import PoemPostInput from '../../components/PoemPostInput/PoemPostInput';

const HomePage = () => (
  <React.Fragment>
    <div className="page-container">
      {/* An input for posting a new poem */}
      <PoemPostInput></PoemPostInput>
      
      <h3>Discover Poems</h3>
    </div>
  </React.Fragment>
);

export default HomePage;
