import React from "react";
import PropTypes from "prop-types";
import styles from "./CommentsSection.module.scss";
import IonIcon from "@reacticons/ionicons";
import { Link, useParams } from "react-router-dom";
import { CommentsService } from "../../services/Comments";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";

const CommentsSection = () => {
  const { setIsLoaderVisible } = useLoaderState();
  const params = useParams();
  const storage = useStorage();

  // States
  const commentTextareaRef = React.createRef();
  const [comments, setComments] = React.useState([]);

  // To be able to run actions during and after posting comment
  const postComment = () => {
    setIsLoaderVisible(true);
    CommentsService.comment(
      {
        pId: params.poemId,
        body: commentTextareaRef.current.value,
      },
      storage.userToken
    )
      .then((comment) => {
        setComments([...comments, comment]);
        commentTextareaRef.current.value = "";
        setIsLoaderVisible(false);
      })
      .catch((error) => {
        setIsLoaderVisible(false);
        console.log("error", error);
      });
  };

  // Get the comments as soon as the page loads up
  React.useEffect(() => {
    CommentsService.getComments(params.poemId)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className={styles.CommentsSection} data-testid="CommentsSection">
      {comments.map((comment) => {
        return (
          <div className={styles.Comment}>
            <div className={styles.CommentActions}>
              <div className={styles.CommentLikesCount}>
                {comment?.likes_count}
              </div>
              <div className={styles.CommentActionButtons}>
                <div className={styles.Like}>
                  <IonIcon name="caret-up-sharp" />
                </div>
                <div className={styles.Flag}>
                  <IonIcon name="flag-sharp" />
                </div>
              </div>
            </div>
            <div className={styles.CommentBody}>
              <span>{comment?.body}</span>

              <span className={styles.CommentorNameDate}>
                &mdash; By <Link>JPG</Link> on{" "}
                <strong>
                  {comment.time_created?.day} at {comment?.time_created?.time}
                </strong>
              </span>

              <div className={styles.CommentMoreActions}>
                <a href="">Edit</a>
                <a href="">Share</a>
                <a href="">Bookmark</a>
                <a href="">Report</a>
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.PostCommentField}>
        <textarea
          rows="2"
          placeholder="Type your comment..."
          ref={commentTextareaRef}
        ></textarea>
        <button onClick={postComment}>Post your comment</button>
      </div>
    </section>
  );
};

export default CommentsSection;
