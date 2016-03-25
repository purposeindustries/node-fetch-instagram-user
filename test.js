const test = require('tape');
const proxy = require('proxyquire');

test('needs token', t => {
  fetch = proxy('./', {});
  fetch().catch(err => {
    t.pass('throwed when token was missing');
    t.end();
  });
});
test('should work', t => {
  const fetch = proxy('./', {
    './request': params => {
      t.equal(params.host, 'api.instagram.com', 'host is ok');
      if (params.path == '/v1/users/self?access_token=1234') {
        return Promise.resolve({
          data: {
            counts: {
              followed_by: 1337,
              media: 666,
            }
          }
        });
      }
      if (params.path == '/v1/users/self/media/recent?access_token=1234') {
        return Promise.resolve({
          data: [{
            likes: { count: 1 },
            comments: { count: 10 },
          }, {
            likes: { count: 2 },
            comments: { count: 20 },
          }, {
            likes: { count: 3 },
            comments: { count: 30 },
          }],
        });
      }
      t.fail('unexpected api call: ' + params.path);
    },
  });

  fetch('1234').then(stats => {
    t.equal(stats.followers, 1337, 'follower count match');
    t.equal(stats.posts, 666, 'post count match');
    t.equal(stats.likes, 6, 'like count match');
    t.equal(stats.comments, 60, 'comment count match');
    t.end();
  });
});
