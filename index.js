'use strict';

const request = require('./request');
const stringify = require('querystring').stringify;

function api(method, params) {
  const qs = stringify(params);
  return request({
    host: 'api.instagram.com',
    path: `/v1/${method}?${qs}`
  });
}

module.exports = function fetch(token) {
  if (!token) {
    return Promise.reject(new Error('token is missing!'));
  }

  const params = {
    access_token: token,
  };

  return Promise.all([
    api('users/self', params),
    api('users/self/media/recent', params),
  ]).then(results => {
    const user = results[0];
    const media = results[1];
    return {
      name: user.data.username,
      followers: user.data.counts.followed_by,
      posts: user.data.counts.media,
      likes: media.data.reduce((likes, media) => likes + media.likes.count, 0),
      comments: media.data.reduce((comments, media) => comments + media.comments.count, 0),
    };
  });
};
