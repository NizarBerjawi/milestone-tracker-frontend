import axios from 'axios';

const API_PREFIX = process.env.API_PREFIX;
const API_PORT = process.env.API_PORT;
const API_URL = process.env.API_URL;

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? `${API_URL}:${API_PORT}/${API_PREFIX}`
    : `${API_URL}/${API_PREFIX}`;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
