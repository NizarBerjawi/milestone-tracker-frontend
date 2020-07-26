import Http from '../utils/Http';
import * as Transformer from '../utils/Transformer';
import { UserInterface } from '../common/types';

const fetchUser = (): Promise<object> =>
  new Promise((resolve, reject) =>
    Http.post('auth/me')
      .then((res) => {
        const data = Transformer.fetch(res.data) as UserInterface;

        resolve(data);
      })
      .catch((err) => {
        if (!err.response) {
          return reject(err);
        }

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

export { fetchUser };
