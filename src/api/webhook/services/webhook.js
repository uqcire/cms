// @ts-ignore
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::webhook.webhook', ({ strapi }) => ({
  /**
   * Trigger Vercel deployment via webhook
   * @param {string} event - The event that triggered the webhook
   * @param {Object} data - The data associated with the event
   */
  async triggerVercelDeployment(event, data) {
    const vercelDeployHook = strapi.config.get('plugin.webhook.config.vercelDeployHook');
    
    if (!vercelDeployHook) {
      strapi.log.warn('VERCEL_DEPLOY_HOOK_URL not configured, skipping deployment trigger');
      return;
    }

    try {
      // Check if the content type should trigger a rebuild
      const contentTypes = strapi.config.get('plugin.webhook.config.contentTypes', []);
      const contentType = data?.contentType || data?.model;
      
      if (!contentTypes.includes(contentType)) {
        strapi.log.info(`Content type ${contentType} not configured for webhook triggers`);
        return;
      }

      // Trigger Vercel deployment
      const response = await fetch(vercelDeployHook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          contentType,
          timestamp: new Date().toISOString(),
          data: {
            id: data?.id,
            slug: data?.slug,
            title: data?.title || data?.name,
          },
        }),
      });

      if (response.ok) {
        strapi.log.info(`Vercel deployment triggered successfully for ${event} on ${contentType}`);
      } else {
        strapi.log.error(`Failed to trigger Vercel deployment: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      strapi.log.error('Error triggering Vercel deployment:', error);
    }
  },

  /**
   * Handle entry publish events
   * @param {Object} data - The published entry data
   */
  async onEntryPublish(data) {
    await this.triggerVercelDeployment('entry.publish', data);
  },

  /**
   * Handle entry unpublish events
   * @param {Object} data - The unpublished entry data
   */
  async onEntryUnpublish(data) {
    await this.triggerVercelDeployment('entry.unpublish', data);
  },
})); 