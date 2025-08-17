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
  // Suppress warnings in development
  logger: {
    level: 'error',
    requests: false,
    errors: true,
  },
}); 