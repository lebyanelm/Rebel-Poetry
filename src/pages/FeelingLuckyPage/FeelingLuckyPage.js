import React from "react";
import { useHistory } from "react-router";
import { useToast } from "../../providers/ToastContext";
import Loader from "../../components/Loader/Loader";
import styles from "./FeelingLuckyPage.module.scss";
import * as superagent from "superagent";
import config from "./config";

const FeelingLuckyPage = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const [isError, setIsError] = React.useState(false);

  // Reach the server to get a random poem
  React.useEffect(() => {
    superagent
      .get([config.BACKEND, "poems", "feeling_lucky"].join("/"))
      .end((_, response) => {
        if (response) {
          if (response.status === 200) {
            // Route to a poem page to show the random poem
            history.push(["/poem", response.body.data["_id"]].join("/"));
          } else {
            showToast(response.body.reason || "Something went wrong.");
            setIsError(true);
          }
        } else {
          showToast("You're are not connected to the internet.");
          setIsError(true);
        }
      });
  }, []);

  return (
    <div className="page-container">
      {isError && (
        <div>
          <section>
            <h1>Something happened while retrieving a random poem.</h1>
            <p>
              If this error persists, please contact us and let us know about
              the issue.
            </p>
          </section>
        </div>
      )}

      {!isError && (
        <div>
          <section style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: "20px" }}>Let's spoil up!</h1>
            <Loader></Loader>
          </section>
        </div>
      )}
    </div>
  );
};

export default FeelingLuckyPage;
