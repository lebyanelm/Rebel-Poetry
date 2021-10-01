import React from "react";
import PropTypes from "prop-types";
import styles from "./CommentsSection.module.scss";
import IonIcon from "@reacticons/ionicons";
import { Link, useParams } from "react-router-dom";
import { CommentsService } from "../../services/Comments";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";
import Linkify from "react-linkify";
import Comment from "../../components/Comment/Comment";

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
          <Comment
            comment={comment}
            update={(update, reference) => {
              const cIndex = comments.findIndex((c) => c._id === reference);
              if (cIndex > -1) {
                const _comments = [...comments];
                if (!update) {
                  _comments.splice(cIndex, 1);
                } else {
                  _comments[cIndex] = update;
                }
                setComments(_comments);
              }
            }}
          />
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
