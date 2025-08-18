'use strict';

module.exports = async ({ strapi }) => {
  console.log('🚀 Bootstrap starting...');

  // Set up webhook event listeners for content publish/unpublish
  try {
    const webhookService = strapi.service('api::webhook.webhook');
    
    if (webhookService) {
      // Define content types for webhook events (blog only)
      const webhookContentTypes = [
        'api::post.post',
        'api::category.category',
        'api::tag.tag',
      ];

      // Listen for entry publish events
      strapi.db.lifecycles.subscribe({
        models: webhookContentTypes,
        event: 'afterUpdate',
        async handler(event) {
          const { result, params } = event;
          
          // Check if the entry was published or unpublished
          const wasPublished = result.publishedAt !== null;
          const wasUnpublished = params.data.publishedAt === null;
          
          if (wasPublished) {
            await webhookService.onEntryPublish(result);
          } else if (wasUnpublished) {
            await webhookService.onEntryUnpublish(result);
          }
        },
      });

      console.log('✅ Webhook event listeners configured successfully');
    } else {
      console.log('⚠️ Webhook service not found, skipping webhook configuration');
    }
  } catch (error) {
    console.log('⚠️ Could not configure webhooks:', error.message);
  }

  console.log('✅ Bootstrap completed');
  console.log('💡 Note: You may need to manually set public permissions in the admin panel');
  console.log('   Go to Settings → Users & Permissions Plugin → Roles → Public');
}; 