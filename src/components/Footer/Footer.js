import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../../logo.svg";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <div className={styles.Footer}>
      {/* RIGHT SECTION */}
      <section className={styles.LeftSection}>
        <img src={Logo} alt="" />
        <a className={styles.BrandName} href="/">
          {process.env.REACT_APP_NAME}
        </a>

        <div className={styles.Legal}>
          All poems on this site are part of copyrights of their respective
          poets. All content on this site is published here under{" "}
          <a href="https://creativecommons.org/licenses/" target="_blank">
            Creative Commons License
          </a>
          .
        </div>
      </section>

      {/* FIRST MIDDLE SECTION */}
      <section className={styles.FirstMiddleSection}>
        <div className={styles.SectionName}>Navigation</div>

        <Link to="/">Top Ranked Poems</Link>
        <Link to="/poets">Top Rebel Poets</Link>
        <Link to="/my_drafts">View your Drafts</Link>
        <Link to="/feeling_lucky">I'm Feeling Lucky</Link>
        <Link to="/search">Search Poems</Link>
      </section>

      {/* SECOND MIDDLE SECTION */}
      <section className={styles.SecondMiddleSection}>
        <div className={styles.SectionName}>Poems</div>

        <Link to="/">All Poems</Link>
        <Link to="/">Poem By Language</Link>
        <Link to="/">Explore All Poets</Link>
        <Link to="/">Competitions</Link>
      </section>

      {/* RIGHT SECTION */}
      <section className={styles.SecondMiddleSection}>
        <div className={styles.SectionName}>General</div>

        <Link to="/">Donate</Link>
        <Link to="/">About Us</Link>
        <Link to="/">Licensing</Link>
        <Link to="/">Legal</Link>
      </section>
    </div>

    <div className={styles.Attribution}>
      Rebel Poets (Pty) Ltd. Copyright (c) 2020. All right reserved.
    </div>
  </>
);

export default Footer;
