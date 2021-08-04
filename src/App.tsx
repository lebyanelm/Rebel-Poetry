import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export const SessionContext = React.createContext({});
function App() {
  
  return (
    <React.Fragment>
      <SessionContext.Provider value={{token: "tok_8"}}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            <Route path="*"><NotFoundPage /></Route>
          </Switch>
        </BrowserRouter>
      </SessionContext.Provider>
    </React.Fragment>
  );
}

export default App;
