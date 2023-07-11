import React, { createContext, useState, ReactNode } from 'react';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState('');

  const contextProps = {
    userName, 
    setUserName
  }
  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  )
}