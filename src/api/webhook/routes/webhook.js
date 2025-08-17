module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/webhooks/test',
      handler: 'webhook.test',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/webhooks/config',
      handler: 'webhook.config',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 