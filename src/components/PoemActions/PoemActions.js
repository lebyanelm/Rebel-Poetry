import React from "react";
import styles from "./PoemActions.module.scss";
import IonIcon from "@reacticons/ionicons";

const PoemActions = () => (
  <div className={styles.PoemActions}>
    <section className="flex">
      <div className={styles.Action} data-like="true">
        <IonIcon name="flame-outline"></IonIcon>
        <span>11</span>
      </div>
      <div className={styles.Action}>
        <IonIcon name="eye-outline"></IonIcon>
        <span>14</span>
      </div>
      <div className={styles.Action}>
        <IonIcon name="arrow-redo-outline"></IonIcon>
        <span>30</span>
      </div>
    </section>
    <section className="flex">
      <div className={styles.Action}>
        <IonIcon name="bookmark"></IonIcon>
        {/* <span>120</span> */}
      </div>
    </section>
  </div>
);

export default PoemActions;
