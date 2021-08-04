import React from 'react';
import Logo from "../../logo.svg";
import styles from './Header.module.css';
import { Link } from "react-router-dom";

const Header = () => (
  <>
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderBrandLogo}><img src={Logo} alt="Logo" /></div>
      <React.Fragment>
        <section>
          <Link to="/poets"><div className="navigation-item">Post a Poem</div></Link>
          <Link to="/explore"><div className="navigation-item">Explore Poems</div></Link>
          <Link to="/poets"><div className="navigation-item">Browse Poets</div></Link>
          <Link to="/feeling_lucky"><div className="navigation-item">Poem of the day</div></Link>
        </section>

        <div className="flex-space"></div>

        <section className="search-input-section">
          <input type="text" placeholder="Search poems"/>
        </section>

        <div className="flex-space"></div>

        <section>
          <Link to="/donate"><div className="navigation-item button">Become a Donator</div></Link>
          <Link to="/sign_in"><div className="navigation-item">Sign In</div></Link>
        </section>
      </React.Fragment>
    </div>
  </>
);

export default Header;
