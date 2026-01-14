# Firebase Production Setup Guide

This guide will help you transition your Firebase project from **test mode** to **production mode** with proper security rules.

## Current Status: Test Mode

In test mode, your Firestore rules likely look like this (INSECURE for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Allows anyone to read/write everything
    }
  }
}
```

**⚠️ This is insecure and should NOT be used in production!**

## Step 1: Update Firestore Security Rules

### 1.1 Go to Firestore Rules

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Build** → **Firestore Database**
4. Click on the **Rules** tab

### 1.2 Replace with Production Rules

Replace your test mode rules with these secure production rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Newsletter subscribers collection
    match /newsletter_subscribers/{email} {
      // Only authenticated admins can read
      allow read: if request.auth != null && 
                     request.auth.token.admin == true;
      
      // Anyone can create (subscribe) - this is what we want
      allow create: if request.resource.data.keys().hasAll(['email', 'subscribedAt', 'source']) &&
                       request.resource.data.email == email &&
                       request.resource.data.email is string &&
                       request.resource.data.email.matches('.*@.*\\..*');
      
      // No updates allowed (users can't modify their subscription)
      allow update: if false;
      
      // Only authenticated admins can delete
      allow delete: if request.auth != null && 
                       request.auth.token.admin == true;
    }
    
    // Course pre-enrollment collection
    match /course_preenrollment/{email} {
      // Only authenticated admins can read
      allow read: if request.auth != null && 
                     request.auth.token.admin == true;
      
      // Anyone can create (pre-enroll) - this is what we want
      allow create: if request.resource.data.keys().hasAll(['email', 'subscribedAt', 'source']) &&
                       request.resource.data.email == email &&
                       request.resource.data.email is string &&
                       request.resource.data.email.matches('.*@.*\\..*');
      
      // No updates allowed (users can't modify their pre-enrollment)
      allow update: if false;
      
      // Only authenticated admins can delete
      allow delete: if request.auth != null && 
                       request.auth.token.admin == true;
    }
    
    // Deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 1.3 Simplified Production Rules (If Admin Auth Not Set Up)

If you haven't set up admin authentication yet, use these simpler rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Newsletter subscribers
    match /newsletter_subscribers/{email} {
      // No public reads (only you can read via Firebase Console)
      allow read: if false;
      
      // Anyone can create (subscribe) with email validation
      allow create: if request.resource.data.email == email &&
                       request.resource.data.email is string &&
                       request.resource.data.email.matches('.*@.*\\..*');
      
      // No updates or deletes
      allow update: if false;
      allow delete: if false;
    }
    
    // Course pre-enrollment
    match /course_preenrollment/{email} {
      // No public reads
      allow read: if false;
      
      // Anyone can create (pre-enroll) with email validation
      allow create: if request.resource.data.email == email &&
                       request.resource.data.email is string &&
                       request.resource.data.email.matches('.*@.*\\..*');
      
      // No updates or deletes
      allow update: if false;
      allow delete: if false;
    }
    
    // Deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 1.4 Publish the Rules

1. Click **"Publish"** button
2. Wait for confirmation: "Rules published successfully"
3. Rules take effect immediately

## Step 2: Enable Firestore Indexes (If Needed)

If you plan to query data by fields other than email:

1. Go to **Firestore Database** → **Indexes** tab
2. Click **"Create Index"** if you see any missing index errors
3. For now, you probably don't need indexes since we're using email as document ID

## Step 3: Set Up Authentication (Optional but Recommended)

For admin access to read data:

### 3.1 Enable Authentication

1. Go to **Build** → **Authentication**
2. Click **"Get Started"**
3. Enable **Email/Password** provider (or Google, etc.)
4. Add your admin email addresses

### 3.2 Set Custom Claims for Admins

You'll need to use Firebase Admin SDK to set custom claims. This requires a backend service.

**For now, you can skip this** and use the simplified rules above. You can always read data directly from Firebase Console.

## Step 4: Enable App Check (Recommended for Production)

App Check helps protect your backend resources from abuse:

1. Go to **Build** → **App Check**
2. Click **"Get Started"**
3. Register your app
4. For web apps, you can use **reCAPTCHA v3**
   - Get a reCAPTCHA site key from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Add it to your Vercel environment variables as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
5. Enable enforcement for Firestore

**Note:** This is optional but recommended for production to prevent abuse.

## Step 5: Review and Test

### 5.1 Test Rules Locally

1. Try submitting a form from your website
2. Check Firebase Console → Firestore
3. Verify the document was created
4. Try to read/update/delete (should fail if not admin)

### 5.2 Monitor Usage

1. Go to **Firestore Database** → **Usage** tab
2. Monitor read/write operations
3. Set up billing alerts if needed

## Step 6: Update Environment Variables in Vercel

Make sure your Vercel deployment has the correct Firebase credentials:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
3. Redeploy if you made any changes

## Step 7: Enable Billing (If Needed)

Firebase has a free tier, but for production:

1. Go to Firebase Console → **Usage and billing**
2. Review the free tier limits:
   - **Firestore**: 50K reads, 20K writes, 20K deletes per day (free)
   - **Storage**: 1 GB stored, 10 GB/month downloads (free)
3. Enable billing if you expect to exceed free tier
4. Set up budget alerts

## Step 8: Security Checklist

- [ ] Firestore rules updated to production mode
- [ ] Rules deny public reads (or require admin auth)
- [ ] Rules validate email format on create
- [ ] Rules prevent updates and deletes from public
- [ ] App Check enabled (optional but recommended)
- [ ] Billing alerts configured
- [ ] Environment variables secured in Vercel
- [ ] Tested form submissions work correctly
- [ ] Verified no public access to sensitive data

## Common Issues

### Issue: "Permission denied" after updating rules

**Solution:**
- Check that your rules allow `create` operations
- Verify email validation in rules matches your data structure
- Make sure you're using the correct collection names

### Issue: Can't read data from Firebase Console

**Solution:**
- This is expected! Console access uses admin privileges
- To read data programmatically, set up admin authentication
- Or temporarily allow reads for testing, then disable

### Issue: Rules too restrictive

**Solution:**
- Start with the simplified rules above
- Gradually add more restrictions as needed
- Test each change before deploying

## Production Rules Summary

✅ **What's Allowed:**
- Anyone can create (subscribe/pre-enroll) with valid email
- Email must match document ID
- Email must be valid format

❌ **What's Blocked:**
- Public reads (only admins/console can read)
- Updates (no modifications allowed)
- Deletes (only admins can delete)
- Access to other collections

## Next Steps

1. ✅ Update Firestore rules (Step 1)
2. ✅ Test form submissions
3. ✅ Monitor usage in Firebase Console
4. ✅ Set up billing alerts (if needed)
5. ✅ Enable App Check (optional)
6. ✅ Review security checklist

---

**🎉 Your Firebase is now configured for production!**

For questions or issues, refer to:
- [Firebase Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

