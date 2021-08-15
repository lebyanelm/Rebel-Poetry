import React from "react";
import styles from "./Poem.module.scss";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import PoemActions from "../PoemActions/PoemActions";

const Poem = () => (
  <div className={styles.Poem}>
    <div
      className={styles.PoemThumbnail}
      style={{
        backgroundImage: "url(https://pbs.twimg.com/media/Efp3p8dUEAAz9u-.jpg)",
      }}
    ></div>
    <div className={styles.PoemDetails}>
      <Link to="/poem?pid=8928899892">
        <header className={styles.PoemTitle}>Deep End</header>
      </Link>

      <span className={styles.PoemAuthor}>
        Written by
        <Link to="poets/@roddyrich"> Edgar Allen Po.</Link>, featuring{" "}
        <Link to="poets/@roddyrich">Maya Angelou</Link>,{" "}
        <Link to="poets/@roddyrich">Joseph Rohghan</Link>, and{" "}
        <Link to="poets/@roddyrich">The Logical Minds</Link>
      </span>

      <span className={styles.PoemDescription}>
        I’ve learned that people will forget what you said, people will forget
        what you did, but people will never forget how you made them feel.
      </span>

      <div className="tags flex">
        {/* <Link to="/tag?name=30min_read"><div className="tag flex align-center"><IonIcon name="star" style={{marginRight: '5px'}}></IonIcon> Premium</div></Link> */}
        <Link to="/tag?name=30min_read">
          <div className="tag">African Struggle</div>
        </Link>
        <Link to="/tag?name=30min_read">
          <div className="tag">Black</div>
        </Link>
        <Link to="/tag?name=30min_read">
          <div className="tag">Life</div>
        </Link>
      </div>
    </div>

    {/* Poem Actions */}
    <PoemActions></PoemActions>
  </div>
);

export default Poem;
