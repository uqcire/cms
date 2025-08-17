module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          'style-src': ["'self'", "'unsafe-inline'"],
          'frame-src': ["'self'"],
          'object-src': ["'none'"],
          upgradeInsecureRequests: null,
        },
      },
      // Development-friendly security headers
      frameguard: false,
      hsts: false, // Disabled in development
      xssFilter: true,
      poweredBy: false,
    },
  },
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8800', 'http://localhost:8801', 'https://dflm.com.au', 'https://*.onrender.com'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    }
  },
  'strapi::poweredBy',
  {
    name: 'strapi::logger',
    config: {
      level: 'debug', // More verbose in development
      requests: true,
      errors: true,
    },
  },
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '10mb',
      jsonLimit: '10mb',
      textLimit: '10mb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx'],
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]; 