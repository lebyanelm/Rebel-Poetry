import React from "react";
import { Link, useParams } from "react-router-dom";
import PoemPageHeader from "../../components/PoemPageHeader/PoemPageHeader";
import IonIcon from "@reacticons/ionicons";
import styles from "./PoemPage.module.scss";
import * as superagent from "superagent";
import { useLoaderState } from "../../providers/LoaderContext"
import { useToast } from "../../providers/ToastContext"

const PoemPage = () => {
  const { setIsLoaderVisible } = useLoaderState();
  const { showToast } = useLoaderState();

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

  // Get the poem data when the page is opened
  const params = useParams();
  const [poemData, setPoemData] = React.useState({});
  React.useEffect(() => {
    setIsLoaderVisible(true);
    superagent
      .get([process.env.REACT_APP_API_ENDPOINT, "poems", params.poemId].join("/"))
      .end((_, response) => {
        setIsLoaderVisible(false);

        if (response) {
          if (response.status === 200) {
            setPoemData(response.body.data);
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
    let windowScrollListener = window.addEventListener("scroll", (event) => {
      const scrollY = window.scrollY;

      // Get the distance between the scroll and buttons container and if < 20 make buttons sticky
      const poemContentRect = poemTextContainer.current.getBoundingClientRect();
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
    });

    return () => window.removeEventListener("scroll", windowScrollListener);
  }, [poemData]);

  return (
    <>
      <div className={styles.PoemPageContainer}>
        <PoemPageHeader poemData={poemData}></PoemPageHeader>

        <div className={styles.PoemContents}>
          <div className={styles.PoemSplitSides}>
            {/* The top of the poem text area */}
            <div className={styles.SideButtons} ref={scrollButtonsContainer}>
              <button title="Users currently reading this poem.">
                <IonIcon name="eye-outline"></IonIcon>
                <span className="count">{poemData.views_count}</span>
              </button>

              <button className={styles.Bookmark}>
                <IonIcon name="bookmark-outline"></IonIcon>
                <span className="count">{poemData.bookmarks_count}</span>
              </button>

              <button className={styles.Heart}>
                <IonIcon name="flame"></IonIcon>
                <span className="count">{poemData.likes_count}</span>
              </button>

              <button className={styles.Share}>
                <IonIcon name="share-outline"></IonIcon>
                <span className="count">{poemData.shares_count}</span>
              </button>
            </div>

            <div className={styles.PoemTextContainer} ref={poemTextContainer}>
              {poemData.body}
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
          <div className={styles.RecommendedPoems}>
            <h1>Discover More</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoemPage;
