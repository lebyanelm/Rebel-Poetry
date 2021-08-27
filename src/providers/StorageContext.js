import React from "react";
import { Storage } from "../services/Storage";

// Storage Context
const StorageContext = React.createContext({});

// Storage Context Provider
const StorageContextProvider = ({ children }) => {
  const [userToken, setUserToken] = React.useState(
    localStorage.getItem("AUTH_TOKEN")
  );

  return (
    <StorageContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </StorageContext.Provider>
  );
};

// Storage Context Consumer
const useStorage = () => {
  const context = React.useContext(StorageContext);
  return context;
};

export { StorageContextProvider, useStorage, StorageContext };
