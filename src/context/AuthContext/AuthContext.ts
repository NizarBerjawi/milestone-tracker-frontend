import * as React from 'react';
import { useContext } from 'react';
import { UserInterface } from '../../common/types';

type AuthContextType = {
  user: UserInterface;
  accessToken: string;
  setAccessToken: (token: string) => void;
  setUser: (user: UserInterface) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: {
    email: '',
    profile: {
      firstName: '',
      lastName: ''
    }
  },
  accessToken: '',
  setAccessToken: () => null,
  setUser: () => null
});

export const useAuth = (): AuthContextType => useContext(AuthContext);
