'use strict';

module.exports = {
  routes: [
    { method: 'GET', path: '/posts', handler: 'post.find' },
    { method: 'GET', path: '/posts/:id', handler: 'post.findOne' },
  ],
};
