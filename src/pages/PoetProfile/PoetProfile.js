import React from "react";
import styles from "./PoetProfile.module.scss";
import { Link, useParams } from "react-router-dom";
import PoemsList from "../../components/PoemsList/PoemsList";
import { useSession } from "../../providers/SessionContext";
import * as superagent from "superagent";
import config from "./config";
import { useLoaderState } from "../../providers/LoaderContext";
import { PoemService } from "../../services/Poem";

const PoetProfile = () => {
  // Get the username of the profile being browsed
  const params = useParams();

  // Read from the the user session if any to check if there's a need to reach the server to get data
  const { userSession } = useSession();
  const { setIsLoaderVisible } = useLoaderState();

  const [profileData, setProfileData] = React.useState(null);
  const [feed, setFeed] = React.useState([]);

  // Contact the server to get the profile data from the backend.
  const getProfileData = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      if (userSession && userSession.username === params.poet) {
      } else {
        setIsLoaderVisible(true);

        superagent
          .get([config.BACKEND, "rebbels", params.poet].join("/"))
          .end((_, response) => {
            setIsLoaderVisible(false);
            if (response) {
              if (response.statusCode === 200) {
                resolve(response.body.data);
              }
            }
          });
      }
    });
  });

  React.useEffect(() => {
    // document.title = process.env.REACT_APP_NAME + ": " + name;
    getProfileData().then((data) => {
      setProfileData(data);
      data.poems.forEach((poemId) =>
        PoemService.getPoemData(poemId).then((poem) => {
          const poems = feed;
          poems.push(poem);
          setFeed(poems);
        })
      );
    });
  }, []);

  return (
    profileData && (
      <div style={{ width: "100%" }} className="page-container">
        <div className={styles.ProfilePage}>
          <div className={styles.ProfileAvatarContainer}>
            <div
              className={styles.ProfileAvatar}
              style={{
                backgroundImage: `url(${profileData.display_photo})`,
              }}
            ></div>
          </div>
          <div className={styles.PageContents}>
            <div className={styles.ProfileName}>
              <span className={styles.Name}>
                {profileData.display_name}{" "}
                {userSession && userSession.username === profileData.username
                  ? "(Me)"
                  : ""}
              </span>
              <span className={styles.ProfleVerificationSign}></span>
            </div>

            <div className={styles.ProfileBiography}>
              <span>{profileData.biography}</span>
              {userSession && userSession.username === profileData.username ? (
                profileData.biography.length !== 0 ? (
                  <Link className={styles.ProfileBiographyEditButton}>
                    Edit
                  </Link>
                ) : (
                  <Link
                    className={styles.ProfileBiographyEditButton}
                    style={{ transform: "translateX(-20px)" }}
                  >
                    Add a biography
                  </Link>
                )
              ) : (
                ""
              )}
            </div>

            <div className={styles.ProfileHeaderButtons}>
              {userSession && userSession.username === profileData.username ? (
                ""
              ) : (
                <button style={{ backgroundColor: "black" }}>
                  Follow Rebbel
                </button>
              )}
              {userSession && userSession.username === profileData.username ? (
                <button>Share your profile</button>
              ) : (
                <button>Share Profile</button>
              )}
              {userSession && userSession.username === profileData.username ? (
                ""
              ) : (
                <button>Collaborate</button>
              )}
            </div>

            <div className={styles.ProfileStats}>
              <Link>
                <b>{profileData.poems.length}</b> Poems Published
              </Link>
              <Link>
                <b>{profileData.followers.length}</b> Followers
              </Link>
              <Link>
                <b>{profileData.follows.length}</b> Follows
              </Link>
            </div>
          </div>
        </div>

        {/* The contents of the profile */}
        <div style={{ width: "100%" }}>
          {profileData.poems.length ? (
            <PoemsList feed={feed} />
          ) : (
            <h1>{profileData.display_name} has not published any poems yet.</h1>
          )}
        </div>
      </div>
    )
  );
};

export default PoetProfile;
