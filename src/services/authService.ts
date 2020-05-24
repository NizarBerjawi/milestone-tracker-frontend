import Http from '../utils/Http';

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const register = (credentials: Credentials): Promise<string> => {
  return Http.post('auth/register', credentials);
};

const isAuthenticated = false;

export { register, isAuthenticated };
