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
              <span to="/poet/me">
                Signed in as{" "}
                <b>
                  {userSession?.display_name} ({userSession?.username})
                </b>
              </span>
            </section>
            <section>
              <Link to={["/rebbels/@", userSession?.username].join("")}>
                Your Profile
              </Link>
              <Link to="/collaborations">Your Collaborations and Features</Link>
              <Link to="/your_drafts">Your Unpublished Drafts</Link>
            </section>
            <section>
              <Link className="" to="/edit_profile">
                Edit your profile
              </Link>
              <Link className="danger" to="/sign_out">
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
