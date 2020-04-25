import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export interface RouteInterface extends RouteProps {
  auth?: boolean;
  isAuthenticated?: boolean;
}

const PublicRoute: React.FC = ({
  component: Component,
  ...rest
}: RouteInterface): React.ReactElement => (
  <Route
    {...rest}
    render={(props): React.ReactElement => <Component {...props} />}
  />
);

export default PublicRoute;
