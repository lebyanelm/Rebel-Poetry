import React, { useEffect, useState } from "react";
import styles from "./SignUpPage.module.scss";
import * as superagent from "superagent";
import { Storage } from "../../services/Storage";
import { useSession } from "../../providers/SessionContext";
import { Link, useHistory } from "react-router-dom";

const SignUpPage = () => {
  const { userSession, setUserSession } = useSession();
  const router = useHistory();

  useEffect(() => {
    document.title = [process.env.REACT_APP_NAME, "Create an account"].join(
      ": "
    );
  }, []);

  const [requestData, setRequestData] = useState({
    email_address: "",
    display_name: "",
    password: "",
  });

  // When an error occurs while trying to create an account
  const [responseError, setResponseError] = useState("");

  const onInputKeyup = (event) => {
    if (event.target.name) {
      setRequestData({
        ...requestData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    // Reset the response error text
    setResponseError("");

    // Make sure the user has entered important information to create the account
    if (
      requestData.email_address &&
      requestData.display_name &&
      requestData.password
    ) {
      // Send an account create request to the backend
      superagent
        .post([process.env.REACT_APP_API_ENDPOINT, "accounts"].join("/"))
        .send(requestData)
        .end((_, response) => {
          if (response) {
            if (response.statusCode === 200) {
              Storage.set("AUTH_TOKEN", response.body.data.token);
              setUserSession(response.body.data);
              router.push("/");
              // TODO: Show a welcome modal
            } else {
              // Means the account already exists
              if (response.statusCode === 208) {
                setResponseError(
                  `Account with that email address already exists. Please sign in if this is your account.`
                );
              }
            }
          } else {
            setResponseError(
              "You are not connected to the internet. Please check your connection and try again."
            );
          }
        });
    } else {
      // Let the user know the form is incomplete
      setResponseError(
        "All fields are mandatory, please make sure you fill every field to create an account."
      );
    }
  };

  return (
    <>
      <div className="page-container">
        <form onSubmit={onFormSubmit} className="form">
          <h1>Sign Up</h1>

          {responseError ? (
            <p className={[styles.ResponseError, "danger"].join(" ")}>
              {" "}
              <b>{responseError}</b>{" "}
            </p>
          ) : (
            ""
          )}

          <input
            type="text"
            placeholder="Email Address"
            name="email_address"
            onKeyUp={onInputKeyup}
          />
          <input
            type="text"
            placeholder="Your Name"
            name="display_name"
            onKeyUp={onInputKeyup}
          />
          <input
            type="password"
            placeholder="Enter a password"
            name="password"
            onKeyUp={onInputKeyup}
          />
          <button type="submit">Become a Member</button>

          <p>
            We are glad to have you onboard, by creating an account you agree to
            our <Link to="">Terms and Conditions</Link>. If you are already a
            member you can <Link to="/sign_in">Sign in to your account.</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
