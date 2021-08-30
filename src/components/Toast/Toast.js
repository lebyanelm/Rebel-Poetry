import React from "react";
import PropTypes from "prop-types";
import styles from "./Toast.module.scss";

const Toast = ({ text, isShowClose, closeToast }) => (
  <div className={styles.Toast} data-testid="Toast">
    <span>{text}</span>
    {isShowClose && (
      <div className={styles.CloseButton} onClick={closeToast}>
        Close
      </div>
    )}
  </div>
);

export default Toast;
