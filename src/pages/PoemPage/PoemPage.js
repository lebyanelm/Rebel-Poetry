/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PoemPageHeader from "../../components/PoemPageHeader/PoemPageHeader";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import PoemShareContents from "../../components/PoemShareContents/PoemShareContents";
import { PoemService } from "../../services/Poem";
import IonIcon from "@reacticons/ionicons";
import styles from "./PoemPage.module.scss";
import * as superagent from "superagent";
import config from "../../config";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";
import { useSession } from "../../providers/SessionContext";
import { useToast } from "../../providers/ToastContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactModal from "react-modal";

const PoemPage = () => {
  const { setIsLoaderVisible } = useLoaderState();
  const { userToken } = useStorage();
  const { userSession, setUserSession } = useSession();
  const { showToast } = useToast();
  const history = useHistory();

  // Toggling the editing mode of the poem
  const [isEditMode, setIsEditMode] = React.useState(false);
  const editableTextContentRef = React.createRef();

  // Toggling the share modal
  const [isShareModalOpen, setShareModal] = React.useState(false);

  // Reference of the poem text container, to easily calculate annotation position
  const poemTextContainer = React.useRef();
  const scrollButtonsContainer = React.useRef();

  // Opens an annotation box at the point of the clicked target
  const [annotationPosition, setAnnotationPosition] = React.useState(0);
  const annotationContainer = React.useRef();

  const positionAnnotationContainer = (annotation, event) => {
    const targetElement = event.target;
    const targetRect = targetElement.getBoundingClientRect();
    const textContainerRect = poemTextContainer.current.getBoundingClientRect();

    let targetPosition = targetRect.y - textContainerRect.y;

    // Set the contents of the annotations to the annotations container
    annotationContainer.current.innerHTML = annotation;

    // Check if the the annotation container exceeds the bottom of the poem to bring it back up
    const annotationContainerRect =
      annotationContainer.current.getBoundingClientRect();
    const annotationTotalSpace =
      targetPosition + annotationContainerRect.height;

    if (textContainerRect.height - annotationTotalSpace < 0) {
      targetPosition =
        textContainerRect.height - annotationContainerRect.height;
    }

    setAnnotationPosition(targetPosition);
    // Set the position of the annotation container
    annotationContainer.current.style.transform = [
      "translateY(",
      targetPosition,
      "px)",
    ].join("");
  };

  const deletePoem = () => {
    PoemService.deletePoem(poemData._id, userToken)
      .then(() => {
        showToast("Poem deleted.");
        history.push("/discover");
      })
      .catch((error) => console.log("ERRRROR:", error));
  };

  // Get the poem data when the page is opened
  const params = useParams();
  const [poemData, setPoemData] = React.useState({});
  React.useEffect(() => {
    setIsLoaderVisible(true);
    superagent
      .get([config.BACKEND, "poems", params.poemId].join("/"))
      .end((_, response) => {
        setIsLoaderVisible(false);

        if (response) {
          if (response.status === 200) {
            setPoemData(response.body.data);
            document.title = [
              process.env.REACT_APP_NAME,
              ": ",
              response.body.data.title,
            ].join("");
          } else {
            showToast(response.body.reason || "Something went wrong.");
            setPoemData(null);
          }
        } else {
          showToast("You're not connected with the internet.");
          setPoemData(null);
        }
      });
  }, []);

  // Toggle the poem action buttons as sticky or absolute as page is being scrolled
  React.useEffect(() => {
    // Determine whether or not if this is a guide page
    if (poemData.title) {
      if (poemData.title.includes("Guides: ")) {
        poemTextContainer.current.classList.add("is-guide");
      }
    }

    let windowScrollListener = window.addEventListener("scroll", (event) => {
      const scrollY = window.scrollY;

      // Get the distance between the scroll and buttons container and if < 20 make buttons sticky
      const poemContent = poemTextContainer.current;
      if (poemContent) {
        const poemContentRect = poemContent.getBoundingClientRect()
        const scrollDifference = poemContentRect.y - scrollY;
        if (scrollDifference <= 0) {
          scrollButtonsContainer.current.style.position = "fixed";
          scrollButtonsContainer.current.style.top = "200px";
        } else {
          scrollButtonsContainer.current.style.position = "absolute";
          scrollButtonsContainer.current.style.top = "0px";
        }

        if (scrollY > poemContentRect.bottom + 200) {
          scrollButtonsContainer.current.style.opacity = 0;
        } else {
          scrollButtonsContainer.current.style.opacity = 1;
        }
      }
    });
  }, [poemData]);

  return (
    <>
      <div className={styles.PoemPageContainer}>
      <ReactModal
        isOpen={isShareModalOpen}
        onRequestClose={() => setShareModal(false)}
        style={{
          overlay: { zIndex: 60000 },
          content: {
            width: "40%",
            height: "300px",
            margin: "auto",
            position: "absolute",
            bottom: "20px",
            borderRadius: "0px",
            border: "3px solid black",
          },
        }}
      >
        <PoemShareContents pId={poemData?._id} pTitle={poemData?.title}/>
      </ReactModal>
        
        <PoemPageHeader poemData={poemData}></PoemPageHeader>

        <div className={styles.PoemContents}>
          <div className={styles.PoemSplitSides}>
            {/* The top of the poem text area */}
            <div className={styles.SideButtons} ref={scrollButtonsContainer}>
              <button className={styles.Heart} data-isLiked={poemData.likes?.includes(userSession?._id)} onClick={() => {
                PoemService.likePoem(poemData._id, userToken)
                  .then((data) => {
                    // Update the number of likes on the poem data
                    setPoemData({ ...poemData, likes_count: data.likes_count, likes: data.likes });
                  })
              }}>
                {poemData.likes?.includes(userSession?._id) ? <IonIcon name="flame"></IonIcon> : <IonIcon name="flame-outline"></IonIcon>}
                <span className="count">{poemData.likes_count}</span>
              </button>

              <button title="Users currently reading this poem.">
                <IonIcon name="eye-outline"></IonIcon>
                <span className="count">{poemData.views_count}</span>
              </button>

              <button className={styles.Bookmark} data-isBookmarked={userSession?.bookmarked_poems.includes(poemData._id)} onClick={() => {
                // First check if there's a session in place
                if (userToken) {
                  // Update the bookmarks of the user
                  PoemService.bookmarkPoem(poemData._id, userToken)
                    .then((data) => {
                      // Update the number of likes on the poem data
                      setPoemData({ ...poemData, bookmarks_count: data.bookmarks_count })
                      if (data.is_bookmark) {
                        setUserSession({ ...userSession, bookmarked_poems: [...userSession.bookmarked_poems, poemData._id] })
                      } else {
                        // Remove the poem ID from the bookmarks
                        const bookmarkedPoems = userSession.bookmarked_poems;
                        const bookmarkedPoemIndex = bookmarkedPoems.indexOf(poemData._id);
                        if (bookmarkedPoemIndex > -1) {
                          bookmarkedPoems.splice(bookmarkedPoemIndex, 1);
                          setUserSession({ ...userSession, bookmarked_poems: bookmarkedPoems })
                        }
                      }

                      console.log("User session", userSession);
                    })
                } else {
                  showToast("You are not logged in. Sign in to bookmark this poem.");
                }
              }}>
                {userSession?.bookmarked_poems.includes(poemData._id) ? <IonIcon name="bookmark-sharp"></IonIcon> : <IonIcon name="bookmark-outline"></IonIcon>}
                <span className="count">{poemData.bookmarks_count}</span>
              </button>

              <button className={styles.Share} onClick={() => {
                setShareModal(!isShareModalOpen)
              }}>
                <IonIcon name="share-outline"></IonIcon>
                <span className="count">Share</span>
              </button>
            </div>

            <div className={styles.PoemTextContainer} ref={poemTextContainer}>
              {userSession && userSession._id === poemData.author && (
                <div className={styles.PoemActions}>
                  <a
                    onClick={() => {
                      const state = !isEditMode;
                      setIsEditMode(state);
                      if (state) {
                        editableTextContentRef.current.innerText =
                          poemData.body;
                      } else {
                        editableTextContentRef.current.innerText = "";
                        PoemService.updatePoem(
                          { body: poemData.body },
                          poemData._id,
                          userToken
                        );
                      }
                    }}
                  >
                    {isEditMode ? "Update" : "Edit"}
                  </a>

                  {isEditMode ? (
                    <a
                      className="color-danger"
                      onClick={() => setIsEditMode(false)}
                    >
                      Cancel
                    </a>
                  ) : (
                    <a className="color-danger" onClick={deletePoem}>
                      Delete
                    </a>
                  )}
                  <div
                    ref={editableTextContentRef}
                    onKeyUp={() =>
                      setPoemData({
                        ...poemData,
                        body: editableTextContentRef.current.innerText,
                      })
                    }
                    contentEditable="true"
                    style={{
                      borderBottom: isEditMode ? "3px solid black" : "none",
                      paddingBottom: isEditMode ? "20px" : "0",
                    }}
                  ></div>

                  {isEditMode && (
                    <>
                      <br></br>
                      <h5>Resulting Changes:</h5>
                      <br></br>
                    </>
                  )}
                </div>
              )}

              <ReactMarkdown
                children={poemData.body}
                plugins={[remarkGfm]}
                style={{
                  opacity: isEditMode ? "0" : "1",
                  position: isEditMode ? "absolute" : "relative",
                }}
              ></ReactMarkdown>
            </div>

            {/* Annotations container */}
            <div
              className={styles.AnnotationsContainer}
              style={{ translate: `translateY(${annotationPosition}px)` }}
              ref={annotationContainer}
            >
              In rememberence of the late first Black President, Nelson Mandela.
              This praise is meant to remind South Africans about the unity of
              one.
            </div>
          </div>

          {/* Tags that have been given to the poem */}
          <div className={styles.PoemTags}>
            <span>Tags</span>
            <a href="#tag" className="tag">
              African Struggle
            </a>
            <a href="#tag" className="tag">
              Black
            </a>
            <a href="#tag" className="tag">
              Apartheid
            </a>
            <a href="#tag" className="tag">
              Wisdom
            </a>
          </div>

          {/* Poem statistics and Author details */}
          <div className={styles.CommentsSection}>
            <h4 className={styles.CommentsSectionHeader}>
              <span className={styles.Name}>Comments</span>
              <span className={styles.Count}>
                {poemData.comments?.length
                  ? [poemData.comments.length, "Comments"].join(" ")
                  : "No comments"}{" "}
                posted
              </span>
            </h4>

            {/* The comments section */}
            <CommentsSection commentIds={poemData.comments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PoemPage;
