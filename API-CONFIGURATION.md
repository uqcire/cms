# Strapi v5 API Configuration Guide (Blog-Only)

This document outlines the updated API configuration for E-Sunrise Australia Blog CMS using Strapi v5.21.0.

## Overview

The API configuration has been optimized for blog-only content management with:
- REST API configuration for blog content (posts, categories, tags)
- GraphQL support for blog queries
- Rate limiting and security optimized for blog usage
- Performance optimization for blog content delivery
- CORS and middleware configuration for blog API

## Configuration Files

### 1. API Configuration (`config/api.js`)

The main API configuration file includes:

#### REST API Settings
```javascript
rest: {
  defaultLimit: 25,
  maxLimit: 100,
  withCount: true,
  prefix: '/api',
  defaultSortBy: 'createdAt',
  defaultSortOrder: 'desc',
}
```

#### GraphQL Configuration
```javascript
graphql: {
  enabled: true,
  config: {
    defaultLimit: 25,
    maxLimit: 100,
    apolloServer: {
      tracing: false,
      introspection: true,
      playground: true,
    },
  },
}
```

#### Rate Limiting
```javascript
rateLimit: {
  enabled: true,
  interval: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per interval
  timeWait: 3 * 60 * 1000, // 3 minutes wait time
}
```

#### Security Features
- API token validation
- Request validation
- CORS configuration
- Content Security Policy (CSP)

#### Performance Features
- Response compression
- Caching headers
- Image optimization
- Query optimization

### 2. Middleware Configuration

#### Main Middlewares (`config/middlewares.js`)
- Enhanced security headers
- CORS configuration
- Rate limiting
- Compression
- Response time tracking
- Logging configuration

#### Environment-Specific Middlewares

**Development (`config/env/development/middlewares.js`)**
- More verbose logging (debug level)
- Higher rate limits (1000 requests)
- Development-friendly security settings
- Lower slow query threshold (500ms)

**Production (`config/env/production/middlewares.js`)**
- Minimal logging (warn level)
- Standard rate limits (100 requests)
- Strict security settings
- Higher slow query threshold (2000ms)

## Key Features

### 1. Rate Limiting
- **Development**: 1000 requests per 15 minutes
- **Production**: 100 requests per 15 minutes
- Configurable wait times and retry logic
- IP-based rate limiting

### 2. Security Enhancements
- Content Security Policy (CSP) headers
- XSS protection
- HSTS headers (production only)
- CORS configuration with credentials support
- API token validation

### 3. Performance Optimization
- Response compression (gzip)
- Image optimization (WebP, AVIF)
- Query optimization with population depth limits
- Caching headers
- Response time tracking

### 4. Logging and Monitoring
- Request/response logging
- Error tracking
- Slow query detection
- Performance metrics

### 5. File Upload Configuration
- Maximum file size: 10MB
- Supported formats: images, videos, PDFs, documents
- Image optimization enabled

## API Endpoints

### REST API
- Base URL: `/api`
- Default pagination: 25 items per page
- Maximum pagination: 100 items per page
- Sorting: `createdAt:desc` by default

### GraphQL
- Endpoint: `/graphql`
- Playground: `/graphql` (development)
- Introspection: enabled
- Tracing: disabled

### Documentation
- OpenAPI/Swagger documentation enabled
- Available at `/documentation`
- Customized for E-Sunrise Australia

## Environment Variables

### Required Environment Variables
```bash
# Server Configuration
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://your-domain.com

# Security Keys
APP_KEYS="key1,key2,key3,key4"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# Database Configuration
DATABASE_URL=your-database-url
DATABASE_CLIENT=postgres

# Storage Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_BUCKET=uploads
```

### Optional Environment Variables
```bash
# Feature Flags
FLAG_NPS=true
FLAG_PROMOTE_EE=true

# Logging
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_INTERVAL=900000
```

## Usage Examples

### REST API Requests
```javascript
// Get all posts with pagination
GET /api/posts?pagination[page]=1&pagination[pageSize]=25

// Get single post with relations
GET /api/posts/1?populate=deep

// Create new post
POST /api/posts
Content-Type: application/json
Authorization: Bearer your-token

{
  "data": {
    "title": "New Post",
    "content": "Post content"
  }
}
```

### GraphQL Queries
```graphql
query GetPosts {
  posts {
    data {
      id
      attributes {
        title
        content
        createdAt
      }
    }
    meta {
      pagination {
        total
        pageCount
      }
    }
  }
}
```

## Monitoring and Debugging

### Rate Limiting Headers
- `X-RateLimit-Limit`: Maximum requests per interval
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time until reset

### Response Headers
- `X-Total-Count`: Total number of items
- `X-Page-Count`: Total number of pages
- `X-Response-Time`: Request processing time

### Logging
- Request logs (development only)
- Error logs (all environments)
- Slow query logs (configurable threshold)

## Best Practices

### 1. API Usage
- Use pagination for large datasets
- Implement proper error handling
- Use appropriate HTTP status codes
- Include authentication headers when required

### 2. Performance
- Use field selection to limit response size
- Implement client-side caching
- Use compression for large responses
- Monitor slow queries

### 3. Security
- Use HTTPS in production
- Implement proper authentication
- Validate input data
- Monitor rate limiting

### 4. Development
- Use environment-specific configurations
- Test with different user roles
- Monitor API performance
- Use GraphQL playground for testing

## Troubleshooting

### Common Issues

1. **Rate Limiting Errors**
   - Check rate limit headers
   - Implement exponential backoff
   - Consider caching responses

2. **CORS Errors**
   - Verify origin configuration
   - Check credentials settings
   - Ensure proper headers

3. **Authentication Issues**
   - Verify API token validity
   - Check token permissions
   - Ensure proper token format

4. **Performance Issues**
   - Monitor slow queries
   - Check database connections
   - Review query optimization

### Debug Mode
Enable debug logging in development:
```bash
LOG_LEVEL=debug
ENABLE_REQUEST_LOGGING=true
```

## Migration Notes

### From Strapi v4
- API response structure remains compatible
- GraphQL schema is backward compatible
- Middleware configuration has been enhanced
- Security features have been improved

### Breaking Changes
- Rate limiting is now enabled by default
- CORS configuration is more strict
- Security headers are more comprehensive

## Support

For issues or questions regarding the API configuration:
- Check Strapi v5 documentation
- Review environment-specific configurations
- Monitor application logs
- Contact development team

---

**Last Updated**: December 2024
**Strapi Version**: 5.21.0
**Configuration Version**: 2.0 