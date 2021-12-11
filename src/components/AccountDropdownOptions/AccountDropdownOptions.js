import React from "react";
import IonIcon from "@reacticons/ionicons";
import { Link, useHistory } from "react-router-dom";
import { useBacklight } from "../../providers/BacklightContext";
import { useSession } from "../../providers/SessionContext";
import styles from "./AccountDropdownOptions.module.scss";

const AccountDropdownOptions = ({ userSession, location }) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const { setIsBacklightVisible } = useBacklight();

  const { setUserSession } = useSession();

  const history = useHistory();

  const showOptions = () => setIsOptionsOpen(true);
  const hideOptions = () => setIsOptionsOpen(false);
  const toggleOptions = () => {
    if (isOptionsOpen) hideOptions();
    else showOptions();
    setIsBacklightVisible({
      state: !isOptionsOpen,
      handler: () => {
        setIsOptionsOpen(false);
      },
    });
  };

  return (
    <>
      <div className="dropdown-options-backlight"></div>
      <div className="clickable">
        <div
          className={[
            "navigation-item dropdown flex",
            location.pathname === "/sign_in" || location.pathname === "/sign_up"
              ? "active"
              : "inactive",
          ].join(" ")}
        >
          <section onClick={() => toggleOptions()} className={styles.HeaderSectionName}>
            <div
              className="avatar small-avatar"
              style={{
                marginRight: "5px",
                backgroundImage: `url(${userSession.display_photo})`,
              }}
            ></div>
            <span className={styles.RebbelName}>{userSession?.display_name} <span className={styles.RebbelStatus} data-belt=""></span></span>
            <IonIcon
              style={{ marginLeft: "5px", transform: "translateY(0px)" }}
              name="chevron-down"
            ></IonIcon>
          </section>

          <div
            className="dropdown-options"
            style={{ display: isOptionsOpen ? "block" : "none" }}
          >
            <section className={styles.DropdownItemsHeader}>
              <span to="/poet/me">
                Signed in as{" "}
                <b>
                  {userSession?.display_name} (@{userSession?.username})
                </b>
              </span>
            </section>
            <section className={styles.DropdownLinkItems}>
              <a href={["/rebbels/@", userSession?.username].join("")}>
                Your Profile
              </a>
              <a href="/collaborations">Your Collaborations and Features</a>
              <a href="/your_drafts">Your Unpublished Drafts</a>
            </section>
            <section className={styles.DropdownLinkItems}>
              <Link className="" to="/edit_profile">
                Edit your profile
              </Link>
              <Link className={styles.SignOut} onClick={() => {
                // Set the session to be null and log the user out
                setUserSession(null);
                // Also remove the local storage data session token
                localStorage.removeItem("AUTH_TOKEN");
                // Route the user to a sign in page
                history.push("/sign_in");
              }}>
                Sign out
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

AccountDropdownOptions.propTypes = {};

AccountDropdownOptions.defaultProps = {};

export default AccountDropdownOptions;
