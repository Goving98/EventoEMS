/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make sure we fetch the user data only if the user state is not set yet
    if (user === null) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [user]); // Dependency on `user` so it only runs once when the user is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
