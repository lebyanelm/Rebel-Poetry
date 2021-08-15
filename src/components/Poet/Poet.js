import React from "react";
import { Link } from "react-router-dom";
import styles from "./Poet.module.scss";

const Poet = () => (
  <Link className={styles.Poet} to="/rebels/@mayaan">
    <div
      className={styles.PoetAvatar}
      style={{
        backgroundImage:
          "url(https://www.thedailyvox.co.za/wp-content/uploads/2016/02/Nelson-Mandela-ballpoint.jpg)",
      }}
    ></div>
    <div className="PoetDetails">
      <b className="PoetName">William Shakespeer</b>
      <span className="PoetPoemsCount">154 Poems</span>
    </div>
  </Link>
);

export default Poet;
