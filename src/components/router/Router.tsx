import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PublicRoute, { RouteInterface } from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routes from '../../routes';

const MyRouter: React.FC = (): React.ReactElement => (
  <Router>
    <Switch>
      {routes.map(({ auth, ...rest }: RouteInterface, i) =>
        auth ? (
          <PrivateRoute key={i} {...rest} />
        ) : (
          <PublicRoute key={i} {...rest} />
        )
      )}
    </Switch>
  </Router>
);

export default MyRouter;
