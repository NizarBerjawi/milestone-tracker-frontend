import Login from '../pages/login';
import Home from '../pages/home';
import Register from '../pages/register';
import { RouteInterface } from '../components/router/PublicRoute';

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
    auth: true,
  },
  {
    path: '/',
    exact: true,
    component: Home,
    auth: false,
  },
];

export default routes;
