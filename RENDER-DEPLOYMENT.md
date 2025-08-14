# Render Deployment Guide for Strapi CMS

## Environment Variables for Render

Set these environment variables in your Render dashboard:

### Server Configuration
```
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://your-app-name.onrender.com
```

### Database Configuration (Supabase)
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DATABASE_CLIENT=postgres
DATABASE_HOST=db.[YOUR-PROJECT-REF].supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[YOUR-PASSWORD]
DATABASE_SSL=true
DATABASE_SCHEMA=public
DATABASE_POOL_MIN=0
DATABASE_POOL_MAX=10
```

### Supabase Storage Configuration
```
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
SUPABASE_BUCKET=uploads
SUPABASE_DIRECTORY=
```

### Strapi Security Keys (Generate these)
```
APP_KEYS="key1,key2,key3,key4"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### Feature Flags
```
FLAG_NPS=true
FLAG_PROMOTE_EE=true
```

## Supabase Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project reference ID

### 2. Database Setup
1. Go to Settings > Database
2. Copy the connection string
3. Replace `[YOUR-PASSWORD]` with your database password
4. Replace `[YOUR-PROJECT-REF]` with your project reference

### 3. Storage Setup
1. Go to Storage in Supabase dashboard
2. Create a new bucket called `uploads`
3. Set bucket permissions to public
4. Go to Settings > API
5. Copy the `anon` public key and `service_role` secret key

### 4. Storage Bucket Policy
Add this policy to your `uploads` bucket:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated uploads
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
```

## Render Setup Instructions

### 1. Create Render Service
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`

### 2. Environment Variables
1. Add all environment variables listed above
2. Generate secure random strings for all secrets
3. Use your actual Supabase credentials

### 3. Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Auto-Deploy**: Enabled
- **Branch**: `main`

## Security Key Generation

Generate secure random strings for these keys:

```bash
# Generate 32-character random strings
openssl rand -base64 32
```

Or use an online generator for:
- APP_KEYS (comma-separated list of 4 keys)
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT
- JWT_SECRET
- ENCRYPTION_KEY

## Post-Deployment Setup

### 1. Create Admin User
1. Visit your deployed Strapi admin panel
2. Create the first admin user
3. Set up your admin credentials

### 2. Configure Content Types
1. Go to Content-Type Builder
2. Verify all content types are present
3. Set up permissions for public role

### 3. Test File Uploads
1. Upload a test image
2. Verify it appears in Supabase storage
3. Check that the URL is accessible

## Troubleshooting

### Common Issues
1. **Database Connection**: Ensure DATABASE_URL is correct
2. **Storage Uploads**: Verify Supabase service role key
3. **Build Failures**: Check Node.js version compatibility
4. **Permission Errors**: Verify bucket policies in Supabase

### Logs
- Check Render logs for deployment issues
- Check Strapi logs for runtime errors
- Verify environment variables are set correctly 