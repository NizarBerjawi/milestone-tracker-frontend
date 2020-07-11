import { RouteProps, RouteComponentProps } from 'react-router-dom';

/**
 *
 */
export interface RouteInterface extends RouteProps {
  auth?: boolean;
}

/**
 *
 */
export interface RouteComponentInterface extends RouteComponentProps {
  isAuthenticated?: boolean;
}

/**
 *
 */
export interface ValidationErrors {
  [key: string]: string[];
}

/**
 *
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 *
 */
export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
}
