import React from "react";

// Session Context
const SessionContext = React.createContext({});

// Session Context Provider
const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = React.useState(null);

  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </SessionContext.Provider>
  );
};

// Session Context Consumer
const useSession = () => {
  const context = React.useContext(SessionContext);
  return context;
};

export { SessionContextProvider, useSession, SessionContext };
