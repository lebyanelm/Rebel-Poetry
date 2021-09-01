import React from "react";
import PropTypes from "prop-types";
import styles from "./DraftPreview.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DraftPreview = ({ title, body, did }) => (
  <div className={styles.DraftPreview} data-testid="DraftPreview">
    <div className={styles.DraftTitle}>
      {title || "No title entered yet."} (preview)
    </div>
    <div className={styles.DraftSplitSides}>
      <div className={styles.DraftContents}>
        <ReactMarkdown children={body}></ReactMarkdown>
      </div>
      <div className={styles.DraftAnnotations}>
        Click on an annotation to read it's description
      </div>
    </div>

    <div className={styles.BottomButtons}>
      <button className="outline dark">Publish</button>
    </div>
  </div>
);

DraftPreview.propTypes = {};

DraftPreview.defaultProps = {};

export default DraftPreview;
