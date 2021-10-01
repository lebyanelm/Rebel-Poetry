import React from "react";
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
import DraftsPage from "./pages/DraftsPage/DraftsPage";
import FeelingLuckyPage from "./pages/FeelingLuckyPage/FeelingLuckyPage";
import RootWrapper from "./components/RootWrapper/RootWrapper";
import config from "./config";

// Providers
import { SessionContextProvider, useSession } from "./providers/SessionContext";
import { StorageContextProvider } from "./providers/StorageContext";
import { BacklightContextProvider } from "./providers/BacklightContext";

import { LoaderContextProvider } from "./providers/LoaderContext";
import NewPoem from "./pages/NewPoem/NewPoem";
import { ToastContextProvider } from "./providers/ToastContext";

console.log("Backend URL: ", process.env.NODE_ENV, config);

function App() {
  const { userSession } = useSession();

  return (
    <React.Fragment>
      <ToastContextProvider>
        <StorageContextProvider>
          <SessionContextProvider>
            <BacklightContextProvider>
              <LoaderContextProvider>
                <BrowserRouter>
                  <RootWrapper>
                    <Header />
                    <Switch>
                      <Route path="/new_poem">
                        <NewPoem userSession={userSession} />
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/discover"></Redirect>
                      </Route>
                      <Route path="/discover">
                        <HomePage />
                      </Route>
                      <Route exact path="/rebbels">
                        <PoetsPage />
                      </Route>
                      <Route path="/rebbels/@:poet">
                        <PoetProfile />
                      </Route>
                      <Route path="/your_drafts">
                        <DraftsPage />
                      </Route>
                      <Route path="/feeling_lucky">
                        <FeelingLuckyPage />
                      </Route>
                      <Route path="/poem/:poemId">
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
        </StorageContextProvider>
      </ToastContextProvider>
    </React.Fragment>
  );
}

export default App;
