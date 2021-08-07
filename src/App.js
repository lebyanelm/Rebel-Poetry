import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SessionContextProvider, useSession } from "./providers/SessionContext";
import * as superagent from "superagent";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PoetsPage from "./pages/PoetsPage/PoetsPage";
import PoemPage from "./pages/PoemPage/PoemPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

// Services
import { Storage } from "./services/Storage";

function App() {
  const { userSession, setUserSession } = useSession();

  // On App startup, request the data of the user from the backend
  React.useEffect(() => {
    // Check if there is a session token available
    Storage.get("AUTH_TOKEN").then((sessionToken) => {
      if (sessionToken) {
        // Send a get data request to the backend
        superagent
          .get([process.env.REACT_APP_API_ENDPOINT, "@"].join("/"))
          .set("Authorization", sessionToken)
          .end((_, response) => {
            if (response) {
              console.log(response);
            } else {
              // TODO: Show a toast error
            }
          });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <SessionContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/poets">
              <PoetsPage />
            </Route>
            <Route path="/poem">
              <PoemPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/sign_up">
              <SignUpPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </SessionContextProvider>
    </React.Fragment>
  );
}

export default App;
