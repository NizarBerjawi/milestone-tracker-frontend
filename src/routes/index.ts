import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import { RouteInterface } from '../components/Router/PublicRoute';

const routes: Array<RouteInterface> = [
  {
    path: '/login',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    auth: false,
  },
  {
    path: '/',
    exact: true,
    component: Home,
    auth: false,
  },
];

export default routes;
