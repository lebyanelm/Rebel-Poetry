import React from "react";
import { Link } from "react-router-dom";
import styles from "./Poet.module.scss";

const Poet = ({ poet }) => (
  <a className={styles.Poet} href={["/rebbels/@", poet.username].join("")}>
    <div
      className={styles.PoetAvatar}
      style={
        {
          backgroundImage: `url(${poet.display_photo})`,
        }
      }
    ></div>
    <div className="PoetDetails">
      <b className={styles.PoetName}>{poet.display_name.split(" ")[0]}</b>
    </div>
  </a>
);

export default Poet;
