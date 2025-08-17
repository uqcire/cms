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
          [contentType]: {
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
    
    // Log the current permissions for debugging
    console.log('🔍 Current permissions:', JSON.stringify(permissions, null, 2));
  } else {
    console.log('❌ Public role not found');
  }
}; 