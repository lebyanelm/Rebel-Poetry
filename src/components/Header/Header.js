import React from "react";
import Logo from "../../logo.svg";
import styles from "./Header.module.css";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.HeaderContainer}>
      {/* BANNER */}
      <Link
        to="https://patreon.com/@rebelpoetry"
        target="_blank"
        className={styles.Banner}
      >
        We need your support to keep the site functional and available &mdash;
        Become a contributor
        <IonIcon name="arrow-forward"></IonIcon>
      </Link>

      {/* HEADER CONTENTS */}
      <div className={styles.Header}>
        <Link to="/" className={styles.HeaderBrandLogo}>
          <img src={Logo} alt="" />
        </Link>
        <section>
          <Link to="/">
            <div className="navigation-item">Discover</div>
          </Link>
          <Link to="/poets">
            <div className="navigation-item">Rebel Poets</div>
          </Link>
          <Link to="/your_drafts">
            <div className="navigation-item">Your Drafts</div>
          </Link>
          <Link to="/feeling_lucky">
            <div className="navigation-item">Feeling Lucky</div>
          </Link>
          <Link to="/search">
            <div className="navigation-item">Search</div>
          </Link>
        </section>

        <div className="flex-space"></div>

        <section>
          <Link to="/donate">
            <div className="navigation-item button">Become a Donator</div>
          </Link>
          <Link to="/sign_up">
            <div className="navigation-item">Become a Member</div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Header;
