import * as React from 'react';
import { RouteInterface, RouteComponentInterface } from '../../common/types';
import { Route } from 'react-router-dom';

const PublicRoute: React.FC = ({
  component: Component,
  ...rest
}: RouteInterface): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentInterface): React.ReactElement => (
        <Component {...props} />
      )}
    />
  );
};

export default PublicRoute;
