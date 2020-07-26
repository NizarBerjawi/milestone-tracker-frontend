import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteInterface, RouteComponentInterface } from '../../common/types';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute: React.FC = ({
  component: Component,
  ...rest
}: RouteInterface): React.ReactElement => {
  const { accessToken } = useAuth();

  const isAuthenticated = accessToken && localStorage.getItem('access_token');

  return (
    <Route
      {...rest}
      render={(props: RouteComponentInterface): React.ReactNode =>
        isAuthenticated ? (
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
};

export default PrivateRoute;
