import Http from '../utils/Http';
import * as Transformer from '../utils/Transformer';
import { PersonalDetails } from '../common/types';

const postProfile = (profile: PersonalDetails): Promise<object> =>
  new Promise((resolve, reject) =>
    Http.post('/profiles', Transformer.send(profile))
      .then((res) => {
        const data = Transformer.fetch(res.data);

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

export { postProfile };
