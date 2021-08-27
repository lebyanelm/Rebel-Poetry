import React from "react";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";
import { useBacklight } from "../../providers/BacklightContext";

const AccountDropdownOptions = ({ userSession, location }) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const { setIsBacklightVisible } = useBacklight();

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
          <section onClick={() => toggleOptions()}>
            <div
              className="avatar small-avatar"
              style={{
                marginRight: "5px",
                backgroundImage: `url(${userSession.display_photo})`,
              }}
            ></div>
            <span>{userSession?.display_name}</span>
            <IonIcon
              style={{ marginLeft: "5px", transform: "translateY(2px)" }}
              name="chevron-down"
            ></IonIcon>
          </section>

          <div
            className="dropdown-options"
            style={{ display: isOptionsOpen ? "block" : "none" }}
          >
            <section>
              <Link to="/poet/me">
                Signed in as <b>{userSession?.display_name}</b>
              </Link>
            </section>
            <section>
              <Link to="/poet/me">Your Public Poems</Link>
              <Link to="">Your Anonymous Poems</Link>
              <Link to="">Your Bookmarked poems</Link>
              <Link to="">Your Collaborations and Features</Link>
              <Link to="">Your Unpublished Drafts</Link>
              <Link to="">Your Notifications</Link>
            </section>
            <section>
              <Link className="" to="">
                Edit your profile
              </Link>
              <Link className="danger" to="">
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
