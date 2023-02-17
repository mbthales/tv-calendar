import { createContext, useState } from "react";

type UserContextType = {
  userId: number | null;
  setUserId: (userId: number | null) => void;
};

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
