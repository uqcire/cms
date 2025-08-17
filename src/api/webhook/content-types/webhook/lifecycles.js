module.exports = {
  beforeCreate(event) {
    // Validate webhook configuration
    const { data } = event.params;
    
    if (!data.url) {
      throw new Error('Webhook URL is required');
    }
    
    if (!data.events || data.events.length === 0) {
      throw new Error('At least one event must be specified');
    }
  },

  afterCreate(event) {
    // Log webhook creation
    strapi.log.info(`Webhook created: ${event.result.name}`);
  },

  afterUpdate(event) {
    // Log webhook update
    strapi.log.info(`Webhook updated: ${event.result.name}`);
  },

  afterDelete(event) {
    // Log webhook deletion
    strapi.log.info(`Webhook deleted: ${event.result.name}`);
  },
}; 