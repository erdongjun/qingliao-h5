import 'babel-polyfill';

import 'fetch-detector';

import 'fetch-ie8';

import checkType from './checkType';

require('es6-promise').polyfill();

export const POST = 'POST';

export default ({
  endpoint,
  data = {},
  method = POST,
} = {}) => {
  if (!endpoint) {
    throw new Error('{endpoint} must be specified.');
  }
  if (!checkType(data, 'Object')) {
    throw new Error('{data} must be a Object.');
  }
  const formData = new FormData();
  formData.append('file', data.files[data.index].file);
  formData.append('index', data.index);
  const fetchOpts = {
    method,
    headers: {
    },
    credentials: 'same-origin',
    body: formData,
  };

  return new Promise((resolve, reject) => {
    fetch(endpoint, fetchOpts)
      .then(res => res.json())
      .then(resolve)
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
