# App Store Submission Guide

Complete step-by-step guide for submitting the Expense Tracker app to Apple App Store and Google Play Store.

## Table of Contents

1. [Pre-Submission Checklist](#pre-submission-checklist)
2. [iOS App Store Submission](#ios-app-store-submission)
3. [Google Play Store Submission](#google-play-store-submission)
4. [Post-Submission](#post-submission)
5. [Troubleshooting](#troubleshooting)

---

## Pre-Submission Checklist

Before submitting to either app store, ensure:

### Code Quality
- ✅ All unit tests passing: `pnpm test`
- ✅ No TypeScript errors: `pnpm check`
- ✅ No console warnings or errors
- ✅ App tested on real devices (iOS and Android)
- ✅ All features working as expected

### App Configuration
- ✅ Version number updated in `app.config.ts`
- ✅ App name correct: "Expense Tracker"
- ✅ App icon finalized (1024x1024 PNG)
- ✅ Splash screen created
- ✅ Bundle ID/Package name correct

### Content
- ✅ Privacy policy written and hosted online
- ✅ Terms of service (if applicable)
- ✅ App description written (max 4000 characters)
- ✅ Keywords/tags selected (up to 30 characters)
- ✅ Screenshots prepared (minimum 2, recommended 5)
- ✅ Preview video (optional, 30 seconds max)

### Screenshots Requirements

**iOS** (iPhone 6.7" and iPad 12.9"):
- Minimum 2 screenshots
- Recommended 5 screenshots
- Show key features
- Include text overlays (optional)
- Landscape and portrait (if applicable)

**Android** (Phone and Tablet):
- Minimum 2 screenshots
- Recommended 8 screenshots
- Show key features
- 1080x1920 pixels (9:16 aspect ratio)

**Screenshot Ideas for Expense Tracker**:
1. Dashboard with balance overview
2. Adding a transaction
3. Transactions list with filters
4. Monthly summary with charts
5. Category breakdown

### Account Setup

**For iOS**:
- ✅ Apple Developer Account created ($99/year)
- ✅ App ID created in Apple Developer Console
- ✅ Certificates and provisioning profiles generated
- ✅ App Store Connect account access

**For Android**:
- ✅ Google Play Developer Account created ($25 one-time)
- ✅ Merchant account set up (for payments)
- ✅ Google Play Console access

---

## iOS App Store Submission

### Step 1: Create App Store Connect Record

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Sign in with Apple ID
3. Click **My Apps**
4. Click **+** (New App)
5. Select **New App**
6. Fill in:
   - **Platform**: iOS
   - **Name**: "Expense Tracker"
   - **Primary Language**: English
   - **Bundle ID**: `space.manus.expense.tracker.mobile` (from app.config.ts)
   - **SKU**: Unique identifier (e.g., `expense-tracker-001`)
   - **User Access**: Select access level
7. Click **Create**

### Step 2: Fill in App Information

#### General Information

1. In App Store Connect, click your app
2. Go to **App Information**
3. Fill in:
   - **Category**: Finance
   - **Subcategory**: Personal Finance
   - **Content Rights**: Select appropriate option
   - **Age Rating**: Click "View" and complete questionnaire
4. Save

#### Pricing and Availability

1. Go to **Pricing and Availability**
2. Select:
   - **Price Tier**: Free (or select paid tier)
   - **Availability**: Select countries
   - **Release Date**: Automatic or specific date
3. Save

### Step 3: Prepare App Description

1. Go to **App Description**
2. Fill in all fields:

| Field | Guidelines | Example |
|-------|-----------|---------|
| **Subtitle** | Max 30 characters | "Track income & expenses" |
| **Description** | Max 4000 characters | See template below |
| **Keywords** | Max 30 characters | "finance, budget, expense" |
| **Support URL** | Your support website | `https://yoursite.com/support` |
| **Privacy Policy URL** | Required | `https://yoursite.com/privacy` |

**Description Template**:
```
Expense Tracker is a simple, powerful personal finance app that helps you track income and expenses with ease.

Key Features:
• Log income and expenses with categories
• View monthly financial summaries
• Track spending by category with visual charts
• Search and filter transactions
• All data stored securely on your device
• Works offline - no internet required

Perfect for:
- Personal budgeting
- Expense tracking
- Financial planning
- Monitoring spending habits

Privacy First:
Your financial data is stored locally on your device. We don't collect, store, or share your personal information.

Get started today and take control of your finances!
```

### Step 4: Upload Screenshots and Preview

1. Go to **Screenshots**
2. For each device type (iPhone 6.7", iPad 12.9"):
   - Click **+** to add screenshot
   - Upload image (PNG or JPEG)
   - Add optional description (max 170 characters)
3. Arrange in order (users see first screenshot first)
4. Save

**Screenshot Tips**:
- Use actual app screenshots (no mockups)
- Highlight key features
- Add text overlays to explain features
- Use consistent styling
- Show app in portrait orientation

### Step 5: Add Preview Video (Optional)

1. Go to **Preview**
2. Click **+** to add video
3. Upload MP4 video (max 500MB, 30 seconds)
4. Video should show app features in action
5. Save

### Step 6: Build and Upload IPA

#### Option A: Using EAS (Recommended)

```bash
# Build for App Store
eas build --platform ios

# This creates an .ipa file
# Download from build.expo.dev or get link from terminal
```

#### Option B: Using Xcode

```bash
# Archive for App Store
cd ios
xcode-select --install
pod install
cd ..

# Build
xcodebuild -workspace ios/expensetracker.xcworkspace \
  -scheme expensetracker \
  -configuration Release \
  -derivedDataPath build \
  -archivePath build/expensetracker.xcarchive \
  archive

# Export
xcodebuild -exportArchive \
  -archivePath build/expensetracker.xcarchive \
  -exportOptionsPlist ios/ExportOptions.plist \
  -exportPath build/ipa
```

### Step 7: Upload to App Store Connect

#### Using Transporter (Recommended)

1. Download [Transporter](https://apps.apple.com/app/transporter/id1450874784) from Mac App Store
2. Open Transporter
3. Sign in with Apple ID
4. Click **+** to add app
5. Select your .ipa file
6. Click **Deliver**
7. Wait for upload to complete

#### Using Xcode

1. Open Xcode
2. Go to **Window** → **Organizer**
3. Select your archive
4. Click **Distribute App**
5. Select **App Store Connect**
6. Follow prompts to upload

### Step 8: Complete App Review Information

1. In App Store Connect, go to **App Review Information**
2. Fill in:
   - **Contact Information**: Your email and phone
   - **Demo Account**: If app requires login (not needed for Expense Tracker)
   - **Notes**: Any special instructions for reviewers
   - **Attachments**: Screenshots of features (optional)
3. Save

### Step 9: Set Version Release

1. Go to **Version Release**
2. Select:
   - **Automatic Release**: Automatically released after approval
   - **Manual Release**: You manually release after approval
3. Save

### Step 10: Submit for Review

1. Go to **Version**
2. Review all information
3. Click **Submit for Review**
4. Confirm submission

**Apple Review Time**: Usually 24-48 hours

### Step 11: Monitor Review Status

1. In App Store Connect, check status
2. Possible outcomes:
   - ✅ **Approved**: App is approved and ready to release
   - ❌ **Rejected**: Review rejection with reasons
   - ⏳ **In Review**: Currently being reviewed
   - ⚠️ **Metadata Rejected**: App description/screenshots rejected

If rejected, fix issues and resubmit.

---

## Google Play Store Submission

### Step 1: Create Google Play Developer Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Sign in with Google account
3. Click **Create account**
4. Pay $25 registration fee
5. Accept agreements
6. Complete account setup

### Step 2: Create App

1. In Google Play Console, click **Create app**
2. Fill in:
   - **App name**: "Expense Tracker"
   - **Default language**: English
   - **App or game**: App
   - **Free or paid**: Free
3. Click **Create app**

### Step 3: Fill in App Details

#### App Access

1. Go to **App access**
2. Select access type:
   - **Open**: Available to all users
   - **Closed testing**: Limited to testers
   - **Internal testing**: Limited to team
3. Save

#### Content Rating

1. Go to **Content rating**
2. Complete questionnaire:
   - Violence, language, sexual content, etc.
   - Google generates rating (G, PG, PG-13, R, etc.)
3. Save

#### Target Audience

1. Go to **Target audience**
2. Select:
   - **Age groups**: Who should use this app
   - **Content guidance**: Any restrictions
3. Save

### Step 4: Add App Details

1. Go to **App details**
2. Fill in:

| Field | Guidelines | Example |
|-------|-----------|---------|
| **Short description** | Max 80 characters | "Track income & expenses easily" |
| **Full description** | Max 4000 characters | See template below |
| **Developer contact** | Your email | `your.email@example.com` |
| **Privacy policy** | Required URL | `https://yoursite.com/privacy` |

**Description Template**:
```
Expense Tracker is a simple, powerful personal finance app that helps you track income and expenses with ease.

Key Features:
• Log income and expenses with categories
• View monthly financial summaries
• Track spending by category with visual charts
• Search and filter transactions
• All data stored securely on your device
• Works offline - no internet required

Perfect for:
- Personal budgeting
- Expense tracking
- Financial planning
- Monitoring spending habits

Privacy First:
Your financial data is stored locally on your device. We don't collect, store, or share your personal information.

Get started today and take control of your finances!
```

### Step 5: Upload Screenshots

1. Go to **Screenshots**
2. For each device type (Phone, Tablet, Wear OS):
   - Click **+** to add screenshot
   - Upload PNG or JPEG (1080x1920 for phone)
   - Add optional description
3. Upload minimum 2, recommended 8 screenshots
4. Save

### Step 6: Add Feature Graphic

1. Go to **Feature graphic**
2. Upload PNG or JPEG (1024x500 pixels)
3. This appears at top of store listing
4. Save

### Step 7: Add App Icon

1. Go to **App icon**
2. Upload PNG (512x512 pixels)
3. Save

### Step 8: Build and Upload AAB

#### Option A: Using EAS (Recommended)

```bash
# Build for Google Play
eas build --platform android

# This creates an .aab file (Android App Bundle)
# Download from build.expo.dev
```

#### Option B: Using Gradle

```bash
# Build Android App Bundle
cd android
./gradlew bundleRelease
cd ..

# AAB file: android/app/build/outputs/bundle/release/app-release.aab
```

### Step 9: Upload to Google Play

1. In Google Play Console, go to **Release** → **Production**
2. Click **Create new release**
3. Upload .aab file
4. Click **Review release**
5. Fill in:
   - **Release notes**: What's new (max 500 characters)
   - Example: "Initial release: Track your income and expenses"
6. Click **Confirm release**

### Step 10: Complete Store Listing

1. Go to **Store listing**
2. Verify all information is complete:
   - ✅ App name
   - ✅ Description
   - ✅ Screenshots
   - ✅ Feature graphic
   - ✅ Icon
   - ✅ Privacy policy
3. Save

### Step 11: Set Up Pricing

1. Go to **Pricing & distribution**
2. Select:
   - **Free**: No charge
   - **Paid**: Set price
3. Select countries
4. Save

### Step 12: Submit for Review

1. Go to **Release** → **Production**
2. Review release details
3. Click **Start rollout to Production**
4. Confirm submission

**Google Play Review Time**: Usually 2-4 hours

### Step 13: Monitor Review Status

1. In Google Play Console, check status
2. Possible outcomes:
   - ✅ **Published**: App is live
   - ❌ **Rejected**: Review rejection with reasons
   - ⏳ **In review**: Currently being reviewed
   - ⚠️ **Draft**: Not submitted yet

If rejected, fix issues and resubmit.

---

## Post-Submission

### After Approval

#### iOS
1. App appears in App Store search within 24-48 hours
2. Users can download and review
3. Monitor reviews and ratings
4. Respond to user feedback

#### Android
1. App appears in Google Play within 2-4 hours
2. Users can download and review
3. Monitor reviews and ratings
4. Respond to user feedback

### Monitoring Performance

**iOS**:
1. Go to App Store Connect
2. Click **Analytics**
3. View:
   - Downloads
   - Revenue (if paid)
   - Crashes
   - Performance metrics

**Android**:
1. Go to Google Play Console
2. Click **Analytics**
3. View:
   - Installs
   - Uninstalls
   - Ratings
   - Crashes
   - Performance metrics

### Responding to Reviews

**iOS**:
1. Go to **Reviews**
2. Click review to respond
3. Write response (max 160 characters)
4. Submit

**Android**:
1. Go to **Reviews**
2. Click review to respond
3. Write response
4. Submit

### Updating Your App

To release a new version:

1. Update version in `app.config.ts`
2. Commit and push: `git commit -m "chore: bump version to 1.0.1"`
3. Build new version: `eas build --platform all`
4. Submit to app stores (follow steps above)
5. App stores review new version
6. Users receive update notification

---

## Troubleshooting

### iOS Submission Issues

#### "Invalid Bundle ID"
- Verify Bundle ID matches app.config.ts
- Check Apple Developer Console for typos
- Regenerate provisioning profile

#### "Certificate Expired"
- Go to Apple Developer Console
- Renew certificate
- Regenerate provisioning profile
- Rebuild app

#### "App Rejected: Guideline 2.1"
- Common reason: App doesn't match description
- Ensure app works as described
- Update description if needed
- Resubmit

### Android Submission Issues

#### "Invalid Signature"
- Verify keystore password is correct
- Check key alias matches
- Regenerate keystore if corrupted

#### "App Rejected: Policy Violation"
- Review rejection reason
- Fix issue (usually privacy or content)
- Update app description/privacy policy
- Resubmit

#### "Upload Failed"
- Check AAB file is valid
- Verify file size < 150MB
- Try uploading again
- Check internet connection

---

## Timeline

### Typical Submission Timeline

| Step | Time |
|------|------|
| Build app | 15-20 min |
| Upload to store | 5-10 min |
| Store review | iOS: 24-48h, Android: 2-4h |
| App goes live | 24-48h after approval |
| Users receive update | Varies (1-7 days) |

### Total Time from Development to Live
- First release: 3-5 days
- Updates: 1-3 days

---

## Best Practices

### Before Submission
- ✅ Test thoroughly on real devices
- ✅ Get feedback from beta testers
- ✅ Fix all bugs and crashes
- ✅ Optimize performance
- ✅ Write clear, honest descriptions

### Screenshots & Marketing
- ✅ Show real app features
- ✅ Use high-quality images
- ✅ Highlight key benefits
- ✅ Keep text minimal
- ✅ Maintain consistent branding

### After Launch
- ✅ Monitor reviews and ratings
- ✅ Respond to user feedback
- ✅ Fix reported bugs quickly
- ✅ Release updates regularly
- ✅ Track analytics

---

## Resources

- [App Store Connect Help](https://help.apple.com/app-store-connect)
- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)
- [Expo Submission Guide](https://docs.expo.dev/submit/introduction/)

---

## Checklist for Launch Day

- [ ] Version bumped in app.config.ts
- [ ] All tests passing
- [ ] App built and tested on real devices
- [ ] Screenshots prepared and uploaded
- [ ] Description and keywords finalized
- [ ] Privacy policy live and linked
- [ ] iOS app uploaded to App Store Connect
- [ ] Android app uploaded to Google Play Console
- [ ] Both apps submitted for review
- [ ] Team notified of submission
- [ ] Monitoring dashboard set up
- [ ] Review response templates prepared
- [ ] Post-launch communication plan ready

Good luck with your launch! 🚀
