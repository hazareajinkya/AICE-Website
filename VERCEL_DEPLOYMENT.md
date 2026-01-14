# Vercel Deployment Guide

This guide will walk you through deploying the AICE Combined Website to Vercel.

## Prerequisites

- ✅ GitHub account with the repository pushed
- ✅ Vercel account (free tier works fine)
- ✅ Firebase project set up with Firestore enabled
- ✅ Firebase configuration credentials ready

## Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign up with your GitHub account (recommended for easy repository access)

## Step 2: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"AICE-Website"** repository and click **"Import"**

## Step 3: Configure Project Settings

### 3.1 Project Name
- **Project Name**: `aice-website` (or your preferred name)
- **Framework Preset**: Vercel should auto-detect **Next.js** ✅

### 3.2 Root Directory
- Leave as **"."** (root) - this is correct for our project structure

### 3.3 Build Settings
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 3.4 Branch Selection
- **Production Branch**: Select `newsletter_integration` (or `main` if you've merged)
- You can also deploy other branches later

## Step 4: Configure Environment Variables

**⚠️ CRITICAL STEP** - This is required for Firebase to work!

1. In the project settings, scroll down to **"Environment Variables"** section
2. Click **"Add"** for each of the following variables:

### Required Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### How to Add Each Variable:

1. Click **"Add"** button
2. Enter the **Name** (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. Enter the **Value** (from your `.env.local` file or Firebase Console)
4. Select **Environment**: 
   - ✅ **Production**
   - ✅ **Preview** (for branch deployments)
   - ✅ **Development** (optional)
5. Click **"Save"**
6. Repeat for all 6 variables

### Where to Find Firebase Credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **⚙️ Settings** → **Project settings**
4. Scroll to **"Your apps"** section
5. Click on your web app (or create one if needed)
6. Copy the values from the `firebaseConfig` object

## Step 5: Deploy

1. After adding all environment variables, click **"Deploy"** button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to production
3. Wait for the build to complete (usually 2-3 minutes)

## Step 6: Verify Deployment

### 6.1 Check Build Logs
- Watch the build process in real-time
- Look for any errors (should be none if everything is configured correctly)
- ✅ Success message: "Build Completed"

### 6.2 Test Your Deployment

Once deployed, you'll get a URL like: `https://aice-website.vercel.app`

**Test these routes:**
1. **Main Website**: `https://your-project.vercel.app/`
   - Should show the AICE website with hero section
   - Test the pre-enrollment form

2. **Newsletter Page**: `https://your-project.vercel.app/newsletter`
   - Should show the newsletter subscription form
   - Test the subscription functionality

### 6.3 Verify Firebase Integration

1. **Test Pre-Enrollment Form**:
   - Go to the homepage
   - Enter an email and click "Pre-Enroll Now"
   - Check Firebase Console → Firestore → `course_preenrollment` collection
   - You should see the new document

2. **Test Newsletter Form**:
   - Go to `/newsletter` route
   - Enter an email and subscribe
   - Check Firebase Console → Firestore → `newsletter_subscribers` collection
   - You should see the new document

## Step 7: Update Firestore Rules (IMPORTANT!)

Make sure your Firestore rules allow writes from your Vercel domain:

1. Go to Firebase Console → Firestore Database → Rules
2. Update rules to include both collections:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Newsletter subscribers
    match /newsletter_subscribers/{email} {
      allow read: if request.auth != null;
      allow create: if true; // Anyone can subscribe
      allow update: if false;
      allow delete: if request.auth != null;
    }
    
    // Course pre-enrollment
    match /course_preenrollment/{email} {
      allow read: if request.auth != null;
      allow create: if true; // Anyone can pre-enroll
      allow update: if false;
      allow delete: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"** to save the rules

## Step 8: Custom Domain (Optional)

If you want to use a custom domain:

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Enter your domain (e.g., `aice-website.com`)
3. Follow the DNS configuration instructions
4. Vercel will automatically configure SSL certificates

## Step 9: Continuous Deployment

✅ **Automatic Deployments** are enabled by default:
- Every push to `newsletter_integration` branch = new deployment
- Every pull request = preview deployment
- You can disable this in Settings → Git

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Firebase not initialized"**
- Verify all environment variables are set in Vercel
- Make sure variable names start with `NEXT_PUBLIC_`
- Redeploy after adding variables

### Firebase Not Working

**Error: "Permission denied"**
- Check Firestore rules in Firebase Console
- Make sure rules allow `create` operations

**Error: "Network error"**
- Check Firebase project is active
- Verify environment variables are correct
- Check browser console for detailed errors

### Images/Videos Not Loading

- Verify all files are in `public/` folder
- Check file paths in components (should start with `/`)
- Clear browser cache

### Routes Not Working

- Verify `src/app/` structure is correct
- Check `next.config.ts` for any route rewrites
- Ensure `package.json` has correct Next.js version

## Post-Deployment Checklist

- [ ] Main website loads correctly (`/`)
- [ ] Newsletter page loads correctly (`/newsletter`)
- [ ] Pre-enrollment form submits successfully
- [ ] Newsletter form submits successfully
- [ ] Data appears in Firebase Firestore
- [ ] Images and videos load properly
- [ ] Mobile responsive design works
- [ ] No console errors in browser

## Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/
- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## Support

If you encounter issues:
1. Check Vercel build logs for errors
2. Check browser console for runtime errors
3. Verify Firebase configuration
4. Review this guide for missed steps

---

**🎉 Congratulations!** Your combined AICE website is now live on Vercel!

