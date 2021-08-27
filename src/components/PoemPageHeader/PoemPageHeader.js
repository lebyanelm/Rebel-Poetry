import React from "react";
import PropTypes from "prop-types";
import styles from "./PoemPageHeader.module.scss";
import { Link } from "react-router-dom";

const PoemPageHeader = () => {
  return (
    <>
      <div className={styles.PoemPageHeader}>
        <div className={styles.BackgroundDiffuser}>
          <div className={styles.PoemInformationContainer}>
            <div>
              <div
                className={styles.PoemThumbnailImage}
                style={{
                  backgroundImage:
                    "url(https://www.thedailyvox.co.za/wp-content/uploads/2016/02/Nelson-Mandela-ballpoint.jpg)",
                }}
              >
                <div className={styles.PlayPauseButton}></div>
              </div>
            </div>
            <div className={styles.PoemDetailsContainer}>
              <h2 className={styles.PoemTitle}>An Ordinary Man</h2>
              <div className={styles.PoemAuthor}>
                Written and Curated by <Link>Anonymous</Link>
              </div>

              <table className={styles.PoemMetadataItems}>
                <tbody>
                  <tr>
                    <td>Featuring</td>
                    <td>
                      <Link>Keorapetsi Kgositsile</Link> ,{" "}
                      <Link>Antjie Krog</Link> and <Link>Ingrid Jonker</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Published on</td>
                    <td>
                      <Link>Sun 08 Aug, 2021</Link>
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

PoemPageHeader.propTypes = {};

PoemPageHeader.defaultProps = {};

export default PoemPageHeader;
