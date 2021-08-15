import React from "react";
import { Link } from "react-router-dom";
import PoemPageHeader from "../../components/PoemPageHeader/PoemPageHeader";
import styles from "./PoemPage.module.scss";

const PoemPage = () => {
  return (
    <>
      <div className={styles.PoemPageContainer}>
        <PoemPageHeader></PoemPageHeader>
        <div className={styles.PoemContents}>
          <div className={styles.PoemSplitSides}>
            <div className={styles.PoemTextContainer}>
              In the end he died an ordinary man<br></br>
              Only rich in wrinkles from where the spirit had been<br></br>
              It would be the saddest days<br></br>
              And we watched the world weep<br></br>
              For a giant bigger than myths<br></br>A life owned by many
              <br></br>
              Now free as the gods<br></br>
              <br></br>
              Some cried as though tomorrow was lost<br></br>
              Some celebrated, questioned freedom and its cost<br></br>
              Some seized the chance to stand on his shoulders<br></br>
              While others cursed his grave and scorned wisdom of the elders
              <br></br>
              <br></br>
              <a href="#annotation">Stadiums were littered</a>
              <br></br>
              And those in the know spoke their fill<br></br>
              Mourners paid tribute<br></br>
              Monarch to President made the bill<br></br>
              But still Where do I we begin<br></br>
              In telling our children where these old bones have been<br></br>
              And that we as next of kin<br></br>
              Have inherited his struggle<br></br>
              And he forever lives through our skin<br></br>
            </div>
            <div className={styles.PoemInformation}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoemPage;
