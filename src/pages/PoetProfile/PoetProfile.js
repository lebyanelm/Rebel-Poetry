import React from "react";
import styles from "./PoetProfile.module.scss";
import { Link, useParams } from "react-router-dom";
import Poem from "../../components/Poem/Poem";
import { useSession } from "../../providers/SessionContext";
import * as superagent from "superagent";
import { useLoaderState } from "../../providers/LoaderContext";

const PoetProfile = () => {
  // Get the username of the profile being browsed
  const params = useParams();

  // Read from the the user session if any to check if there's a need to reach the server to get data
  const { userSession } = useSession();
  const { setIsLoaderVisible } = useLoaderState();
  const [profileData, setProfileData] = React.useState(null);

  // Contact the server to get the profile data from the backend.
  const getProfileData = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      if (userSession && userSession.username === params.poet) {
      } else {
        setIsLoaderVisible(true);

        superagent
          .get(
            [process.env.REACT_APP_API_ENDPOINT, "rebbels", params.poet].join(
              "/"
            )
          )
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
      console.log(data);
    });
  }, []);

  return (
    profileData && (
      <div className="page-container">
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
                <button className="outline">Follow Rebbel</button>
              )}
              {userSession && userSession.username === profileData.username ? (
                <button className="outline">Share your profile</button>
              ) : (
                <button className="outline">Share Profile</button>
              )}
              {userSession && userSession.username === profileData.username ? (
                ""
              ) : (
                <button className="outline">Collaborate</button>
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
        <div className={styles.PoetProfileContents}>
          {profileData.poems.length ? (
            profileData.poems.map((poemId) => <Poem poemId={poemId} />)
          ) : (
            <h1>{profileData.display_name} has not published any poems yet.</h1>
          )}
        </div>
      </div>
    )
  );
};

export default PoetProfile;
