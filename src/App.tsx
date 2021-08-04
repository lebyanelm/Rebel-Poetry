import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PoetsPage from './pages/PoetsPage/PoetsPage';
import PoemPage from './pages/PoemPage/PoemPage';

export const SessionContext = React.createContext({});
function App() {

  const appState = useState({
    appName: 'Rebel Poetry'
  })
  
  return (
    <React.Fragment>
      <SessionContext.Provider value={appState}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            <Route path="/poets"><PoetsPage /></Route>
            <Route path="/poem"><PoemPage /></Route>
            <Route path="*"><NotFoundPage /></Route>
          </Switch>
        </BrowserRouter>
      </SessionContext.Provider>
    </React.Fragment>
  );
}

export default App;
