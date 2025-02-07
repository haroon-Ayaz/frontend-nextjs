"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "");
    setEmail(localStorage.getItem("userEmail") || "");
    setFname(localStorage.getItem("fname") || "");
  }, []);

  return (
    <UserContext.Provider value={{ role, email, fname }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}