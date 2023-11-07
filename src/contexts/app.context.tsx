import { createContext, useState } from "react";
import { getAccesTokenToFromLS, getProfileFromLS } from "../utils/auth";
import { User } from "../types/user.type";

interface AppContextInterFace {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null
  setProfile:React.Dispatch<React.SetStateAction<User | null>>
}

const initiaAppContext: AppContextInterFace = {
  isAuthenticated: Boolean(getAccesTokenToFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
};

export const AppContext = createContext<AppContextInterFace>(initiaAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initiaAppContext.isAuthenticated
  );
  const [profile,setProfile] = useState<User | null>(initiaAppContext.profile)
  
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
