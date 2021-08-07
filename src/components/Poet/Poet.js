import React from "react";
import { Link } from "react-router-dom";
import styles from "./Poet.module.scss";

const Poet = () => (
  <Link className={styles.Poet} to="/poets/@mayaan">
    <div
      className={styles.PoetAvatar}
      style={{
        backgroundImage:
          "url(http://localhost:5000/api/uploads/default-avatar.png)",
      }}
    ></div>
    <div className="PoetDetails">
      <b className="PoetName">William Shakespeer</b>
      <span className="PoetPoemsCount">154 Poems</span>
    </div>
  </Link>
);

export default Poet;
