import { camelizeKeys, decamelizeKeys } from 'humps';

export type Data = object[] | object;

const send = (data: Data): Data => decamelizeKeys(data);

const fetch = (data: Data): Data => camelizeKeys(data);

const errors = (data: Data): Data => camelizeKeys(data);

export { errors, fetch, send };
