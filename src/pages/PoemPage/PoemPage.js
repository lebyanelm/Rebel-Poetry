import React from "react";
import { Link } from "react-router-dom";
import PoemPageHeader from "../../components/PoemPageHeader/PoemPageHeader";
import IonIcon from "@reacticons/ionicons";
import styles from "./PoemPage.module.scss";

const PoemPage = () => {
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
  }, []);

  return (
    <>
      <div className={styles.PoemPageContainer}>
        <PoemPageHeader></PoemPageHeader>
        <div className={styles.PoemContents}>
          <div className={styles.PoemSplitSides}>
            {/* The top of the poem text area */}
            <div className={styles.SideButtons} ref={scrollButtonsContainer}>
              <button title="Users currently reading this poem.">
                <IonIcon name="eye-outline"></IonIcon>
                <span className="count">1.2M</span>
              </button>

              <button className={styles.Bookmark}>
                <IonIcon name="bookmark-outline"></IonIcon>
                <span className="count">490K</span>
              </button>

              <button className={styles.Heart}>
                <IonIcon name="flame"></IonIcon>
                <span className="count">19M</span>
              </button>

              <button className={styles.Share}>
                <IonIcon name="share-outline"></IonIcon>
                <span className="count">190K</span>
              </button>
            </div>

            <div className={styles.PoemTextContainer} ref={poemTextContainer}>
              In the end he died an ordinary man<br></br>
              Only rich in wrinkles from where the spirit had been<br></br>
              It would be the saddest days<br></br>
              And we watched the world weep<br></br>
              <a
                onClick={(event) =>
                  positionAnnotationContainer(
                    "He was referred as the biggest leader to have existed. As he has freed a nation, a president a slave to make other's lives better now free.",
                    event
                  )
                }
              >
                For a giant bigger than myths<br></br>A life owned by many
                <br></br>
                Now free as the gods<br></br>
                <br></br>
              </a>
              Some cried as though tomorrow was lost<br></br>
              Some celebrated, questioned freedom and its cost<br></br>
              Some seized the chance to stand on his shoulders<br></br>
              While others cursed his grave and scorned wisdom of the elders
              <br></br>
              <br></br>
              <a
                onClick={(event) =>
                  positionAnnotationContainer(
                    "Poeple were too many, there was no order.",
                    event
                  )
                }
              >
                Stadiums were littered
              </a>
              <br></br>
              And those in the know spoke their fill<br></br>
              Mourners paid tribute<br></br>
              Monarch to President made the bill<br></br>
              <a
                onClick={(event) =>
                  positionAnnotationContainer(
                    "In rememberence of the late first Black President, Nelson Mandela. This praise is meant to remind South Africans about the unity of one.",
                    event
                  )
                }
              >
                But still Where do I we begin
              </a>
              <br></br>
              In telling our children where these old bones have been<br></br>
              And that we as next of kin<br></br>
              Have inherited his struggle<br></br>
              <a
                onClick={(event) =>
                  positionAnnotationContainer(
                    "In rememberence of the late first Black President, Nelson Mandela. This praise is meant to remind South Africans about the unity of one. In rememberence of the late first Black President, Nelson Mandela.",
                    event
                  )
                }
              >
                And he forever lives through our skin<br></br>
              </a>
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
