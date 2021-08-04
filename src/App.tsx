import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const SessionContext = React.createContext({});
  
  return (
    <React.Fragment>
      <SessionContext.Provider value="">
        <BrowserRouter>
          <Header />
          <Switch>
          </Switch>
        </BrowserRouter>
      </SessionContext.Provider>
    </React.Fragment>
  );
}

export default App;
