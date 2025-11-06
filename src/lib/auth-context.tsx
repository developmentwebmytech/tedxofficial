"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function refreshUser() {
  try {
    const res = await fetch("/api/user/me", {
      credentials: "include", // 👈 this line sends cookies!
    });

    if (!res.ok) {
      setUser(null);
      return;
    }

    const data = await res.json();
    setUser(data.user);
  } catch {
    setUser(null);
  }
}


  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
