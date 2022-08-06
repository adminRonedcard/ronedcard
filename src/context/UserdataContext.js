import React, { useState, createContext } from "react";

export const UserdataContext = createContext();

export const UserdataStateProvider = (props) => {
  // eslint-disable-next-line
  const [userData, setUserData] = useState({});

  return (
    <UserdataContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserdataContext.Provider>
  );
};
