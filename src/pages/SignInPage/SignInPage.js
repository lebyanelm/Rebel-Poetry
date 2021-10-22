import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as superagent from "superagent";
import config from "../../config";
import { useSession } from "../../providers/SessionContext";
import { useStorage } from "../../providers/StorageContext";
import { Storage } from "../../services/Storage";

const SignInPage = () => {
  // Response error
  const [responseError, setResponseError] = React.useState("");
  const { setUserSession } = useSession();
  const { setUserToken } = useStorage();
  const [signInData, setSignInData] = React.useState({
    username: "",
    password: "",
  });
  const router = useHistory();

  const onInputKeyup = (event) => {
    if (event.target.name) {
      setSignInData({ ...signInData, [event.target.name]: event.target.value });
    }
  };

  // Form submit
  const onFormSubmit = (event) => {
    event.preventDefault();

    setResponseError("");
    // Turn the credentials into Basic authentication
    if (signInData.username && signInData.password) {
      const credentialsData = [
        "Basic",
        btoa([signInData.username, signInData.password].join(":")),
      ].join(" ");

      // Send the authentication request
      superagent
        .get([config.BACKEND, "rebbels/authentication"].join("/"))
        .set("Authorization", credentialsData)
        .end((_, response) => {
          if (response) {
            alert(response.statusCode);
            if (response.statusCode === 200) {
              // Set the token to be saved
              Storage.set("AUTH_TOKEN", response.body.data.token);
              setUserSession(response.body.data);
              setUserToken(response.body.data.token);
              router.push("/");
            } else {
              setResponseError(
                response.body.reason ||
                  "Something went wrong. Please try again, contact us if error persists."
              );
            }
          } else {
            // TODO: Show a modal error
            setResponseError(
              "No internet, please check your connection and try again."
            );
          }
        });
    } else {
      setResponseError(
        "All fields are required. Please make sure they are all filled."
      );
    }
  };

  return (
    <React.Fragment>
      <div className="page-container">
        <form action="" className="form" onSubmit={onFormSubmit}>
          <h1>Login</h1>
          {responseError && <p className="danger">{responseError}</p>}
          <input
            type="text"
            placeholder="Your email or username"
            name="username"
            onKeyUp={onInputKeyup}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onKeyUp={onInputKeyup}
          />

          <button>Sign In to your Account</button>

          <p>
            By signing in you agree to out{" "}
            <Link to="">Terms and Conditions</Link>. If you don't have an
            account you can <Link to="/sign_up">create one here.</Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
