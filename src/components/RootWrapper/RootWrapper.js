import React from "react";
import PropTypes from "prop-types";
import styles from "./RootWrapper.module.scss";
import { useSession } from "../../providers/SessionContext";
import { useHistory } from "react-router-dom";
import * as superagent from "superagent";
import { Storage } from "../../services/Storage";
import { useLoaderState } from "../../providers/LoaderContext";

const RootWrapper = ({ children }) => {
  const { setUserSession } = useSession();
  const { setIsLoaderVisible } = useLoaderState();
  const router = useHistory();

  // On App startup, request the data of the user from the backend
  React.useEffect(() => {
    // Check if there is a session token available
    Storage.get("AUTH_TOKEN").then((sessionToken) => {
      if (sessionToken) {
        // Send a get data request to the backend
        superagent
          .get([process.env.REACT_APP_API_ENDPOINT, "@"].join("/"))
          .set("Authorization", sessionToken)
          .end((_, response) => {
            // At first the loader will be shown for the page to fully load, hide it after page has fully loaded
            setIsLoaderVisible(false);

            if (response) {
              if (response.statusCode === 200) {
                setUserSession(response.body.data);
              } else {
                if (response.statusCode === 404) {
                  console.log("Not found.");
                } else if (response.statusCode === 403) {
                  console.log("Unauthorized.");
                } else if (response.statusCode === 510) {
                  console.log("Session expired.");
                } else {
                  console.log("Something went wrong.");
                }

                // Remove the session token from the storage
                Storage.remove("AUTH_TOKEN");

                console.log("Restart.");
                // Take the user to a user sign in page to re-authenticate them
                router.push("/sign_in");
              }
            } else {
              // TODO: Show a toast error
            }
          });
      }
    });
  }, []);

  return <>{children}</>;
};

RootWrapper.propTypes = {};

RootWrapper.defaultProps = {};

export default RootWrapper;
