import Http from '../utils/Http';
import * as Transformer from '../utils/Transformer';
import { LoginCredentials, RegisterCredentials } from '../common/types';
import { Data } from '../utils/Transformer';

export type LoginResponse = Data & { accessToken: string };
export type LogoutResponse = Data & { message: string };
export type RegisterResponse = Data & { message: string };

const setToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

const clearToken = (): void => {
  localStorage.removeItem('access_token');
};

const register = (credentials: RegisterCredentials): Promise<object> =>
  new Promise((resolve, reject) =>
    Http.post('auth/register', Transformer.send(credentials))
      .then((res) => {
        const data = Transformer.fetch(res.data) as RegisterResponse;

        return resolve(data);
      })
      .catch((err) => {
        const { status: code } = err.response;

        const data = {
          message: err.response.data.message,
          errors: {},
          code,
        };

        data.message = err.response.data.message;

        if (code === 422) {
          data.errors = Transformer.errors(err.response.data.errors);
        }

        return reject(data);
      })
  );

/**
 *
 * @param credentials
 */
const login = (credentials: LoginCredentials): Promise<object> =>
  new Promise((resolve, reject) =>
    Http.post('auth/login', Transformer.send(credentials))
      .then((res) => {
        const data = Transformer.fetch(res.data) as LoginResponse;

        setToken(JSON.stringify(data.accessToken));

        if (data.accessToken) {
          Http.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.accessToken}`;
        }

        return resolve(data);
      })
      .catch((err) => {
        const { status: code } = err.response;

        const data = {
          message: err.response.data.message,
          errors: {},
          code,
        };

        data.message = err.response.data.message;

        if (code === 422) {
          data.errors = Transformer.errors(err.response.data.errors);
        }

        return reject(data);
      })
  );

const logout = (): Promise<object> =>
  new Promise((resolve) =>
    Http.post('auth/logout', Transformer.send({})).then((res) => {
      const data = Transformer.fetch(res.data) as LogoutResponse;

      clearToken();

      return resolve(data);
    })
  );

export { clearToken, login, logout, register };
