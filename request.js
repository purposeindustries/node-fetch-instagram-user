'use strict';

const https = require('https');

module.exports = function request(params) {
  return new Promise((resolve, reject) => {
    https.get(params, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.once('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
      res.once('error', err => reject(err));
    }).once('error', err => reject(err));
  });
};
