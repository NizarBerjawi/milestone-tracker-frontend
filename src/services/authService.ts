import Http from '../utils/Http';
import * as Transformer from '../utils/Transformer';
import { LoginCredentials, RegisterCredentials } from '../common/types';
import { Data } from '../utils/Transformer';

export type LoginResponse = Data & { accessToken: string };

const register = (credentials: RegisterCredentials): PromiseLike<object> =>
  new Promise((resolve) =>
    Http.post('auth/register', Transformer.send(credentials)).then((res) => {
      const data = Transformer.fetch(res.data);
      return resolve(data);
    })
  );

const login = (credentials: LoginCredentials): PromiseLike<object> =>
  new Promise((resolve) =>
    Http.post('auth/login', Transformer.send(credentials)).then((res) => {
      const data = Transformer.fetch(res.data) as LoginResponse;

      localStorage.setItem('access_token', JSON.stringify(data.accessToken));

      if (data.accessToken) {
        Http.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.accessToken}`;
      }

      return resolve(data);
    })
  );

export { login, register };
