import React from "react";
import styles from "./Poem.module.scss";
import { Link } from "react-router-dom";
import { PoemService } from "../../services/Poem";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import IonIcon from "@reacticons/ionicons";

const Poem = ({ data, isDraft }) => {
  const [poemAuthors, setPoemAuthors] = React.useState([]);
  const reduceDescription = (description) => {
    description = description.split(" ");
    if (description.length > 40) {
      description = description.slice(0, 25);
    }
    return description.join(" ") + "...";
  };

  React.useEffect(() => {
    // Get information of the poet
    if (data.author !== undefined) {
      PoemService.getPoemAuthors([data.author, ...data.featured_poets]).then(
        (poets) => {
          console.log(poets)
          setPoemAuthors(poets);
        }
      );
    } else {
      setPoemAuthors([
        isDraft
          ? { display_name: "Myself", username: "me" }
          : { display_name: "Anonymous", username: "anonymous" },
      ]);
    }
  }, []);

  return (
    <div className={styles.Poem}>
      {data.thumbnail ? (
        <div
          className={styles.PoemThumbnail}
          style={{ backgroundImage: `url(${data.thumbnail})` }}
          data-text="Bookmarked and Liked"
        ></div>
      ) : (
        <div
          className={styles.PoemThumbnail}
          style={{
            backgroundImage: `url(${[
              process.env.REACT_APP_API_ENDPOINT,
              "uploads",
              "default-background.png",
            ].join("/")})`,
          }}
          data-text="Bookmarked and Liked"
        ></div>
      )}
      <div className={styles.PoemReadTime}>{data.read_time}</div>
      <div className={styles.PoemDetails}>
        <div style={{display: "flex", gap: "10px"}}>
          <div className={styles.PoemAvatarDetails}>
            <a href={["/rebbels/@", poemAuthors[0]?.username].join("")} className="avatar small-avatar" style={{backgroundImage: `url(${poemAuthors[0]?.display_photo})`}}></a>
          </div>
          <div className={styles.PoemDetailsContainer}>
            <a
              className={styles.PoemTitle}
              href={
                isDraft
                  ? ["/new_poem?draft_id=", data.did].join("")
                  : ["/~", data._id?.toUpperCase()].join("")
              }
            >
              {data.title}
            </a>
            <div className={styles.PoemAuthorTime}>
              <a href={["/"].join("")}>{poemAuthors[0]?.display_name}</a>
            </div>
          </div>
          <span style={{flex: "2"}}></span>
          <div style={{display: "flex",  gap: "10px"}}>
            <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
              <IonIcon name="hand-left" />
              <span>{data?.likes_count}</span>
            </div>

            <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
              <IonIcon name="eye" />
              <span>{data?.views_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poem;

// <div className={styles.}></div>
