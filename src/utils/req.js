import 'babel-polyfill';

import 'fetch-detector';

import 'fetch-ie8';

import checkType from './checkType';
import obj2qs from './obj2qs';

require('es6-promise').polyfill();

export const GET = 'GET';
export const POST = 'POST';

export default ({
  endpoint,
  method = GET,
  data = {},
} = {}) => {
  if (!endpoint) {
    throw new Error('{endpoint} must be specified.');
  }

  if (!([GET, POST].includes(method))) {
    throw new Error(`{method} must be ${GET} or ${POST}.`);
  }

  if (!checkType(data, 'Object')) {
    throw new Error('{data} must be a Object.');
  }
  let url = endpoint;

  const fetchOpts = {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  if (method === GET) {
    const querystring = obj2qs(data);
    if (querystring) {
      url = `${endpoint}?${querystring}`;
    }
  } else {
    fetchOpts.body = JSON.stringify(data);
  }
  return new Promise((resolve, reject) => {
    fetch(url, fetchOpts)
      .then(res => res.json())
      .then(resolve)
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
