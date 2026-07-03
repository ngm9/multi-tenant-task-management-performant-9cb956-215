import React, { useState, createContext, useContext } from 'react';
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {token, roles, email, tenantId}
  return (<AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>);
}
export function useAuth() { return useContext(AuthContext); }
