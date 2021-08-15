import React from "react";
import styles from "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PoetsPage from "./pages/PoetsPage/PoetsPage";
import PoetProfile from "./pages/PoetProfile/PoetProfile";
import PoemPage from "./pages/PoemPage/PoemPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import RootWrapper from "./components/RootWrapper/RootWrapper";

// Providers
import { SessionContextProvider } from "./providers/SessionContext";
import { BacklightContextProvider } from "./providers/BacklightContext";

import {
  LoaderContextProvider,
  useLoaderState,
} from "./providers/LoaderContext";
import NewPoem from "./pages/NewPoem/NewPoem";

function App() {
  return (
    <React.Fragment>
      <SessionContextProvider>
        <BacklightContextProvider>
          <LoaderContextProvider>
            <BrowserRouter>
              <RootWrapper>
                <Header />
                <Switch>
                  <Route path="/new_poem">
                    <NewPoem></NewPoem>
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/discover"></Redirect>
                  </Route>
                  <Route path="/discover">
                    <HomePage />
                  </Route>
                  <Route exact path="/rebels">
                    <PoetsPage />
                  </Route>
                  <Route path="/rebels/@:poet">
                    <PoetProfile />
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
                  <Route path="/sign_in">
                    <SignInPage></SignInPage>
                  </Route>
                  <Route path="*">
                    <NotFoundPage />
                  </Route>
                </Switch>
                <Footer />
              </RootWrapper>
            </BrowserRouter>
          </LoaderContextProvider>
        </BacklightContextProvider>
      </SessionContextProvider>
    </React.Fragment>
  );
}

export default App;
