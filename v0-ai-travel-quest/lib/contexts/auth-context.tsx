'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading] = useState(false);

  const signUp = async (_email: string, _password: string) => {
    return { error: null };
  };

  const signIn = async (_email: string, _password: string) => {
    return { error: null };
  };

  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ user: null, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
