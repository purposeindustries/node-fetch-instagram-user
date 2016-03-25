'use strict';

const fetch = require('./');

fetch(process.env.TOKEN).then(stats => {
  console.log(stats);
}).catch(err => {
  console.error(err.stack);
});
