import React from "react";
import PropTypes from "prop-types";
import styles from "./DraftsPage.module.scss";
import * as superagent from "superagent";
import config from "./config";
import { useStorage } from "../../providers/StorageContext";
import { useToast } from "../../providers/ToastContext";
import PoemsList from "../../components/PoemsList/PoemsList";

const DraftsPage = () => {
  const [drafts, setDrafts] = React.useState([]);
  const { showToast } = useToast();
  const storage = useStorage();

  // Retrieve the drafts from the backend
  React.useEffect(() => {
    superagent
      .get([config.BACKEND, "drafts"].join("/"))
      .set("Authorization", storage.userToken)
      .end((_, response) => {
        if (response) {
          if (response.status === 200) {
            setDrafts(response.body.data);
          } else {
            showToast(response.reason || "Something went wrong.");
          }
        } else {
          showToast("You are not connected to the internet.");
          setDrafts(null);
        }
      });
  }, []);

  return (
    <div className="page-container" data-testid="DraftsPage">
      {drafts === null && (
        <div>
          <section>
            <h1>Something happened while retrieving your drafts.</h1>
            <p>
              If this error persists, please contact us and let us know about
              the issue.
            </p>
          </section>
        </div>
      )}
      {drafts !== null && (
        <div>
          <h1>All Your Drafts</h1>
          <PoemsList feed={drafts} isDrafts={true} />
        </div>
      )}
    </div>
  );
};

export default DraftsPage;
