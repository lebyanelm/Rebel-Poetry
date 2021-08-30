import React from "react";
import Toast from "../components/Toast/Toast";

// Toast Context
const ToastContext = React.createContext({});

// Toast Context Provider
const ToastContextProvider = ({ children }) => {
  const [toastText, setToastText] = React.useState(null);
  const [isShowClose, setIsShowClose] = React.useState(false);
  const showToast = (text, duration = 3000) => {
    setToastText(text);
    if (duration > 3000) {
      setIsShowClose(true);
      setToastText("Showing close button");
    }
    setTimeout(() => {
      setToastText(null);
      setIsShowClose(false);
    }, duration);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        isShowClose,
      }}
    >
      {children}
      {toastText && (
        <Toast
          text={toastText}
          isShowClose={isShowClose}
          closeToast={() => setToastText(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

// Toast Context Consumer
const useToast = () => {
  const context = React.useContext(ToastContext);
  return context;
};

export { ToastContextProvider, useToast, ToastContext };
