import React from "react";
import Loader from "../components/Loader/Loader";
import { useSession } from "../providers/SessionContext";

// Context
const LoaderContext = React.createContext({});

// Context Provider
const LoaderContextProvider = ({ children }) => {
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(true);

  return (
    <LoaderContext.Provider value={{ isLoaderVisible, setIsLoaderVisible }}>
      <div className="loader-container" data-isvisible={isLoaderVisible}>
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
