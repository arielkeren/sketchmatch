"use client";

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "./Loading";

export const AuthContext = createContext({ username: "", photo: "" });

type Props = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState({ username: "", photo: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser({
        username: currentUser?.displayName ?? "",
        photo: currentUser?.photoURL ?? "",
      });
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  if (isLoading) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
