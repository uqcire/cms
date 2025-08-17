// @ts-ignore
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::webhook.webhook', ({ strapi }) => ({
  /**
   * Test webhook endpoint
   * @param {Object} ctx - Koa context
   */
  async test(ctx) {
    try {
      const webhookService = strapi.service('api::webhook.webhook');
      await webhookService.triggerVercelDeployment('test', {
        contentType: 'test',
        id: 'test',
        title: 'Test Webhook',
      });
      
      ctx.send({
        message: 'Webhook test triggered successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      ctx.throw(500, 'Failed to test webhook');
    }
  },

  /**
   * Get webhook configuration
   * @param {Object} ctx - Koa context
   */
  async config(ctx) {
    const config = {
      vercelDeployHook: !!strapi.config.get('plugin.webhook.config.vercelDeployHook'),
      events: strapi.config.get('plugin.webhook.config.events', []),
      contentTypes: strapi.config.get('plugin.webhook.config.contentTypes', []),
    };
    
    ctx.send(config);
  },
})); 