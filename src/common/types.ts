import { RouteProps, RouteComponentProps } from 'react-router-dom';

export type ResponseWithoutMessage<P> = { data: P };
export type ResponseWithMessage<P> = { data: P } & { message: string };

export interface RouteInterface extends RouteProps {
  auth?: boolean;
}

export interface RouteComponentInterface extends RouteComponentProps {
  isAuthenticated?: boolean;
}

export interface ValidationErrors {
  [key: string]: string[];
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
}

export interface UserInterface {
  email: string;
  profile?: PersonalDetails;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
}
