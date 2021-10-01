import React, { useEffect } from "react";
import Poet from "../../components/Poet/Poet";
import styles from "./PoetsPage.module.scss";
import * as superagent from "superagent";
import { useSession } from "../../providers/SessionContext";
import { useLoaderState } from "../../providers/LoaderContext";
import { useHistory } from "react-router";
import qs from "qs";

const PoetsPage = () => {
  const [rebbels, setRebbels] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const { userSession } = useSession();

  // React routing capabilities
  const router = useHistory();

  // To be able to toggle the loader
  const { setIsLoaderVisible } = useLoaderState();

  // Get query parameters to get the page index
  const defaultParams = qs.parse(router.location.search, {
    ignoreQueryPrefix: true,
  });
  const [queryParameters, setQueryParameters] = React.useState(defaultParams);

  // For when an error occurs when retrieving the rebbels
  const [responseError, setResponseError] = React.useState("");

  console.log("Request URI:", process.env.REACT_APP_API_ENDPOINT, process.env.REACT_APP_ENV)

  // Getting rebbel poets from the backend
  const getRebbelPoets = React.useCallback(() => {
    setIsLoaderVisible(true);
    setResponseError("");
    superagent
      .get(
        [
          process.env.REACT_APP_API_ENDPOINT,
          "rebbels?limit=10&start=" + queryParameters.index,
        ].join("/")
      )
      .set("Authorization", userSession ? userSession.token : undefined)
      .end((_, response) => {
        setIsLoaderVisible(false);
        if (response) {
          console.log(response.body);
          if (response.statusCode === 200) {
            setRebbels(response.body.data.rebbels);
            // Rebuild the number of pages left
            updatePagesCount(response.body.data.total_count);
          } else {
            setResponseError(
              response.body.reason ||
                "An error has occurred while retrieving the poets from the server"
            );
            updatePagesCount(1);
          }
        } else {
          setResponseError(
            "An error has occurred while retrieving the poets from the server"
          );
          updatePagesCount(1);
        }
      });
  });

  const updatePagesCount = (totalCount) => {
    setPages([]);
    const pIndexes = [];
    for (let pIndex = 1; pIndex <= totalCount; pIndex++) {
      pIndexes.push(pIndex);
    }
    setPages(pIndexes);
  };

  useEffect(() => {
    document.title = [process.env.REACT_APP_NAME, "All Rebbel Poets"].join(
      ": "
    );

    if (!queryParameters.index)
      setQueryParameters({ ...queryParameters, index: 1 });
    getRebbelPoets();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="name">All Rebbels</span>
        <div className="flex-space"></div>
        <a href="/search?filter=by_rebbel">
          <span>Filter</span>
        </a>
      </div>

      {/* Results retrieved from the backend retrieval */}
      {!responseError && (
        <div className={styles.Poets}>
          {queryParameters.index === "1" && (
            <Poet poet={{ display_name: "Anonymous", username: "anonymous" }} />
          )}
          {rebbels.map((poet) => (
            <Poet poet={poet} key={poet._id} />
          ))}
        </div>
      )}

      {/* When an error has occured when retrieving the results */}
      {responseError && (
        <div>
          <h2 style={{ textAlign: "center" }}>
            {responseError} &mdash;{" "}
            <a
              style={{ fontSize: "50px", color: "white", userSelect: "none" }}
              onClick={() => getRebbelPoets()}
            >
              Try this again.
            </a>
          </h2>
        </div>
      )}

      {!!pages.length && (
        <div className="more-pages">
          <div className="more-pages-title">More Rebbels</div>
          <div className="more-pages-links">
            {pages.map((pageNumber) => (
              <a
                href={["/rebbels?index=", pageNumber].join("")}
                data-isactive={pageNumber.toString() === queryParameters.index}
                key={pageNumber}
              >
                {pageNumber}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoetsPage;
