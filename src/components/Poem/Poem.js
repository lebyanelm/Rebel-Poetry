import React from "react";
import styles from "./Poem.module.scss";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import PoemActions from "../PoemActions/PoemActions";
import * as superagent from "superagent";
import { useLoaderState } from "../../providers/LoaderContext";
import { PoemService } from "../../services/Poem";

const Poem = ({ poemId }) => {
  const [poemData, setPoemData] = React.useState();
  const [poemAuthors, setPoemAuthor] = React.useState([]);

  const { setIsLoaderVisible } = useLoaderState();

  // Getting information about the poem
  const getPoemInformation = () => {
    setIsLoaderVisible(true);
    PoemService.getPoemData(poemId)
      .then((poem) => {
        setIsLoaderVisible(false);
        setPoemData(poem);
        // Get the poem authors and get their details for display
        let authors = [poem.author];
        if (poem.featuredPoets) {
          authors = [...authors, ...poem.featuredPoets];
        }
        PoemService.getPoemAuthors(authors).then((_authors) =>
          setPoemAuthor(_authors)
        );
      })
      .catch((statusCode) => {
        setIsLoaderVisible(false);
        console.log("ERROR:", statusCode);
      });
  };

  React.useEffect(() => {
    getPoemInformation();
  }, []);

  return poemData ? (
    <div className={styles.Poem}>
      <div className={styles.PoemDetails}>
        <Link to={"/poem/" + poemId.toLocaleUpperCase()}>
          <header className={styles.PoemTitle}>{poemData.title}.</header>
        </Link>

        {!!poemAuthors.length && (
          <span className={styles.PoemAuthor}>
            Written by <Link>{poemAuthors[0].display_name}</Link>
            {poemAuthors.map((author, index) =>
              index !== 0 ? (
                index === 1 ? (
                  <span>
                    {" "}
                    featuring <Link>{author.display_name}</Link>
                  </span>
                ) : (
                  <span>
                    , <Link>{author.display_name}</Link>
                  </span>
                )
              ) : (
                ""
              )
            )}
          </span>
        )}

        {/* <Link to="poets/@roddyrich"> Edgar Allen Po.</Link>, featuring{" "}
            <Link to="poets/@roddyrich">Maya Angelou</Link>,{" "}
            <Link to="poets/@roddyrich">Joseph Rohghan</Link>, and{" "}
            <Link to="poets/@roddyrich">The Logical Minds</Link> */}

        {/* <span className={styles.PoemDescription}>
          I’ve learned that people will forget what you said, people will forget
          what you did, but people will never forget how you made them feel.
        </span> */}

        {/* <div className="tags"> */}
        {/* <Link to="/tag?name=30min_read">
      <div className="tag flex align-center">
        <IonIcon name="star" style={{ marginRight: "5px" }}></IonIcon>{" "}
        Premium
      </div>
    </Link> */}
        {/* <Link to="/tag?name=30min_read">
            <div className="tag underline">English</div>
          </Link>
          <Link to="/tag?name=30min_read">
            <div className="tag">African Struggle</div>
          </Link>
          <Link to="/tag?name=30min_read">
            <div className="tag">Black</div>
          </Link>
          <Link to="/tag?name=30min_read">
            <div className="tag">Life</div>
          </Link>
        </div> */}
      </div>

      {/* Poem Actions */}
      <div
        className={styles.PoemThumbnail}
        style={{
          backgroundImage: `url(${poemData.thumbnail})`,
        }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default Poem;
