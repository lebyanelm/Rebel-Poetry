import React, { useEffect } from "react";
import styles from "./SearchPage.module.scss";
import IonIcon from "@reacticons/ionicons";
import { useLoaderState } from "../../providers/LoaderContext";
import PoemsList from "../../components/PoemsList/PoemsList";
import Poet from "../../components/Poet/Poet";
import { useToast } from "../../providers/ToastContext";
import * as superagent from "superagent";
import config from "../../config";
import { useHistory } from "react-router-dom"
import qs from "qs";


const SearchPage = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState({});
  const { setIsLoaderVisible } = useLoaderState();
  const { showToast } = useToast();
  const history = useHistory();
  console.log(history)

  const getSearchResults = () => {
    history.push([history.location.pathname, "?keyword=", searchValue].join(""));
    
    // Reset the results
    setResults({});

    setIsLoaderVisible(true);
    superagent
      .get([config.BACKEND, ["search?keyword=", searchValue.split(" ").join("+")].join("")].join("/"))
      .end((_, response) => {
        setIsLoaderVisible(false);
        if (response) {
          if (response.status === 200) {
            setResults(response.body.data);
          } else {
            showToast(response.body.reason || "Something went wrong.");
          }
        } else {
          showToast("No internet connection.");
        }
      });
  };

  useEffect(() => {
    const params = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });
    document.title = [process.env.REACT_APP_NAME, "Search"].join(": ");

    if (params.keyword) {
      setSearchValue(params.keyword);
      const counter = setInterval(() => {
        if (searchValue) {
          getSearchResults();
          console.log("Searching for pre-state")
          clearInterval(counter);
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <div className="page-container">
        <h1 className={styles.PageTitle}>Search</h1>
        <div className={styles.SearchInputContainer}>
          <input
            className={styles.LargeSearchInput}
            type="text"
            defaultValue={searchValue}
            placeholder="Search for Rebbel Poems / Poets"
            onKeyUp={(event) => {
              setSearchValue(event.target.value);
              setResults({});
            }}
          />
          <div className={styles.SearchButton} onClick={getSearchResults}>
            <IonIcon name="arrow-forward-sharp"></IonIcon>
          </div>
        </div>

        {(results.poems) && (
              <>
                <h4 style={{ textAlign: "center" }}>
                  { results.poems?.length ? "All results for " : "No results found for keyword" } "{searchValue}"
                </h4>
                
                <PoemsList feed={results.poems}></PoemsList>
              </>
            )}
      </div>
    </>
  );
};

export default SearchPage;
