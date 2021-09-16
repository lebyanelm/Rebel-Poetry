import React from "react";
import styles from "./Poem.module.scss";
import { Link } from "react-router-dom";
import { PoemService } from "../../services/Poem";

const Poem = ({ data }) => {
  const [poemAuthors, setPoemAuthors] = React.useState([]);
  const reduceDescription = (description) => {
    description = description.split(" ");
    if (description.length > 40) {
      description = description.slice(0, 25);
    }
    return description.join(" ") + "...";
  }

  React.useEffect(() => {
    // Get information of the poet
    if (data.author !== undefined) {
      PoemService.getPoemAuthors([data.author, ...data.featured_poets])
        .then((poets) => {
          setPoemAuthors([...poemAuthors, ...poets]);
        });
    } else {
      setPoemAuthors([{ display_name: "Anonymous", username: "anonymous" }])
    }
  }, [])

  return (
    <div className={styles.Poem} style={{ backgroundImage: `url(${data.thumbnail})` }}>
      <div className={styles.PoemContents}>
        <Link className={styles.PoemTitle}>{data.title}</Link>
        <span className={styles.PoemAuthor}>Written by <Link to={`/rebbels/@${(poemAuthors.length && poemAuthors[0].username)}`}>{poemAuthors.length ? poemAuthors[0].display_name : "Loading..."}</Link></span>

        <span className={styles.PoemSnapshot}>{reduceDescription(data.description ? data.description : data.body)}</span>

      </div>
    </div>
  )
};

export default Poem;

// <div className={styles.}></div>
