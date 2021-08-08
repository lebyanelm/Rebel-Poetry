import React, { useEffect } from "react";
import styles from "./SearchPage.module.scss";
import IonIcon from "@reacticons/ionicons";
import PoemsList from "../../components/PoemsList/PoemsList";

const SearchPage = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    document.title = [process.env.REACT_APP_NAME, "Search"].join(": ");
  }, []);

  return (
    <>
      <div className="page-container">
        <h1>Search</h1>
        <div className={styles.SearchInputContainer}>
          <input
            className={styles.LargeSearchInput}
            type="text"
            placeholder="Search for Rebel Poems / Poets"
            onKeyUp={(event) => setSearchValue(event.target.value)}
          />
          <div className={styles.SearchButton}>
            <IonIcon name="arrow-forward-sharp"></IonIcon>
          </div>
        </div>

        {results.length
          ? true
          : false && (
              <>
                <h4 style={{ textAlign: "center" }}>
                  All results for "{searchValue}"
                </h4>
                <PoemsList></PoemsList>
              </>
            )}
      </div>
    </>
  );
};

export default SearchPage;
