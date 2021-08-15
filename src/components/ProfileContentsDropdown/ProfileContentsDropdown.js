import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileContentsDropdown.module.scss";
import IonIcon from "@reacticons/ionicons";

const ProfileContentsDropdown = ({ name, children }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const toggle = () => setIsOpened(!isOpened);

  return (
    <div className={styles.ProfileContentsDropdown}>
      <div className={styles.DropdownHeader} onClick={toggle}>
        {!isOpened && <IonIcon name="chevron-forward-outline"></IonIcon>}
        {isOpened && <IonIcon name="chevron-down-outline"></IonIcon>}
        <span>{name}</span>
      </div>
      {isOpened && <div className={styles.DropdownContents}>{children}</div>}
    </div>
  );
};

ProfileContentsDropdown.propTypes = {};

ProfileContentsDropdown.defaultProps = {};

export default ProfileContentsDropdown;
