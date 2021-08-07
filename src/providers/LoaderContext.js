import React from "react";
import Loader from "../components/Loader/Loader";

// Context
const LoaderContext = React.createContext({});

// Context Provider
const LoaderContextProvider = ({ children }) => {
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(null);

  return (
    <LoaderContext.Provider value={{ isLoaderVisible, setIsLoaderVisible }}>
      <div className="loader-container" data-isVisible={isLoaderVisible}>
        <Loader></Loader>
      </div>
      {children}
    </LoaderContext.Provider>
  );
};

// Consumer
const useLoaderState = () => {
  const context = React.useContext(LoaderContext);
  return context;
};

export { LoaderContext, LoaderContextProvider, useLoaderState };
