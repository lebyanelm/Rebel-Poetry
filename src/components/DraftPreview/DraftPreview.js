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

  const publishDraft = () => {
    setIsLoaderVisible(true)
    PoemService.publish(data, tagsInput.current.value, userToken)
      .then((poemId) => {
        setIsLoaderVisible(false);
        isPublished(poemId.toUpperCase());
      })
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
    <div className={styles.DraftPreview} id="draft-container">
      <div className={styles.DraftTitle}>
        {data.title || "No title entered yet."} (preview)
      </div>

      <div className={styles.DraftSplitSides}>
        <div className={styles.DraftContents}>
          <ReactMarkdown children={data.body} plugins={[remarkGfm]}></ReactMarkdown>
        </div>
        <div className={styles.DraftAnnotations}>
          Click on an annotation to read it's description
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
