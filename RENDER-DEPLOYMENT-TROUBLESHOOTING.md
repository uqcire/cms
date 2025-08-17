# Render Deployment Troubleshooting Guide

This guide helps resolve common deployment issues with Strapi on Render.

## 🚨 **Current Issue: Deployment Timeout**

### **Problem:**
```
==> Build successful 🎉
==> Deploying...
==> Timed Out
```

### **Root Cause:**
The deployment is timing out during the startup phase, likely due to:
1. **Double build process** - `postinstall` script running `strapi build`
2. **Missing health check** - Render can't verify the service is ready
3. **Resource constraints** - Free tier limitations

## ✅ **Fixes Applied:**

### **1. Fixed Package.json**
- **Removed double build**: Changed `postinstall` script to skip build
- **Optimized build process**: Using `npm ci` only

### **2. Updated Render Configuration**
- **Added health check**: `/api/healthcheck` endpoint
- **Optimized build command**: `npm ci` instead of `npm ci && npm run build`
- **Added environment variables**: Telemetry disabled, admin URL set

### **3. Created Health Check Endpoint**
- **Route**: `GET /api/healthcheck`
- **Purpose**: Allows Render to verify service is running
- **Response**: Basic health status and uptime

## 🔧 **Manual Steps Required:**

### **1. Commit and Push Changes**
```bash
git add .
git commit -m "fix(render): optimize deployment configuration and add health check"
git push origin main
```

### **2. Redeploy on Render**
1. Go to your Render dashboard
2. Navigate to your Strapi service
3. Click "Manual Deploy" → "Deploy latest commit"

### **3. Monitor Deployment**
- Watch the build logs for any errors
- Check that the health check endpoint responds
- Verify the service starts successfully

## 🚀 **Expected Deployment Flow:**

```
1. Clone repository ✅
2. Install dependencies (npm ci) ✅
3. Build Strapi admin panel ✅
4. Start service (npm run start) ✅
5. Health check passes ✅
6. Service ready ✅
```

## 🔍 **If Still Timing Out:**

### **Option 1: Upgrade to Paid Plan**
- Render free tier has limitations
- Consider upgrading to "Starter" plan ($7/month)
- More resources and longer timeout limits

### **Option 2: Alternative Platforms**
- **Railway**: Better free tier for Strapi
- **Heroku**: Good Strapi support
- **DigitalOcean App Platform**: Reliable deployment

### **Option 3: Optimize Further**
1. **Remove unused dependencies**
2. **Optimize build process**
3. **Use production database from start**

## 📋 **Environment Variables Checklist**

Ensure these are set in Render dashboard:

### **Required:**
- `DATABASE_URL` - Your Supabase PostgreSQL URL
- `JWT_SECRET` - Random string for JWT tokens
- `ADMIN_JWT_SECRET` - Random string for admin JWT
- `APP_KEYS` - Comma-separated random strings
- `API_TOKEN_SALT` - Random string for API tokens
- `TRANSFER_TOKEN_SALT` - Random string for transfer tokens

### **Optional:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `PUBLIC_URL` - https://cms-fklk.onrender.com

## 🎯 **Success Indicators:**

1. **Build completes** without timeout
2. **Health check responds**: `https://cms-fklk.onrender.com/api/healthcheck`
3. **Admin panel accessible**: `https://cms-fklk.onrender.com/admin`
4. **API endpoints work**: `https://cms-fklk.onrender.com/api/page`

## 📞 **Next Steps:**

1. **Deploy the updated configuration**
2. **Test the health check endpoint**
3. **Verify admin panel access**
4. **Configure public permissions**
5. **Create initial content**

---

**Note**: If the deployment still fails, consider using Railway or upgrading to a paid Render plan for better reliability. 