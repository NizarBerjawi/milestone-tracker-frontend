import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import { RouteInterface } from '../common/types';
import Projects from '../pages/Projects';
import Profile from '../pages/Profile';
import ResendVerification from '../pages/ResendVerification';

const routes: Array<RouteInterface> = [
  {
    path: '/',
    exact: true,
    component: Home,
    auth: false,
  },
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
    path: '/verify/send',
    exact: true,
    component: ResendVerification,
    auth: false,
  },
  {
    path: '/verify',
    exact: true,
    component: Verify,
    auth: false,
  },
  {
    path: '/projects',
    exact: true,
    component: Projects,
    auth: true,
  },
  {
    path: '/profiles/create',
    exact: true,
    component: Profile,
    auth: true,
  },
];

export default routes;
