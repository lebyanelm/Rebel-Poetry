import React from 'react';
import styles from './Footer.module.scss';
import Logo from "../../logo.svg";

const Footer = () => (
  <>
    <div className={styles.Footer}>
      {/* RIGHT SECTION */}
      <section className={styles.LeftSection}>
        <img src={Logo} alt="" />
        <a className={styles.BrandName} href="/">{process.env.REACT_APP_NAME}</a>
        
        <div className={styles.Legal}>All poems on this site are part of copyrights of their respective poets. All content on this site is published here under <a href="https://creativecommons.org/licenses/" target="_blank">Creative Commons License</a>.</div>
      </section>

      {/* FIRST MIDDLE SECTION */}
      <section className={styles.FirstMiddleSection}>
        <div className={styles.SectionName}>Navigation</div>

        <a href="/">Top Ranked Poems</a>
        <a href="/poets">Top Rebel Poets</a>
        <a href="/my_drafts">View your Drafts</a>
        <a href="/feeling_lucky">I'm Feeling Lucky</a>
        <a href="/search">Search Poems</a>
      </section>

      {/* SECOND MIDDLE SECTION */}
      <section className={styles.SecondMiddleSection}>
        <div className={styles.SectionName}>Poems</div>

        <a href="/">All Poems</a>
        <a href="/">Poem By Language</a>
        <a href="/">Explore All Poets</a>
        <a href="/">Competitions</a>
      </section>

      {/* RIGHT SECTION */}
      <section className={styles.SecondMiddleSection}>
        <div className={styles.SectionName}>General</div>

        <a href="/">Donate</a>
        <a href="/">About Us</a>
        <a href="/">Licensing</a>
        <a href="/">Legal</a>
      </section>

    </div>

    <div className={styles.Attribution}>Rebel Poets (Pty) Ltd. Copyright (c) 2020. All right reserved.</div>
  </>
);

export default Footer;
