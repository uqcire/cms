// @ts-ignore
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::healthcheck.healthcheck', ({ strapi }) => ({
  async check(ctx) {
    try {
      // Basic health check
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: strapi.config.get('info.version', 'unknown'),
      };

      ctx.send(health);
    } catch (error) {
      ctx.throw(500, 'Health check failed');
    }
  },
})); 