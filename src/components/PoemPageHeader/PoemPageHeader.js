import React from "react";
import PropTypes from "prop-types";
import styles from "./PoemPageHeader.module.scss";
import { Link } from "react-router-dom";
import { PoemService } from "../../services/Poem";

const PoemPageHeader = ({ poemData }) => {
  // Retrieve the authors in the poem from the backend
  const [poemAuthors, setPoemAuthors] = React.useState([]);
  React.useEffect(() => {
    // Get information of the poets
    if (poemData) {
      if (poemData.author !== undefined) {
        PoemService.getPoemAuthors([
          poemData.author,
          ...poemData.featured_poets,
        ]).then((poets) => {
          console.log(poets);
          setPoemAuthors(poets);
        });
      } else {
        setPoemAuthors([{ display_name: "Anonymous", username: "anonymous" }]);
      }
    }
  }, [poemData]);

  return (
    <>
      <div className={styles.PoemPageHeader}>
        <div className={styles.BackgroundDiffuser}>
          <div className={styles.PoemInformationContainer}>
            <div>
              <div
                className={styles.PoemThumbnailImage}
                style={{
                  backgroundImage: `url(${poemData.thumbnail})`,
                }}
              >
                <div className={styles.PlayPauseButton}></div>
              </div>
            </div>
            <div className={styles.PoemDetailsContainer}>
              <h2 className={styles.PoemTitle}>{poemData?.title}</h2>
              <div className={styles.PoemAuthor}>
                Written by{" "}
                <Link to={`/rebbels/@${poemAuthors[0]?.username}`}>
                  {poemAuthors[0]?.display_name}
                </Link>
              </div>

              <table className={styles.PoemMetadataItems}>
                <tbody>
                  <tr>
                    <td>Read time</td>
                    <td>
                      <Link>{poemData?.read_time}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Word count</td>
                    <td>{poemData?.body?.split(" ").length || 0} words</td>
                  </tr>
                  <tr>
                    <td>Published on</td>
                    <td>
                      <Link>{poemData?.time_created?.day}</Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Actions and stats of the poem */}
            </div>

            <div className={styles.PoemStats}>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoemPageHeader;
