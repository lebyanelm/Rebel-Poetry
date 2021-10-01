import React from "react";
import PropTypes from "prop-types";
import styles from "./Comment.module.scss";
import IonIcon from "@reacticons/ionicons";
import Linkify from "react-linkify";
import { Link, useParams } from "react-router-dom";
import { CommentsService } from "../../services/Comments";
import { PoemService } from "../../services/Poem";
import { useStorage } from "../../providers/StorageContext";
import { useSession } from "../../providers/SessionContext";

const Comment = ({ comment, update }) => {
  const storage = useStorage();
  const { userSession } = useSession();

  // States
  const [isEditMode, setEditMode] = React.useState(false);
  const [commenter, setCommenter] = React.useState([]);
  const editPoemTextarea = React.createRef();

  // Get the comments as soon as the page loads up
  React.useEffect(() => {
    PoemService.getPoemAuthors([comment.commenter]).then((commenters) => {
      if (commenter.length) {
        setCommenter(commenters[0]);
      }
    });
  }, [comment]);

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentActions}>
        <div className={styles.CommentLikesCount}>{comment?.likes_count}</div>
        <div className={styles.CommentActionButtons}>
          <div
            className={styles.Like}
            data-isliked={comment.likes.includes(userSession?._id)}
            onClick={() =>
              CommentsService.react(comment._id, storage.userToken).then(() => {
                if (comment.likes.includes(userSession?._id)) {
                  comment.likes.splice(
                    comment.likes.indexOf(userSession?._id),
                    1
                  );
                } else {
                  comment.likes.push(userSession?._id);
                }

                comment.likes_count = comment.likes.length;
                update(comment);
              })
            }
          >
            <IonIcon name="caret-up-sharp" />
          </div>
          <div
            className={styles.Flag}
            onClick={() => CommentsService.flag(comment._id, storage.userToken)}
          >
            <IonIcon name="flag-sharp" />
          </div>
        </div>
      </div>
      <div className={styles.CommentBody}>
        {/* When edit mode is OFF */}
        {!isEditMode && <Linkify>{comment.body}</Linkify>}

        {/* When edit mode is ON */}
        {isEditMode && (
          <textarea
            rows="2"
            placeholder="Type your comment..."
            value={comment.body}
            ref={editPoemTextarea}
          ></textarea>
        )}

        <span className={styles.CommentorNameDate}>
          &mdash; By{" "}
          <Link to={`/rebbels/@${commenter._id}`}>
            {commenter?.display_name}
          </Link>{" "}
          on{" "}
          <strong>
            {comment.time_created?.day} at {comment?.time_created?.time}
          </strong>
        </span>

        <div className={styles.CommentMoreActions}>
          <a
            onClick={() => {
              if (isEditMode) {
                CommentsService.update(comment._id, storage.userToken).then(
                  () => {
                    console.log(editPoemTextarea);
                    setEditMode(!isEditMode);
                  }
                );
              } else {
                setEditMode(!isEditMode);
              }
            }}
          >
            {isEditMode ? "Save changes" : "Edit"}
          </a>
          <a
            onClick={() =>
              CommentsService.delete(comment._id, storage.userToken).then(
                () => {
                  update(undefined, comment._id);
                }
              )
            }
          >
            Delete
          </a>
          <a>Report</a>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {};

Comment.defaultProps = {};

export default Comment;
