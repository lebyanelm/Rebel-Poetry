import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SessionContextProvider } from "./providers/SessionContext";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PoetsPage from "./pages/PoetsPage/PoetsPage";
import PoemPage from "./pages/PoemPage/PoemPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import RootWrapper from "./components/RootWrapper/RootWrapper";

function App() {
  return (
    <React.Fragment>
      <SessionContextProvider>
        <BrowserRouter>
          <RootWrapper>
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
          </RootWrapper>
        </BrowserRouter>
      </SessionContextProvider>
    </React.Fragment>
  );
}

export default App;
