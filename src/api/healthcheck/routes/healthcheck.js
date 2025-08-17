module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/healthcheck',
      handler: 'healthcheck.check',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 