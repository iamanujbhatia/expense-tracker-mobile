# Expense Tracker - Development Environment Setup Guide

This guide walks you through setting up a complete development environment for the Expense Tracker mobile app, from local development to publishing on iOS and Android app stores.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Running the App](#running-the-app)
4. [Testing](#testing)
5. [Building for Production](#building-for-production)
6. [Publishing to App Stores](#publishing-to-app-stores)
7. [CI/CD Pipeline Setup](#cicd-pipeline-setup)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 18.x or higher | JavaScript runtime |
| **pnpm** | 9.x or higher | Package manager (faster than npm) |
| **Git** | Latest | Version control |
| **Expo CLI** | Latest | Mobile app development platform |

### Optional (for native builds)

- **Xcode** (macOS only) — Required for iOS development and building
- **Android Studio** — Required for Android development and building
- **EAS CLI** — For building on Expo's cloud infrastructure (recommended)

### Accounts Required

- **GitHub** — For version control and CI/CD
- **Expo Account** — Free account at [expo.dev](https://expo.dev) for managing builds and publishing
- **Apple Developer Account** — $99/year for iOS app store submission
- **Google Play Developer Account** — $25 one-time for Android app store submission

---

## Local Development Setup

### Step 1: Clone the Repository

         ### Anuj Notes - Since I already downloaded the files in the folder expense-tracker-mobile I did this instead:

         ### # Navigate to your existing project
         cd C:\MyProjects\expense-tracker-mobile

         # Initialize git repository
         git init

         # Add all files
         git add .

         # Create initial commit
         git commit -m "Initial commit: Expense Tracker mobile app"

         # Add your GitHub repository as remote
         git remote add origin https://github.com/iamanujbhatia/expense-tracker-mobile.git

         # created repo named expense-tracker-mobile on github

         # Set main as default branch
         git branch -M main

         # Push to GitHub
         git push -u origin main

### Step 2: Install Node.js and pnpm  (if not already installed)

**macOS (using Homebrew):**
```bash
brew install node@18
brew install pnpm
```

**Windows (using Chocolatey):**
```bash
choco install nodejs --version=18.0.0
choco install pnpm
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
```

Verify installation:
```bash
node --version    # Should be v18.x.x or higher
pnpm --version    # Should be 9.x.x or higher
```

### Step 3: Install Project Dependencies

```bash
cd expense-tracker-mobile
pnpm install
```

This installs all dependencies listed in `package.json`, including:
- React Native and Expo
- TypeScript
- Testing frameworks (Vitest)
- Build tools and CLI utilities

### Step 4: Install Expo CLI Globally (Optional but Recommended)

```bash
pnpm add -g expo-cli
```

Or use `npx`:
```bash
npx expo --version
```

### Step 5: Create Expo Account and Login

```bash
# Sign up for free at https://expo.dev if you don't have an account
expo login

# Enter your email and password when prompted
# Verify with the code sent to your email
```

Verify login:
```bash
expo whoami
```

---

## Running the App

### Option 1: Run in Web Browser (Fastest for Development)

```bash
pnpm dev
```

This starts:
- **Metro Bundler** on `http://localhost:8081` (JavaScript bundler)
- **Development Server** on `http://localhost:3000` (backend API)

Open your browser and navigate to `http://localhost:8081` to see the app.

### Option 2: Run in Expo Go (iOS/Android Device)

Expo Go is a free app that lets you test your app on a real device without building.

**Step 1: Install Expo Go**
- **iOS**: Download from [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

**Step 2: Start Development Server**
```bash
pnpm dev
```

**Step 3: Scan QR Code**
- Open Expo Go app
- Tap "Scan QR Code"
- Point camera at the QR code displayed in your terminal
- App will load on your device

**Step 4: Hot Reload**
- Edit any file and save
- App automatically reloads with your changes

### Option 3: Run on iOS Simulator (macOS only)

```bash
pnpm ios
```

Requirements:
- Xcode installed
- iOS Simulator running

### Option 4: Run on Android Emulator

```bash
pnpm android
```

Requirements:
- Android Studio installed
- Android Emulator running

---

## Testing

### Run All Tests

```bash
pnpm test
```

### Run Specific Test File

```bash
pnpm test lib/__tests__/calculations.test.ts
```

### Run Tests in Watch Mode

```bash
pnpm test -- --watch
```

### Generate Coverage Report

```bash
pnpm test -- --coverage
```

**Current Test Coverage:**
- ✅ 17 tests passing for calculations, filtering, and data aggregation
- Core business logic fully tested
- Safe to refactor with confidence

---

## Building for Production

### Local Build (Requires Native Tools)

#### Build for iOS (macOS only)

```bash
# Build for iOS (generates .ipa file)
eas build --platform ios --local

# Or use Xcode directly
xcode-select --install  # Install Xcode command line tools
cd ios
pod install
cd ..
npx react-native run-ios --configuration Release
```

#### Build for Android

```bash
# Build for Android (generates .apk or .aab file)
eas build --platform android --local

# Or use Gradle directly
cd android
./gradlew assembleRelease
cd ..
```

### Cloud Build (Recommended - No Local Setup Required)

Expo's EAS (Expo Application Services) handles building in the cloud, eliminating local build complexity.

**Step 1: Install EAS CLI**
```bash
pnpm add -g eas-cli
```

**Step 2: Configure EAS**
```bash
eas build:configure
```

This creates `eas.json` with build profiles.

**Step 3: Build for iOS**
```bash
eas build --platform ios
```

**Step 4: Build for Android**
```bash
eas build --platform android
```

**Step 5: Build for Both**
```bash
eas build --platform all
```

The build runs on Expo's servers. You'll receive a download link when complete.

**Advantages of Cloud Build:**
- No need to install Xcode or Android Studio locally
- Consistent builds across team members
- Automatic code signing
- Faster builds with Expo's infrastructure
- Works on Windows, macOS, and Linux

---

## Publishing to App Stores

### Prerequisites

Before submitting to app stores, ensure:
- ✅ App is built and tested on real devices
- ✅ All unit tests passing
- ✅ App version bumped in `app.config.ts`
- ✅ Privacy policy created
- ✅ App screenshots prepared (minimum 2, recommended 5)
- ✅ App description and keywords written

### iOS App Store (Apple)

#### Step 1: Create Apple Developer Account

1. Visit [developer.apple.com](https://developer.apple.com)
2. Sign in with Apple ID (create one if needed)
3. Enroll in Apple Developer Program ($99/year)
4. Accept agreements and set up payment

#### Step 2: Create App ID and Certificates

```bash
# Use Expo's managed signing (recommended)
eas build --platform ios

# Expo handles certificates automatically
```

Or manually:
1. Go to [Apple Developer Console](https://developer.apple.com/account)
2. Create new App ID (Bundle ID format: `space.manus.expense.tracker.mobile`)
3. Create provisioning profiles
4. Download and install certificates

#### Step 3: Create App Store Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps"
3. Click "+" and select "New App"
4. Fill in:
   - **App Name**: "Expense Tracker"
   - **Bundle ID**: `space.manus.expense.tracker.mobile`
   - **SKU**: Unique identifier (e.g., `expense-tracker-001`)
   - **Platform**: iOS
5. Click "Create"

#### Step 4: Fill in App Information

In App Store Connect, complete:
- **General Information**: Category (Finance), Subcategory (Personal Finance)
- **Pricing and Availability**: Set price (free or paid)
- **App Information**: Description, keywords, support URL
- **Screenshots**: Upload 5 screenshots (iPhone 6.7" and iPad 12.9")
- **Preview Video** (optional): 30-second app demo
- **App Review Information**: Contact details, demo account (if needed)

#### Step 5: Submit for Review

```bash
# Build for App Store
eas build --platform ios --auto-submit

# Or manually upload via Xcode
eas submit --platform ios
```

Apple reviews within 24-48 hours. You'll receive email notification of approval or rejection.

### Android Google Play Store

#### Step 1: Create Google Play Developer Account

1. Visit [play.google.com/console](https://play.google.com/console)
2. Sign in with Google account
3. Pay $25 one-time registration fee
4. Accept agreements

#### Step 2: Create Signing Key

```bash
# Expo manages this automatically
eas build --platform android

# Expo creates and securely stores your signing key
```

Or manually:
```bash
# Generate keystore
keytool -genkey -v -keystore expense-tracker.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias expense-tracker

# Store this file securely (never commit to git)
```

#### Step 3: Create App Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in:
   - **App name**: "Expense Tracker"
   - **Default language**: English
   - **App or game**: App
   - **Free or paid**: Free
4. Click "Create app"

#### Step 4: Fill in App Details

Complete these sections:
- **App access**: Select access type (Open, Closed, Internal Testing)
- **Content rating**: Fill out content rating questionnaire
- **Target audience**: Select age groups
- **Content**: Description, screenshots (minimum 2), feature graphic
- **Pricing**: Set to free or configure pricing
- **Distribution**: Select countries

#### Step 5: Upload Build and Submit

```bash
# Build and submit to Google Play
eas build --platform android --auto-submit

# Or manually upload
eas submit --platform android
```

Google Play reviews within 2-4 hours typically. You'll receive email notification.

---

## CI/CD Pipeline Setup

### Step 1: Create GitHub Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Expense Tracker mobile app"

# Create repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker-mobile.git
git branch -M main
git push -u origin main
```

### Step 2: Add GitHub Secrets

These secrets are used by CI/CD workflows for building and publishing.

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:

| Secret Name | Value | How to Get |
|-------------|-------|-----------|
| `EXPO_TOKEN` | Your Expo token | Run `expo whoami --non-interactive` and `expo login --non-interactive` |
| `APPLE_ID` | Your Apple ID email | Apple account email |
| `APPLE_PASSWORD` | Apple app-specific password | [Create at appleid.apple.com](https://appleid.apple.com/account/manage) |
| `APPLE_TEAM_ID` | Apple Team ID | [Apple Developer Account](https://developer.apple.com/account) |
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded keystore | `base64 expense-tracker.keystore \| tr -d '\n'` |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password | Password you created |
| `ANDROID_KEY_ALIAS` | Key alias | `expense-tracker` (from keytool command) |
| `ANDROID_KEY_PASSWORD` | Key password | Password you created |

### Step 3: Set Up GitHub Actions Workflows

The workflow files are provided in `.github/workflows/`:

- `test.yml` — Runs tests on every push/PR
- `build.yml` — Builds app for iOS and Android
- `publish.yml` — Publishes to app stores (manual trigger)

See the separate `CI_CD_SETUP.md` for detailed workflow configuration.

### Step 4: Enable Branch Protection

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - ✅ Require status checks to pass (tests must pass)
   - ✅ Require code reviews before merging
   - ✅ Dismiss stale pull request approvals

This ensures code quality before merging to main.

---

## Development Workflow

### Typical Development Day

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-recurring-expenses

# 3. Install any new dependencies
pnpm install

# 4. Run dev server
pnpm dev

# 5. Make changes and test locally
# Edit files, test in browser/device

# 6. Run tests
pnpm test

# 7. Commit changes
git add .
git commit -m "feat: add recurring expense support"

# 8. Push and create pull request
git push origin feature/add-recurring-expenses

# 9. GitHub Actions automatically:
#    - Runs tests
#    - Checks TypeScript
#    - Builds app
#    - Posts results on PR

# 10. After review and approval, merge to main
#     CI/CD pipeline automatically builds production version
```

### Version Bumping

Before publishing a new version:

```bash
# Update version in app.config.ts
# Change: version: "1.0.0" → version: "1.0.1"

# Commit
git add app.config.ts
git commit -m "chore: bump version to 1.0.1"
git push origin main

# Tag release
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1

# Trigger publish workflow (see CI_CD_SETUP.md)
```

---

## Troubleshooting

### Metro Bundler Won't Start

```bash
# Clear cache and restart
pnpm dev -- --reset-cache

# Or manually clear
rm -rf node_modules/.cache
pnpm dev
```

### Dependencies Conflict

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Expo Go App Won't Connect

```bash
# Make sure you're on same WiFi network
# Restart Expo Go app
# Scan QR code again

# Or use tunnel mode (slower but works anywhere)
pnpm dev -- --tunnel
```

### Build Fails on CI/CD

1. Check GitHub Actions logs: Repository → Actions → Failed workflow
2. Common issues:
   - Secrets not set correctly
   - Node version mismatch
   - Dependencies not installed
3. Re-run workflow after fixing

---

## Next Steps

1. **Set up GitHub repository** with this code
2. **Add GitHub secrets** for CI/CD
3. **Configure GitHub Actions workflows** (see `CI_CD_SETUP.md`)
4. **Create app store accounts** (Apple and Google)
5. **Build first production version** using EAS
6. **Submit to app stores** following the guides above
7. **Monitor app performance** and user feedback
8. **Plan feature updates** and iterate

---

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Store Connect Help](https://help.apple.com/app-store-connect)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## Support

For issues or questions:
- Check [Expo Community Forums](https://forums.expo.dev)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- Open issue on GitHub repository
- Contact Expo support at [support.expo.dev](https://support.expo.dev)
