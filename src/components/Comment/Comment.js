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
    PoemService.getPoemAuthors([comment.commenter, "61353484137f33dd6430333c"]).then((commenters) => {
      if (commenters.length) {
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
              CommentsService.react(comment._id, storage.userToken).then((data) => {
                if (!data.is_like) {
                  comment.likes.splice(
                    comment.likes.indexOf(userSession?._id), 1);
                } else {
                  comment.likes.push(userSession?._id);
                }

                comment.likes_count = data.likes_count;
                update(comment, comment._id);
              })
            }
          >
            <IonIcon name="heart-sharp" />
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
            defaultValue={comment.body}
            ref={editPoemTextarea}
          ></textarea>
        )}

        <span className={styles.CommentorNameDate}>
          &mdash; By{" "}
          <Link to={`/rebbels/@${commenter.username}`}>
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
                CommentsService.update(editPoemTextarea.current.value, comment._id, storage.userToken).then(
                  () => {
                    update({ ...comment, body: editPoemTextarea.current.value }, comment._id);
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
        </div>
      </div>
    </div>
  );
};

export default Comment;
