import * as Humps from 'humps';

export type Data = object[] | object;

const send = (data: Data): Data => Humps.decamelizeKeys(data);

const fetch = (data: Data): Data => Humps.camelizeKeys(data);

export { fetch, send };
