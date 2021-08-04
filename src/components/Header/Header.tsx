import React from 'react';
import Logo from "../../logo.svg";
import styles from './Header.module.css';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import IonIcon from "@reacticons/ionicons";

const Header = () => (
  <div className={styles.HeaderContainer}>
    <a href="https://patreon.com/@rebelpoetry" target="_blank" className={styles.Banner}>
      We need your support to keep the site functional and available &mdash; Become a contributor
      <IonIcon name="arrow-forward"></IonIcon>
    </a>
    <div className={styles.Header}>
      <a href="/" className={styles.HeaderBrandLogo}>
        <img src={Logo} alt="" />
      </a>
      <React.Fragment>
        <section>
          <a href="/"><div className="navigation-item">Discover</div></a>
          <a href="/poets"><div className="navigation-item">Rebel Poets</div></a>
          <a href="/poets"><div className="navigation-item">Your Drafts</div></a>
          <a href="/feeling_lucky"><div className="navigation-item">Feeling Lucky</div></a>
          <a href="/search"><div className="navigation-item">Search</div></a>
        </section>

        <div className="flex-space"></div>

        <section>
          <a href="/donate"><div className="navigation-item button">Become a Donator</div></a>
          <a href="/sign_in"><div className="navigation-item">My Profile</div></a>
        </section>
      </React.Fragment>
    </div>
  </div>
);

export default Header;
