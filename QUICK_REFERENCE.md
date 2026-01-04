# Quick Reference - Common Tasks

Fast lookup for common deployment and development tasks.

## Setup & Installation

### First Time Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/expense-tracker-mobile.git
cd expense-tracker-mobile

# Install dependencies
pnpm install

# Login to Expo
expo login

# Verify setup
expo whoami
```

### Install New Dependency
```bash
pnpm add package-name
pnpm add -D package-name  # dev dependency
```

---

## Local Development

### Start Development Server
```bash
pnpm dev
# Open http://localhost:8081 in browser
```

### Run on Device (Expo Go)
```bash
pnpm dev
# Scan QR code with Expo Go app
```

### Run on iOS Simulator
```bash
pnpm ios
```

### Run on Android Emulator
```bash
pnpm android
```

---

## Testing

### Run All Tests
```bash
pnpm test
```

### Run Specific Test
```bash
pnpm test lib/__tests__/calculations.test.ts
```

### Watch Mode (Re-run on file change)
```bash
pnpm test -- --watch
```

### Coverage Report
```bash
pnpm test -- --coverage
```

### Type Check
```bash
pnpm check
```

### Lint Code
```bash
pnpm lint
```

---

## Building

### Build for iOS (Cloud)
```bash
eas build --platform ios
```

### Build for Android (Cloud)
```bash
eas build --platform android
```

### Build for Both
```bash
eas build --platform all
```

### Build Locally (Requires Xcode/Android Studio)
```bash
eas build --platform ios --local
eas build --platform android --local
```

### Build Specific Profile
```bash
eas build --platform ios --profile production
eas build --platform ios --profile development
```

### Clear Build Cache
```bash
eas build --platform android --clear-cache
```

---

## Publishing

### Build and Auto-Submit to App Stores
```bash
eas build --platform all --auto-submit
```

### Build Only (Manual Submit Later)
```bash
eas build --platform all
```

### Submit Previously Built App
```bash
eas submit --platform ios
eas submit --platform android
```

### Check Build Status
```bash
eas build:list
```

### Download Build
```bash
# Get download link from eas build:list or build.expo.dev
```

---

## Git & GitHub

### Create Feature Branch
```bash
git checkout -b feature/my-feature
```

### Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
```

### Push to GitHub
```bash
git push origin feature/my-feature
```

### Create Pull Request
```bash
# Go to GitHub and create PR from feature branch to main
```

### Merge to Main
```bash
git checkout main
git pull origin main
git merge feature/my-feature
git push origin main
```

### Delete Branch
```bash
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Create Release Tag
```bash
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

---

## Version Management

### Update Version
```bash
# Edit app.config.ts
# Change: version: "1.0.0" → version: "1.0.1"

git add app.config.ts
git commit -m "chore: bump version to 1.0.1"
git push origin main
```

### Check Current Version
```bash
grep '"version"' app.config.ts
```

---

## Debugging

### Clear Cache
```bash
pnpm dev -- --reset-cache
```

### Clear Node Modules
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### View Logs
```bash
# Terminal output shows logs automatically
# Or check: ~/.expo/logs
```

### Debug in Browser
```bash
# Open http://localhost:8081
# Open DevTools (F12)
# Check Console tab
```

### Metro Debugger
```bash
# Press 'd' in terminal while pnpm dev is running
# Opens debugger in browser
```

---

## GitHub Actions

### View Workflow Status
```bash
# Go to: Repository → Actions tab
```

### Trigger Workflow Manually
```bash
# Via GitHub UI: Actions → Workflow → Run workflow

# Via CLI:
gh workflow run test.yml
gh workflow run build.yml
gh workflow run publish.yml -f platform=all -f auto_submit=true
```

### View Workflow Logs
```bash
# GitHub UI: Actions → Workflow run → Job → Step
```

### Cancel Running Workflow
```bash
# GitHub UI: Actions → Workflow run → Cancel workflow
```

---

## App Store Management

### Check iOS Build Status
```bash
# Go to: App Store Connect → Your App → Version
```

### Check Android Build Status
```bash
# Go to: Google Play Console → Your App → Release
```

### View iOS Reviews
```bash
# App Store Connect → Ratings and Reviews
```

### View Android Reviews
```bash
# Google Play Console → Reviews
```

### Respond to Review
```bash
# iOS: App Store Connect → Ratings and Reviews → Reply
# Android: Google Play Console → Reviews → Reply
```

---

## Troubleshooting

### Metro Won't Start
```bash
pnpm dev -- --reset-cache
# Or
rm -rf node_modules/.cache
pnpm dev
```

### Tests Failing
```bash
pnpm test
# Fix errors
git add .
git commit -m "fix: test failures"
git push origin main
```

### Build Fails
```bash
# Check GitHub Actions logs
# Common fixes:
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm test
git push origin main
```

### Expo Go Won't Connect
```bash
# Make sure on same WiFi
# Restart Expo Go app
# Scan QR code again
# Or use tunnel mode: pnpm dev -- --tunnel
```

### App Crashes
```bash
# Check terminal logs
# Check browser console (F12)
# Check Expo logs: ~/.expo/logs
```

---

## Performance

### Check Bundle Size
```bash
# Expo automatically optimizes
# View in terminal output
```

### Profile Performance
```bash
# In browser DevTools
# Performance tab → Record
# Perform actions
# Stop recording and analyze
```

### Monitor Memory
```bash
# Browser DevTools → Memory tab
# Take heap snapshot
# Analyze for leaks
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) | Complete setup guide |
| [CI_CD_SETUP.md](./CI_CD_SETUP.md) | GitHub Actions configuration |
| [APP_STORE_SUBMISSION.md](./APP_STORE_SUBMISSION.md) | App store submission |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment overview |
| [README.md](./README.md) | Project overview |

---

## Useful Links

- **Expo**: https://expo.dev
- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **GitHub**: https://github.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **Google Play Console**: https://play.google.com/console
- **Expo Build Status**: https://build.expo.dev

---

## Emergency Contacts

- **Expo Support**: support@expo.dev
- **GitHub Support**: https://support.github.com
- **Apple Support**: https://developer.apple.com/support
- **Google Support**: https://support.google.com/googleplay

---

**Tip**: Bookmark this page for quick reference during development!
