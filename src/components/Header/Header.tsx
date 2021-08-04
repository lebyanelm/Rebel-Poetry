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
          <Link to="/"><div className="navigation-item">Poems</div></Link>
          <Link to="/browse_poets"><div className="navigation-item">Poets</div></Link>
          <Link to="/drafts"><div className="navigation-item">Drafts</div></Link>
          <Link to="/feeling_lucky"><div className="navigation-item">Feeling Lucky</div></Link>
        </section>


        <section className="search-input-section">
          <input type="text" placeholder="Search poems"/>
        </section>


        <section>
          <Link to="/donate"><div className="navigation-item button">Become a Donator</div></Link>
          <Link to="/sign_in"><div className="navigation-item">Sign In</div></Link>
        </section>
      </React.Fragment>
    </div>
  </>
);

export default Header;
