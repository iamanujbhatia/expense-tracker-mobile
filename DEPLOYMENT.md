# Deployment & CI/CD Guide

Quick reference guide for deploying the Expense Tracker app.

## Quick Start

### 1. Local Development
```bash
pnpm install
pnpm dev
```

### 2. Run Tests
```bash
pnpm test
```

### 3. Build for Production
```bash
eas build --platform all
```

### 4. Publish to App Stores
```bash
eas build --platform all --auto-submit
```

---

## Full Documentation

| Document | Purpose |
|----------|---------|
| **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)** | Complete guide for setting up development environment, running app locally, and building for production |
| **[CI_CD_SETUP.md](./CI_CD_SETUP.md)** | Step-by-step guide for setting up GitHub Actions, configuring secrets, and automating builds |
| **[APP_STORE_SUBMISSION.md](./APP_STORE_SUBMISSION.md)** | Detailed guide for submitting to Apple App Store and Google Play Store |

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│ 1. LOCAL DEVELOPMENT                                        │
│ - Clone repo                                                │
│ - Install dependencies                                      │
│ - Run app locally (pnpm dev)                               │
│ - Make changes and test                                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ 2. COMMIT & PUSH                                            │
│ - Run tests locally (pnpm test)                            │
│ - Commit changes (git commit)                              │
│ - Push to GitHub (git push)                                │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ 3. GITHUB ACTIONS (AUTOMATIC)                              │
│ - test.yml runs tests                                       │
│ - build.yml builds app                                      │
│ - Results posted on PR/commit                              │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ 4. MANUAL PUBLISH (WHEN READY)                             │
│ - Trigger publish.yml workflow                             │
│ - Select platform (iOS/Android/both)                       │
│ - Auto-submit to app stores                                │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ 5. APP STORE REVIEW                                         │
│ - Apple: 24-48 hours                                        │
│ - Google: 2-4 hours                                         │
│ - Monitor status in console                                │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ 6. LIVE ON APP STORES                                       │
│ - Users can download                                        │
│ - Monitor reviews and ratings                              │
│ - Respond to feedback                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Commands

### Development
```bash
# Start dev server
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run in Expo Go (scan QR code)
pnpm dev
```

### Testing
```bash
# Run all tests
pnpm test

# Run specific test
pnpm test lib/__tests__/calculations.test.ts

# Watch mode
pnpm test -- --watch

# Coverage report
pnpm test -- --coverage
```

### Building
```bash
# Build locally
eas build --platform ios --local
eas build --platform android --local

# Build in cloud (recommended)
eas build --platform ios
eas build --platform android
eas build --platform all

# Build specific profile
eas build --platform ios --profile production
```

### Publishing
```bash
# Build and submit to app stores
eas build --platform all --auto-submit

# Build only (manual submission)
eas build --platform all

# Submit previously built app
eas submit --platform ios
eas submit --platform android
```

---

## GitHub Secrets Required

Before running CI/CD workflows, add these secrets to GitHub:

| Secret | Purpose |
|--------|---------|
| `EXPO_TOKEN` | Authenticate with Expo |
| `APPLE_ID` | Apple ID email |
| `APPLE_PASSWORD` | Apple app-specific password |
| `APPLE_TEAM_ID` | Apple Developer Team ID |
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded Android keystore |
| `ANDROID_KEYSTORE_PASSWORD` | Android keystore password |
| `ANDROID_KEY_ALIAS` | Android key alias |
| `ANDROID_KEY_PASSWORD` | Android key password |

See [CI_CD_SETUP.md](./CI_CD_SETUP.md#secrets-configuration) for detailed instructions.

---

## Typical Release Process

### 1. Prepare Release
```bash
# Update version
# Edit app.config.ts: version: "1.0.0" → "1.0.1"

git add app.config.ts
git commit -m "chore: bump version to 1.0.1"
git push origin main
```

### 2. Wait for Tests
- GitHub Actions automatically runs tests
- Check Actions tab for results
- Must pass before proceeding

### 3. Trigger Build
```bash
# Option A: Via GitHub UI
# Actions → Build App → Run workflow

# Option B: Via CLI
gh workflow run build.yml
```

### 4. Trigger Publish
```bash
# Option A: Via GitHub UI
# Actions → Publish to App Stores → Run workflow
# Select platform and auto-submit

# Option B: Via CLI
gh workflow run publish.yml \
  -f platform=all \
  -f auto_submit=true
```

### 5. Monitor App Store Review
- iOS: Check App Store Connect
- Android: Check Google Play Console
- Review time: iOS 24-48h, Android 2-4h

### 6. Release to Users
- iOS: Manual or automatic release
- Android: Automatic rollout (can be gradual)

---

## Troubleshooting

### Build Fails
1. Check GitHub Actions logs
2. Common issues:
   - Missing secrets
   - Node version mismatch
   - Dependency conflicts
3. Solution:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   pnpm test
   git push origin main
   ```

### Tests Fail
1. Run locally: `pnpm test`
2. Fix failing tests
3. Commit and push
4. Workflow automatically re-runs

### App Store Rejection
1. Read rejection reason carefully
2. Fix issue (usually privacy or content)
3. Update app description if needed
4. Resubmit

See [APP_STORE_SUBMISSION.md](./APP_STORE_SUBMISSION.md#troubleshooting) for detailed troubleshooting.

---

## Monitoring

### GitHub Actions
- Repository → Actions tab
- View workflow runs
- Check logs for errors

### Expo Build Status
- [build.expo.dev](https://build.expo.dev)
- View all builds
- Download artifacts
- Check build logs

### App Store Performance
- **iOS**: App Store Connect → Analytics
- **Android**: Google Play Console → Analytics
- Monitor downloads, crashes, ratings

---

## Best Practices

1. **Always run tests locally before pushing**
   ```bash
   pnpm test
   pnpm check  # TypeScript
   ```

2. **Use meaningful commit messages**
   ```bash
   git commit -m "feat: add recurring expenses"
   git commit -m "fix: balance calculation"
   ```

3. **Create pull requests for review**
   - Ensures code quality
   - Tests run automatically
   - Team can review

4. **Version your releases**
   - Update version in app.config.ts
   - Create git tags: `git tag -a v1.0.1`
   - Track releases on GitHub

5. **Monitor after release**
   - Check app store reviews
   - Monitor crash reports
   - Respond to user feedback

---

## Support

- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/en/actions)
- **App Store**: [help.apple.com/app-store-connect](https://help.apple.com/app-store-connect)
- **Google Play**: [support.google.com/googleplay](https://support.google.com/googleplay)

---

## Next Steps

1. ✅ Read [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)
2. ✅ Read [CI_CD_SETUP.md](./CI_CD_SETUP.md)
3. ✅ Set up GitHub repository
4. ✅ Configure GitHub secrets
5. ✅ Test CI/CD pipeline
6. ✅ Read [APP_STORE_SUBMISSION.md](./APP_STORE_SUBMISSION.md)
7. ✅ Submit to app stores
8. ✅ Monitor and iterate

---

**Ready to deploy?** Start with [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) →
