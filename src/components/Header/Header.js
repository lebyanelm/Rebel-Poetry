import React from "react";
import Logo from "../../logo.svg";
import styles from "./Header.module.css";
import IonIcon from "@reacticons/ionicons";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../providers/SessionContext";
import AccountDropdownOptions from "../AccountDropdownOptions/AccountDropdownOptions";

const Header = () => {
  const location = useLocation();
  const { userSession } = useSession();

  return (
    <div className={styles.HeaderContainer}>
      {/* BANNER */}
      <a
        href="https://patreon.com/@rebbelpoetry"
        target="_blank"
        rel="noreferrer"
        className={styles.Banner}
      >
        We need your support to keep the site functional and available &mdash;
        Become a contributor
        <IonIcon name="arrow-forward"></IonIcon>
      </a>

      {/* HEADER CONTENTS */}
      <div className={styles.Header}>
        <Link to="/" className={styles.HeaderBrandLogo}>
          <img src={Logo} alt="" />
        </Link>
        <section class={styles.NavigationLinks}>
          {userSession && (
            <Link to="/new_poem">
              <div
                className={[
                  "navigation-item",
                  location.pathname === "/new_poem" ? "active" : "inactive",
                ].join(" ")}
              >
                Publish New
              </div>
            </Link>
          )}
          <Link to="/discover">
            <div
              className={[
                "navigation-item",
                location.pathname === "/discover" ? "active" : "inactive",
              ].join(" ")}
            >
              Discover
            </div>
          </Link>
          <Link to="/rebbels">
            <div
              className={[
                "navigation-item",
                location.pathname.includes("/rebbels") ? "active" : "inactive",
              ].join(" ")}
            >
              Rebbel Poets
            </div>
          </Link>

          {/* Only when there's a session */}
          {userSession && (
            <Link to="/your_drafts">
              <div
                className={[
                  "navigation-item",
                  location.pathname === "/your_drafts" ? "active" : "inactive",
                ].join(" ")}
              >
                Your Drafts
              </div>
            </Link>
          )}

          <Link to="/feeling_lucky">
            <div
              className={[
                "navigation-item",
                location.pathname === "/feeling_lucky" ? "active" : "inactive",
              ].join(" ")}
            >
              Feeling Lucky
            </div>
          </Link>
          <Link to="/search">
            <div
              className={[
                "navigation-item",
                location.pathname === "/search" ? "active" : "inactive",
              ].join(" ")}
            >
              Search
            </div>
          </Link>
        </section>

        <div className="flex-space"></div>

        <section>
          {!userSession && (
            <Link to="/sign_up">
              <div className="navigation-item button">Become a Rebbel</div>
            </Link>
          )}

          {/* For members this will be shown */}
          {userSession && (
            <AccountDropdownOptions
              userSession={userSession}
              location={location}
            ></AccountDropdownOptions>
          )}

          {/* For non-logged in members */}
          {!userSession && (
            <Link to="/sign_in">
              <div
                className={[
                  "navigation-item",
                  location.pathname === "/sign_in" ? "active" : "inactive",
                ].join(" ")}
              >
                Sign In
              </div>
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default Header;
