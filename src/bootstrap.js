'use strict';

module.exports = async ({ strapi }) => {
  // Set up default permissions for public role
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (publicRole) {
    // Define content types that should be publicly accessible
    const contentTypes = [
      'api::page.page',
      'api::service.service',
      'api::product.product',
      'api::industry.industry',
      'api::certification.certification',
      'api::partner.partner',
      'api::post.post',
      'api::category.category',
      'api::tag.tag',
    ];

    // Set permissions for each content type
    const permissions = {};
    
    contentTypes.forEach(contentType => {
      permissions[contentType] = {
        controllers: {
          'api::page.page': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::service.service': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::product.product': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::industry.industry': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::certification.certification': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::partner.partner': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::post.post': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::category.category': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
          'api::tag.tag': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' },
          },
        },
      };
    });

    // Update the public role with permissions
    await strapi
      .query('plugin::users-permissions.role')
      .update({
        where: { id: publicRole.id },
        data: {
          ...publicRole,
          permissions,
        },
      });

    console.log('✅ Public role permissions configured successfully');
  }
}; 