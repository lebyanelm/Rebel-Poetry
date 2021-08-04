import React, { useContext, useEffect } from 'react';
import styles from './HomePage.module.scss';
import PoemPostInput from '../../components/PoemPostInput/PoemPostInput';
import PoemsList from "../../components/PoemsList/PoemsList";
import { SessionContext } from '../../App';

const HomePage = () => {
  const sessionContext: any = useContext(SessionContext);
  useEffect(() => {
    document.title = [sessionContext[0].appName, 'Discover'].join(' | ')
  }, []);
  
  return (
    <React.Fragment>
      <div className="page-container">
        {/* An input for posting a new poem */}
        <PoemPostInput></PoemPostInput>
        
        {/* Listed poems */}
        <PoemsList></PoemsList>
      </div>
    </React.Fragment>
  )
};

export default HomePage;
