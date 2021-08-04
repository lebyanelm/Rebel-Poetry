import React from 'react';
import './App.css';

function App() {
  const SessionContext = React.createContext({});
  
  return (
    <React.Fragment>
      <SessionContext.Provider value="">
        
      </SessionContext.Provider>
    </React.Fragment>
  );
}

export default App;
