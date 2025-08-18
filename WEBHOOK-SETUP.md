# Webhook Setup Guide for E-Sunrise Australia

This guide explains how to set up webhooks for automatic Vercel deployments when content is published or unpublished in Strapi.

## Overview

The webhook system automatically triggers Vercel deployments when:
- Content is published (`entry.publish`)
- Content is unpublished (`entry.unpublish`)

This enables **SSG with on-demand rebuilds** - your site will automatically rebuild and deploy when content changes.

## Prerequisites

1. **Vercel Project**: Your frontend must be deployed on Vercel
2. **Vercel Account**: Access to create deploy hooks
3. **Strapi Admin Access**: To configure webhooks

## Step 1: Create Vercel Deploy Hook

### 1.1 Navigate to Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Select your project (dflm.com.au frontend)
3. Go to **Settings** → **Git** → **Deploy Hooks**

### 1.2 Create the Hook
1. Click **"Create Hook"**
2. Configure the hook:
   - **Name**: `Strapi Content Update`
   - **Branch**: `main` (or your production branch)
   - **Events**: Select "Deploy"
3. Click **"Create Hook"**
4. **Copy the webhook URL** - it will look like:
   ```
   https://api.vercel.com/v1/hooks/your-hook-id
   ```

## Step 2: Configure Environment Variables

### 2.1 Add to Strapi Environment
Add the webhook URL to your Strapi environment variables:

**For Development (`.env`):**
```env
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/hooks/your-hook-id
```

**For Production (Render):**
1. Go to your Render dashboard
2. Select your Strapi service
3. Go to **Environment** tab
4. Add environment variable:
   - **Key**: `VERCEL_DEPLOY_HOOK_URL`
   - **Value**: `https://api.vercel.com/v1/hooks/your-hook-id`

## Step 3: Configure Strapi Webhook

### 3.1 Access Strapi Admin
1. Go to your Strapi admin panel
2. Navigate to **Settings** → **Webhooks**

### 3.2 Create Webhook
1. Click **"Add new webhook"**
2. Configure the webhook:
   - **Name**: `Vercel Deployment`
   - **URL**: `https://api.vercel.com/v1/hooks/your-hook-id`
   - **Events**: 
     - ✅ `entry.publish`
     - ✅ `entry.unpublish`
   - **Content Types**: Select blog content types that should trigger rebuilds:
     - Post
     - Category
     - Tag

### 3.3 Save and Test
1. Click **"Save"**
2. Click **"Send test payload"** to test the webhook
3. Check your Vercel dashboard to confirm a deployment was triggered

## Step 4: Test the Integration

### 4.1 Test Content Publishing
1. Go to **Content Manager** in Strapi
2. Create or edit a blog post/category/tag
3. Click **"Publish"**
4. Check your Vercel dashboard - a new deployment should start automatically

### 4.2 Test Content Unpublishing
1. Go to a published entry
2. Click **"Unpublish"**
3. Check your Vercel dashboard - another deployment should start

### 4.3 Verify Site Updates
1. Wait for the Vercel deployment to complete
2. Visit your live site
3. Verify the content changes are reflected

## Step 5: Monitor and Troubleshoot

### 5.1 Check Webhook Logs
- In Strapi admin: **Settings** → **Webhooks** → Click on your webhook → **"View logs"**
- Check for failed deliveries or errors

### 5.2 Check Vercel Deployments
- In Vercel dashboard: **Deployments** tab
- Look for deployments triggered by webhooks
- Check build logs for any errors

### 5.3 Common Issues

**Webhook not triggering:**
- Verify `VERCEL_DEPLOY_HOOK_URL` is set correctly
- Check Strapi webhook configuration
- Ensure content types are selected in webhook settings

**Vercel deployment failing:**
- Check Vercel build logs
- Verify environment variables in Vercel
- Check for build errors in your frontend code

**Content not updating:**
- Ensure content is published (not draft)
- Check if content type is included in webhook
- Verify frontend is fetching live content

## Configuration Files

### Webhook Plugin Configuration
```javascript
// config/plugins.js
webhook: {
  config: {
    vercelDeployHook: env('VERCEL_DEPLOY_HOOK_URL'),
    events: ['entry.publish', 'entry.unpublish'],
    contentTypes: [
      'api::post.post',
      'api::category.category',
      'api::tag.tag',
    ],
  },
},
```

### Webhook Service
The webhook service (`src/api/webhook/services/webhook.js`) handles:
- Triggering Vercel deployments
- Validating content types
- Logging webhook events
- Error handling

## Security Considerations

1. **Webhook URL**: Keep your Vercel deploy hook URL secure
2. **Environment Variables**: Don't commit webhook URLs to version control
3. **Content Types**: Only include content types that should trigger rebuilds
4. **Rate Limiting**: Vercel has rate limits on deploy hooks

## Performance Optimization

1. **Selective Triggers**: Only trigger rebuilds for content that affects the frontend
2. **Batch Updates**: Consider batching multiple content updates to reduce deployments
3. **Preview Deployments**: Use Vercel preview deployments for testing

## Troubleshooting Commands

### Test Webhook Configuration
```bash
# Test webhook endpoint
curl -X POST http://localhost:1337/api/webhooks/test

# Check webhook configuration
curl -X GET http://localhost:1337/api/webhooks/config
```

### Check Strapi Logs
```bash
# View Strapi logs
pnpm run develop
# Look for webhook-related log messages
```

## Next Steps

After webhook setup is complete:
1. **Test thoroughly** with different content types
2. **Monitor deployments** for the first few days
3. **Optimize** based on usage patterns
4. **Document** any custom configurations

## Support

If you encounter issues:
1. Check Strapi logs for webhook errors
2. Verify Vercel deploy hook is working
3. Test webhook configuration endpoints
4. Review this guide for common solutions 