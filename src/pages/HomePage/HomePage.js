import React, { useContext, useEffect } from 'react';
import PoemPostInput from '../../components/PoemPostInput/PoemPostInput';
import PoemsList from "../../components/PoemsList/PoemsList";

const HomePage = () => {
  useEffect(() => {
    document.title = [process.env.REACT_APP_NAME, 'Discover'].join(': ')
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
