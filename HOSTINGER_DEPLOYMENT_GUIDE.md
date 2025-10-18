# 🚀 Hostinger Deployment Guide - FlowSync AI

Complete guide to deploying your FlowSync AI website on Hostinger.

---

## 📋 Prerequisites

- ✅ Hostinger account with hosting plan
- ✅ Domain name (optional, can use Hostinger subdomain)
- ✅ Git installed locally
- ✅ Project built successfully (`bun run build`)

---

## 🎯 Deployment Options

Hostinger offers multiple deployment methods:

### Option 1: Git Deployment (Recommended) ⭐
- Automatic deployments from GitHub
- Easy updates via git push
- Version control built-in

### Option 2: FTP/SFTP Upload
- Direct file upload
- Good for one-time deployments
- Manual updates required

### Option 3: Hostinger Website Builder
- Drag-and-drop interface
- Limited customization
- Not recommended for our app

**We'll use Option 1 (Git Deployment)** as it's the most professional.

---

## 🔧 Step 1: Prepare Your Project

### 1.1 Update Environment Variables

Create `.env.production` file:

```env
# Supabase (Production)
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key

# Stripe (Production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Polar (Production)
VITE_POLAR_ACCESS_TOKEN=your_polar_production_token

# App Config
VITE_APP_VERSION=0.6.0
VITE_FRONTEND_URL=https://yourdomain.com
```

### 1.2 Update `package.json`

Add these scripts if not present:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "build:prod": "NODE_ENV=production vite build"
  }
}
```

### 1.3 Create `.htaccess` for SPA Routing

Create `public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### 1.4 Build Your Project

```bash
# Clean previous builds
rm -rf dist

# Build for production
bun run build

# Verify build output
ls -lah dist/
```

You should see:
```
dist/
├── assets/          # JS and CSS bundles
├── index.html       # Entry point
└── .htaccess        # Apache config
```

---

## 📦 Step 2: Push to GitHub

### 2.1 Initialize Git (if not done)

```bash
git init
git add .
git commit -m "feat: Complete million-dollar marketing website (v0.6.0)"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `flowsync-webapp`
3. **Don't** initialize with README (already exists)

### 2.3 Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/flowsync-webapp.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Hostinger

### Method A: Hostinger hPanel (Recommended)

#### 3.1 Login to Hostinger

1. Go to https://hpanel.hostinger.com
2. Login with your credentials
3. Select your hosting plan

#### 3.2 Access Git Version Control

1. Go to **Website** → **Git Version Control**
2. Click **Create New Repository**

#### 3.3 Connect GitHub Repository

**Repository Details:**
- **Repository URL**: `https://github.com/YOUR_USERNAME/flowsync-webapp.git`
- **Branch**: `main`
- **Repository Path**: `/public_html` (or your domain folder)

**Authentication:**
- Click **Generate SSH Key**
- Copy the generated SSH key
- Add to GitHub: Settings → SSH and GPG keys → New SSH key
- Paste the key and save

#### 3.4 Deploy

1. Click **Pull** to deploy
2. Wait for deployment to complete
3. Hostinger will download and deploy your files

#### 3.5 Build Setup (Important!)

Since Hostinger pulls source code, you need to build on the server:

**Option A: Pre-build locally**
```bash
# Build locally
bun run build

# Commit dist folder (usually gitignored)
git add -f dist/
git commit -m "Add production build"
git push
```

**Option B: Build on Hostinger**
1. Access **SSH** in hPanel
2. Navigate to your directory:
   ```bash
   cd public_html
   ```
3. Install dependencies and build:
   ```bash
   # Install Node.js if not available
   nvm install 20
   nvm use 20

   # Install Bun
   curl -fsSL https://bun.sh/install | bash

   # Install dependencies
   bun install

   # Build
   bun run build
   ```

### Method B: FTP/SFTP Upload (Alternative)

#### 3.1 Build Locally

```bash
bun run build
```

#### 3.2 Get FTP Credentials

1. Go to **Files** → **FTP Accounts**
2. Note your credentials:
   - Host: `ftp.yourdomain.com`
   - Username: `your_username`
   - Password: `your_password`
   - Port: `21` (FTP) or `22` (SFTP)

#### 3.3 Upload via FTP Client

**Using FileZilla (Recommended):**

1. Download FileZilla: https://filezilla-project.org
2. Connect:
   - Host: `sftp://yourdomain.com`
   - Username: your FTP username
   - Password: your FTP password
   - Port: `22`
3. Navigate to `/public_html` (or your domain folder)
4. Upload **contents** of `dist/` folder (not the folder itself):
   ```
   dist/assets/     → public_html/assets/
   dist/index.html  → public_html/index.html
   dist/.htaccess   → public_html/.htaccess
   ```

**Using Command Line SFTP:**

```bash
# Connect
sftp username@yourdomain.com

# Navigate to public_html
cd public_html

# Upload files
put -r dist/* .

# Verify upload
ls -la

# Exit
exit
```

---

## ⚙️ Step 4: Configure Domain & SSL

### 4.1 Point Domain to Hosting

**If using Hostinger domain:**
- Already configured, skip this step

**If using external domain:**
1. Update nameservers to:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
2. Or update DNS A record to Hostinger IP

### 4.2 Enable SSL Certificate

1. Go to **Security** → **SSL**
2. Install **Free SSL Certificate** (Let's Encrypt)
3. Wait 10-15 minutes for activation
4. Enable **Force HTTPS**

### 4.3 Configure PHP Version

1. Go to **Advanced** → **PHP Configuration**
2. Select **PHP 8.1** or higher
3. Save changes

---

## 🔐 Step 5: Environment Variables

### Method 1: Using .env file (Not Recommended for Production)

Upload `.env.production` to server via FTP

### Method 2: Using Vite Build-Time Variables (Recommended)

Since Vite bundles variables at build time:

1. Set environment variables **before building**:
   ```bash
   # Local build with production env
   cp .env.production .env.local
   bun run build
   ```

2. Or use Hostinger's **Environment Variables** feature:
   - Go to **Advanced** → **Environment Variables**
   - Add each variable from `.env.production`

---

## ✅ Step 6: Verify Deployment

### 6.1 Check Website

Visit your domain: `https://yourdomain.com`

**Verify:**
- ✅ Homepage loads correctly
- ✅ All navigation links work
- ✅ Images and assets load
- ✅ HTTPS enabled (padlock icon)
- ✅ Mobile responsive

### 6.2 Test All Routes

Visit each route to ensure SPA routing works:
- `https://yourdomain.com/features`
- `https://yourdomain.com/pricing`
- `https://yourdomain.com/about`

If you see 404 errors, check `.htaccess` is uploaded correctly.

### 6.3 Test Functionality

- ✅ Theme toggle (light/dark)
- ✅ Cart slideout opens
- ✅ Confetti works on CTA clicks
- ✅ Navigation dropdowns work
- ✅ Mobile menu works

---

## 🔄 Step 7: Update Workflow

### For Git Deployment:

```bash
# Make changes locally
git add .
git commit -m "Update homepage content"
git push origin main

# In Hostinger hPanel:
# Go to Git Version Control → Click "Pull"
# Rebuild if necessary
```

### For FTP Deployment:

```bash
# Build locally
bun run build

# Upload via FTP
# Upload dist/* to public_html/
```

---

## 🐛 Troubleshooting

### Issue: 404 on Routes

**Solution**: Check `.htaccess` file

```bash
# Via SSH
cat public_html/.htaccess

# Should contain RewriteEngine On rules
```

### Issue: White Screen

**Solution**: Check browser console for errors

1. Open DevTools (F12)
2. Check Console tab
3. Common issues:
   - CORS errors → Check Supabase URL
   - Missing assets → Check file paths
   - API errors → Check environment variables

### Issue: Slow Loading

**Solution**: Enable caching and compression

1. Verify `.htaccess` has GZIP compression
2. Enable browser caching
3. Use Cloudflare (free CDN)

### Issue: Environment Variables Not Working

**Solution**: Remember Vite bundles at build time

```bash
# Set vars BEFORE building
export VITE_SUPABASE_URL=your_url
bun run build
```

---

## 🚀 Performance Optimization

### Enable Cloudflare (Free CDN)

1. Sign up at https://cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - Browser Cache TTL: 1 month

### Optimize Images

```bash
# Install optimization tools
bun add -d vite-plugin-imagemin

# Update vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

export default {
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: { plugins: [{ removeViewBox: false }] }
    })
  ]
}
```

---

## 📊 Monitoring

### Setup Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Or PostHog (privacy-friendly) -->
<script>
  !function(t,e){...}(window,document);
  posthog.init('YOUR_API_KEY', {api_host: 'https://app.posthog.com'})
</script>
```

### Monitor Uptime

Use free services:
- UptimeRobot: https://uptimerobot.com
- Pingdom: https://pingdom.com (free tier)

---

## 🔒 Security Checklist

- ✅ SSL certificate installed
- ✅ Force HTTPS enabled
- ✅ `.env` files in `.gitignore`
- ✅ API keys not exposed in frontend
- ✅ CORS configured in Supabase
- ✅ Rate limiting enabled
- ✅ Regular backups enabled

---

## 📝 Summary

**Deployment Steps:**
1. ✅ Build project (`bun run build`)
2. ✅ Push to GitHub
3. ✅ Connect Git in Hostinger hPanel
4. ✅ Pull/Deploy
5. ✅ Configure domain & SSL
6. ✅ Set environment variables
7. ✅ Verify deployment
8. ✅ Monitor & optimize

**Total Time**: 30-60 minutes

**Result**: Your FlowSync AI website live on the internet! 🎉

---

## 🆘 Need Help?

- **Hostinger Support**: https://www.hostinger.com/tutorials
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **GitHub**: https://github.com/code-craka/flow-sync-webapp/issues

---

**Your FlowSync AI website is ready to go live!** 🚀

Good luck with your deployment! 🎊
