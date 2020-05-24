import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteInterface } from './PublicRoute';
import { authService } from '../../services';

const PrivateRoute: React.FC = ({
  component: Component,
  ...rest
}: RouteInterface): React.ReactElement => (
  <Route
    {...rest}
    render={(props): React.ReactElement =>
      authService.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
