import * as React from 'react';
import { useContext } from 'react';

type AuthContextType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  accessToken: '',
  setAccessToken: () => ''
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

