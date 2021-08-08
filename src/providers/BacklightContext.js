import React from "react";

// Session Context
const BacklightContext = React.createContext({});

// Session Context Provider
const BacklightContextProvider = ({ children }) => {
  const [isBacklightVisible, setIsBacklightVisible] = React.useState({
    state: false,
    handler: () => null,
  });

  return (
    <>
      <div
        className="backlight"
        style={{ display: isBacklightVisible.state ? "block" : "none" }}
        onClick={() => {
          setIsBacklightVisible({ state: false, handler: () => null });
          isBacklightVisible.handler();
        }}
      ></div>
      <BacklightContext.Provider
        value={{ isBacklightVisible, setIsBacklightVisible }}
      >
        {children}
      </BacklightContext.Provider>
    </>
  );
};

// Session Context Consumer
const useBacklight = () => {
  const context = React.useContext(BacklightContext);
  return context;
};

export { BacklightContextProvider, useBacklight, BacklightContext };
