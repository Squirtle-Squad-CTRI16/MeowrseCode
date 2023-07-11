import React, { createContext, useState, ReactNode } from 'react';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');

  const contextProps = {
    username, 
    setUsername
  }
  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  )
}