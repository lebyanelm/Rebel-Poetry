import React from "react";
import PropTypes from "prop-types";
import styles from "./PoetProfile.module.scss";
import { Link } from "react-router-dom";
import ProfileContentsDropdown from "../../components/ProfileContentsDropdown/ProfileContentsDropdown";
import Poem from "../../components/Poem/Poem";

const PoetProfile = () => {
  const name = "Nelson Mandela";

  React.useEffect(() => {
    document.title = process.env.REACT_APP_NAME + ": " + name;
  }, []);

  return (
    <div className="page-container">
      <div className={styles.ProfilePage}>
        <div className={styles.ProfileAvatarContainer}>
          <div
            className={styles.ProfileAvatar}
            style={{
              backgroundImage:
                "url(https://www.thedailyvox.co.za/wp-content/uploads/2016/02/Nelson-Mandela-ballpoint.jpg)",
            }}
          ></div>
        </div>
        <div className={styles.PageContents}>
          <div className={styles.ProfileName}>
            <span className={styles.Name}>{name} (Me)</span>
            <span className={styles.ProfleVerificationSign}></span>
          </div>

          <div className={styles.ProfileBiography}>
            <span>
              Nelson Rolihlahla Mandela was a South African anti-apartheid
              revolutionary, statesman and philanthropist who served as
              President of South Africa from 1994 to 1999. He was the country's
              first black head of state and the first elected in a fully
              representative democratic election.
            </span>
            <Link className={styles.ProfileBiographyEditButton}>Edit</Link>
          </div>

          <div className={styles.ProfileHeaderButtons}>
            <button className="outline">Follow</button>
            <button className="outline">Share</button>
            <button className="outline">Collaborate with Rebel</button>
          </div>

          <div className={styles.ProfileStats}>
            <Link>
              <b>{(Math.random() * 1000).toFixed(0)}</b> Poems Published
            </Link>
            <Link>
              <b>{(Math.random() * 1000).toFixed(0)}</b> Followers
            </Link>
            <Link>
              <b>{(Math.random() * 1000).toFixed(0)}</b> Follows
            </Link>
            <Link>
              <b>{(Math.random() * 1000).toFixed(0)}</b> Claps
            </Link>
          </div>
        </div>
      </div>

      {/* The contents of the profile */}
      <div className={styles.PoetProfileContents}>
        {[1, 2, 3, 4, 5, 6].map((poem) => (
          <Poem />
        ))}
      </div>
    </div>
  );
};

PoetProfile.propTypes = {};

PoetProfile.defaultProps = {};

export default PoetProfile;
