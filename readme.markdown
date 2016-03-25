# fetch-instagram-user [![Travis](https://img.shields.io/travis/purposeindustries/node-fetch-instagram-user.svg)]()

> fetch follower, media, like, comment counters for the `access_token` owner

## install

Install the [package](https://npmjs.com/package/fetch-instagram-user):

```sh
$ npm install fetch-instagram-user
```

## usage

Obtain `access_token` through the regular OAuth flow with `basic` permissions.

```js
const fetch = require('fetch-instagram-user');

fetch(access_token).then(stats => {
  console.log(stats);
  // { name: 'bence.danyi', followers: 50, posts: 251, likes: 268, comments: 6 }
});
```

## api

### `fetch(token)`

Fetch `followers` and `posts` counters, and `likes`, `comments` counters for the last 20 posts.

## license

MIT
