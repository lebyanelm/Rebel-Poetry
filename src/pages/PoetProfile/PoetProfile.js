import React from "react";
import styles from "./PoetProfile.module.scss";
import { Link, useParams } from "react-router-dom";
import PoemsList from "../../components/PoemsList/PoemsList";
import { useSession } from "../../providers/SessionContext";
import { useToast } from "../../providers/ToastContext";
import * as superagent from "superagent";
import config from "../../config";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";
import { PoemService } from "../../services/Poem";
import IonIcon from "@reacticons/ionicons";
import ReactModal from "react-modal";
import PreviewAvatar from "../../components/PreviewAvatar/PreviewAvatar"

const PoetProfile = () => {
  // Get the username of the profile being browsed
  const params = useParams();

  // Read from the the user session if any to check if there's a need to reach the server to get data
  const { userSession, setUserSession } = useSession();
  const { userToken } = useStorage();
  const { showToast } = useToast();
  const { setIsLoaderVisible } = useLoaderState();

  const [profileData, setProfileData] = React.useState(null);
  const [feed, setFeed] = React.useState([]);

  // Avatar preview
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = React.useState(false);

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
                document.title = [
                  process.env.REACT_APP_NAME,
                  [
                    response.body.data.display_name,
                    " (@",
                    response.body.data.username,
                    ")",
                  ].join(""),
                ].join(": ");
              }
            }
          });
      }
    });
  });

  // Following / Unfollowing another rebbel
  const toggleFollowStatus = () => {
    return new Promise((resolve, reject) => {
      superagent.post(
        [config.BACKEND, "rebbels", "follow", profileData.username].join("/")
      )
      .set("Authorization", userToken)
      .end((_, response) => {
        console.log(response);
        if (response && response.status === 200) {
          console.log(setUserSession, userSession)
          setUserSession({...userSession, follows: response.body.data});
          resolve();
          console.log("Follows", userSession.follows)
        } else {
          console.log(response.body.reason || "Something went wrong.");
        }
      });
    });
  };

  // Selecting an avatar to upload and place
  const selectUploadPhoto = () => {
    // Create a temporary file select element to select an upload file
    const i = document.createElement("input");
    i.type = "file";
    i.accept = ".gif,.jpg,.jpeg,.png"

    // Programmatically click the temporary file select element
    i.click();
    i.addEventListener("change", (e) => {
      // Trigger a file upload and wait for it to finish then replace the profile picture
      superagent
        .post([config.BACKEND, "assets", "upload"].join("/"))
        .attach("file", i.files[0])
        .set("Authorization", userToken)
        .end((_, response) => {
          if (response) {
            if (response.status === 200) {
              replaceProfileAvatar(response.body.data.large);
            } else {
              showToast(response.body.reason || "Something went wrong.");
            }
          } else {
            showToast("Not connected to the internet.");
          }
        })
    })
  }

  // Replacing the avatar profile picture
  const replaceProfileAvatar = (avatar_url) => {
    // Simply just sending the uploaded image URL to an account PATCH
    superagent
      .patch([config.BACKEND, "rebbels", userSession.email_address].join("/"))
      .set("Authorization", userToken)
      .send({ display_photo: avatar_url })
      .end((_, response) => {
        if (response) {
          if (response.status === 200) {
            setUserSession({ ...userSession, display_photo: avatar_url });
            setProfileData({ ...profileData, display_photo: avatar_url });
            
            showToast("Profile avatar updated.");
          } else {
            showToast(response.body.reason || "Something went wrong.");
          }
        } else {
          showToast("No internet connection.");
        }
      })
  }

  // Opening a preview modal for an avatar
  const toggleAvatarPreview = () => {
    setIsAvatarPreviewOpen(!isAvatarPreviewOpen);
  }

  React.useEffect(() => {
    // document.title = process.env.REACT_APP_NAME + ": " + name;
    getProfileData().then((data) => {
      setProfileData(data);
      data.poems.forEach((poemId) =>
        PoemService.getPoemData(poemId).then((poem) => {
          const poems = feed;
          poems.push(poem);
          setFeed(poems);

          // Do this to get the poems to show up
          setTimeout(() => {
            setProfileData({...data});
          }, 100);
        })
      );
    });
  }, []);

  return (
    profileData && (
      <div style={{ width: "100%" }} className="page-container">
        <ReactModal
            isOpen={isAvatarPreviewOpen}
            onRequestClose={() => toggleAvatarPreview()}
            style={{
              overlay: { zIndex: 60000 },
              content: {
                width: "45%",
                padding: 0,
                height: "500px",
                margin: "auto",
                position: "absolute",
                bottom: "20px",
                borderRadius: "5px",
                border: "3px solid black",
              },
            }}
          >
            <PreviewAvatar display_photo={profileData?.display_photo} display_name={profileData?.display_name}></PreviewAvatar>
          </ReactModal>
        
        <div className={styles.ProfilePage}>
          <div className={styles.ProfileAvatarContainer}>
            <div
              className={styles.ProfileAvatar}
              data-ischangeable={profileData.username == userSession?.username}
              data-isviewable={profileData.username != userSession?.username}
              onClick={() => { profileData?.username == userSession?.username
                ? selectUploadPhoto() : toggleAvatarPreview() }}
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
                <button
                  className={styles.FollowButton}
                  style={{ backgroundColor: userSession?.follows?.includes(profileData._id) ? "#333" : "black" }}
                  onClick={() => {
                    toggleFollowStatus().then(() => console.log());
                  }}
                >
                  
                  {userSession?.follows?.includes(profileData._id) ? <span>Following &#10003;</span> : <span style={{positon: "relative"}}>Follow <span style={{opacity: 0, positon: "absolute"}}>&#10003;</span></span>}
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
