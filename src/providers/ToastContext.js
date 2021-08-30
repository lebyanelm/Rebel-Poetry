import React from "react";

// Toast Context
const ToastContext = React.createContext({});

// Toast Context Provider
const ToastContextProvider = ({ children }) => {
  const [toastText, setToastText] = React.useState(null);
  const showToast = (text, duration = 3000) => {
    setToastText(text);
    setTimeout(() => setToastText(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastText && <div className="toast-container">{toastText}</div>}
    </ToastContext.Provider>
  );
};

// Toast Context Consumer
const useToast = () => {
  const context = React.useContext(ToastContext);
  return context;
};

export { ToastContextProvider, useToast, ToastContext };
