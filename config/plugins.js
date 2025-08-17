module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase',
      providerOptions: {
        apiUrl: env('SUPABASE_URL'),
        apiKey: env('SUPABASE_SERVICE_ROLE_KEY'),
        bucket: env('SUPABASE_BUCKET', 'uploads'),
        directory: env('SUPABASE_DIRECTORY', ''),
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  // Webhook configuration for Vercel deployments
  webhook: {
    config: {
      // Vercel Deploy Hook URL - set this in your environment variables
      vercelDeployHook: env('VERCEL_DEPLOY_HOOK_URL'),
      // Webhook events to trigger deployments
      events: ['entry.publish', 'entry.unpublish'],
      // Content types that should trigger rebuilds
      contentTypes: [
        'api::page.page',
        'api::service.service',
        'api::product.product',
        'api::industry.industry',
        'api::certification.certification',
        'api::partner.partner',
        'api::post.post',
        'api::category.category',
        'api::tag.tag',
      ],
    },
  },
  // Suppress upload provider warnings
  logger: {
    level: 'error',
    requests: false,
    errors: true,
  },
});
