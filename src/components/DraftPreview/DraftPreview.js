import React from "react";
import styles from "./DraftPreview.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PoemService } from "../../services/Poem";
import { useStorage } from "../../providers/StorageContext";
import { useLoaderState } from "../../providers/LoaderContext";

const DraftPreview = ({ data, token, isPublished }) => {
  const { userToken } = useStorage();
  const { isLoaderVisible, setIsLoaderVisible } = useLoaderState()

  const [draftContainerWidth, setDraftPreviewContainer] = React.useState(0);
  const tagsInput = React.createRef();

  // Where all the annotations will be displayed
  const annotationText = React.createRef();
  
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const publishDraft = () => {
    setIsLoaderVisible(true)
    PoemService.publish(data, tagsInput.current.value, userToken)
      .then((poemId) => {
        setIsLoaderVisible(false);
        isPublished(poemId.toUpperCase());
      })
  }

  const positionAnnotationContainer = (annotation, event) => {
    if (annotationText.current) {
      annotationText.current.innerText = annotation;
    }
  }

  const parseAnnotations = (text) => {
    if (text) {
      // Split the text using the "|" pipes
      const splitText = text.split("|");
      const result = [];
      for (let index = 0; index < splitText.length; index++) {
        // Check if the split text has format |<TEXT>=<ANNOTATION>|
        console.log(splitText[index])
        if (splitText[index].includes("=")) {
          const splitAnnotations = splitText[index].split("="),
                _text = splitAnnotations[0],
                annotation = splitAnnotations[1];
          console.log(_text, annotation)
          result.push(<a onClick={(event) => {
            positionAnnotationContainer(annotation, event);
            setActiveIndex(index);
          }} data-index={index} data-isactive={index === activeIndex}>{_text}</a>)
        } else {
          result.push(<span>{splitText[index]}</span>)
        }
      }
      return result
    } else {
      return <span>Loading...</span>
    }
  }

  React.useState(() => {
    // Change the width of the bottom buttons when the width changes
    const windowResizeListener = window.addEventListener("resize", () => {
      const draftContainer = document.getElementById("draft-container");
      if (draftContainer)
        setDraftPreviewContainer(draftContainer.innerWidth)
      console.log(draftContainer)
    });
  }, []);

  return (
    <div className={styles.DraftPreview} id="draft-container" onScroll={(event) => {console.log(event)}}>
      <div className={styles.DraftTitle}>
        {data.title || "No title entered yet."} (preview)
      </div>

      <div className={styles.DraftSplitSides}>
        <div className={styles.DraftContents}>
          <p className={styles.DraftAnnotationsText} style={{whiteSpace: "pre-wrap"}} children={parseAnnotations(data.body) || "Click on an annotation to read it's description"}></p>

          {/* <ReactMarkdown children={data.body} plugins={[remarkGfm]}></ReactMarkdown> */}
        </div>
        <div className={styles.DraftAnnotations}>
          <div className={styles.DraftAnnotationsText} ref={annotationText}>Click on an annotation to read it's description</div>
        </div>
      </div>

      <div className={styles.BottomButtons}>
        {/* The input for adding tags of the poem*/}
        <input placeholder="Comma seperated Tags, eg. Love, Teenagers, Fun" ref={tagsInput} />

        <button disabled={isLoaderVisible} className="primary" onClick={publishDraft}>Publish Poem</button>
      </div>
    </div>
  )
};

export default DraftPreview;
