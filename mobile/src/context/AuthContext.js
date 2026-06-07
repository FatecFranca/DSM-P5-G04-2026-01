import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  loadStoredUser,
  saveStoredUser,
  clearStoredUser,
} from "../utils/storage";

export const AuthContext =
  createContext({});

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const storedUser =
        await loadStoredUser();

      if (storedUser) {
        setUser(storedUser);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signIn(userData) {
    await saveStoredUser(userData);

    setUser(userData);
  }

  async function signOut() {
    await clearStoredUser();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}