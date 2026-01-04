# CI/CD Setup Guide for Expense Tracker

This guide explains how to set up continuous integration and continuous deployment (CI/CD) for automated testing, building, and publishing of the Expense Tracker app.

## Table of Contents

1. [Overview](#overview)
2. [GitHub Setup](#github-setup)
3. [Secrets Configuration](#secrets-configuration)
4. [Workflow Files](#workflow-files)
5. [Running Workflows](#running-workflows)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The CI/CD pipeline consists of three automated workflows:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **test.yml** | Push to main/develop, Pull requests | Run tests, linting, TypeScript checks |
| **build.yml** | Push to main, Manual trigger | Build app for iOS, Android, and web |
| **publish.yml** | Manual trigger only | Build and submit to app stores |

### Workflow Diagram

```
Push to GitHub
    ↓
[test.yml] ← Runs tests, linting
    ↓ (if tests pass)
[build.yml] ← Builds for iOS, Android, Web
    ↓ (manual trigger)
[publish.yml] ← Submits to App Store & Play Store
```

---

## GitHub Setup

### Step 1: Create GitHub Repository

```bash
# Initialize git
cd expense-tracker-mobile
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Expense Tracker mobile app"

# Create repository on GitHub at https://github.com/new
# Then add remote and push

git remote add origin https://github.com/YOUR_USERNAME/expense-tracker-mobile.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions", select **"Allow all actions and reusable workflows"**
4. Click **Save**

### Step 3: Create Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Fill in:
   - **Branch name pattern**: `main`
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require code reviews before merging** (minimum 1)
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**
4. Click **Create**

This ensures tests pass before code is merged to main.

---

## Secrets Configuration

GitHub Secrets are encrypted environment variables used by workflows for authentication and sensitive data.

### Step 1: Access Secrets Page

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Step 2: Add Required Secrets

Add each secret below by clicking "New repository secret" and filling in the name and value.

#### Expo Token (Required)

**Name**: `EXPO_TOKEN`

**How to get**:
```bash
# Log in to Expo
expo login

# Generate token (non-interactive)
expo login --non-interactive --username YOUR_USERNAME --password YOUR_PASSWORD

# Get token
expo whoami --non-interactive
```

**Value**: Your Expo authentication token

---

#### Apple ID (For iOS Publishing)

**Name**: `APPLE_ID`

**Value**: Your Apple ID email address (e.g., `your.email@example.com`)

---

#### Apple App-Specific Password

**Name**: `APPLE_PASSWORD`

**How to get**:
1. Go to [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Click **Security**
4. Under "App-Specific Passwords", click **Generate**
5. Select "Other (Custom description)" and enter "Expense Tracker CI/CD"
6. Click **Generate**
7. Copy the generated password

**Value**: The app-specific password (16 characters with spaces)

---

#### Apple Team ID

**Name**: `APPLE_TEAM_ID`

**How to get**:
1. Go to [developer.apple.com/account](https://developer.apple.com/account)
2. Click **Membership**
3. Find "Team ID" under "Team Information"

**Value**: Your Team ID (10 alphanumeric characters)

---

#### Android Keystore (Base64 Encoded)

**Name**: `ANDROID_KEYSTORE_BASE64`

**How to get**:

First, create a keystore file:
```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore expense-tracker.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias expense-tracker \
  -keypass YOUR_KEY_PASSWORD \
  -storepass YOUR_STORE_PASSWORD \
  -dname "CN=Expense Tracker, O=Your Company, C=US"

# Encode to Base64
base64 expense-tracker.keystore | tr -d '\n' > keystore.base64

# Copy the contents
cat keystore.base64
```

**Value**: The entire Base64-encoded keystore string (very long)

**Important**: Keep `expense-tracker.keystore` file safe and never commit to git. Add to `.gitignore`:
```bash
echo "expense-tracker.keystore" >> .gitignore
git add .gitignore
git commit -m "chore: add keystore to gitignore"
```

---

#### Android Keystore Password

**Name**: `ANDROID_KEYSTORE_PASSWORD`

**Value**: The password you used when creating the keystore (e.g., `YOUR_STORE_PASSWORD`)

---

#### Android Key Alias

**Name**: `ANDROID_KEY_ALIAS`

**Value**: The alias you used (from the keytool command above, e.g., `expense-tracker`)

---

#### Android Key Password

**Name**: `ANDROID_KEY_PASSWORD`

**Value**: The key password you used (from the keytool command above, e.g., `YOUR_KEY_PASSWORD`)

---

#### Slack Webhook (Optional)

**Name**: `SLACK_WEBHOOK`

**How to get** (optional, for build notifications):
1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app
3. Enable "Incoming Webhooks"
4. Create a new webhook for your channel
5. Copy the webhook URL

**Value**: Your Slack webhook URL (optional)

---

### Secrets Summary Table

| Secret Name | Required | Source |
|-------------|----------|--------|
| `EXPO_TOKEN` | ✅ Yes | Expo CLI |
| `APPLE_ID` | ✅ Yes (iOS) | Apple ID |
| `APPLE_PASSWORD` | ✅ Yes (iOS) | Apple ID Security |
| `APPLE_TEAM_ID` | ✅ Yes (iOS) | Apple Developer Account |
| `ANDROID_KEYSTORE_BASE64` | ✅ Yes (Android) | Generated locally |
| `ANDROID_KEYSTORE_PASSWORD` | ✅ Yes (Android) | You create |
| `ANDROID_KEY_ALIAS` | ✅ Yes (Android) | You create |
| `ANDROID_KEY_PASSWORD` | ✅ Yes (Android) | You create |
| `SLACK_WEBHOOK` | ❌ No | Slack App (optional) |

---

## Workflow Files

### test.yml - Testing Workflow

**Triggers**: 
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**What it does**:
1. Checks out code
2. Sets up Node.js (tests on 18.x and 20.x)
3. Installs dependencies
4. Runs TypeScript check
5. Runs linter
6. Runs unit tests
7. Uploads coverage to Codecov

**How to view results**:
1. Go to your repository
2. Click **Actions** tab
3. Click the workflow run
4. View logs and results

**Example output**:
```
✓ TypeScript check passed
✓ Linter passed
✓ 17 tests passed
✓ Coverage uploaded
```

---

### build.yml - Build Workflow

**Triggers**:
- Push to `main` branch
- Manual trigger (workflow_dispatch)

**What it does**:
1. Checks out code
2. Installs dependencies
3. Runs tests (must pass)
4. Builds for iOS using EAS
5. Builds for Android using EAS
6. Builds for web
7. Uploads build artifacts

**How to trigger manually**:
1. Go to **Actions** tab
2. Click **Build App** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

**Build time**: 
- iOS: ~15-20 minutes
- Android: ~10-15 minutes
- Web: ~2-3 minutes

---

### publish.yml - Publish Workflow

**Triggers**:
- Manual trigger only (workflow_dispatch)

**What it does**:
1. Checks out code
2. Installs dependencies
3. Builds for selected platform (iOS, Android, or both)
4. Submits to app stores (if auto_submit enabled)
5. Creates GitHub release
6. Sends Slack notification (optional)

**How to trigger**:
1. Go to **Actions** tab
2. Click **Publish to App Stores** workflow
3. Click **Run workflow**
4. Select options:
   - **Platform**: `ios`, `android`, or `all`
   - **Auto-submit**: Check to auto-submit to stores
5. Click **Run workflow**

**Important**: Only run this workflow when you're ready to publish!

---

## Running Workflows

### Automatic Workflows (test.yml)

These run automatically on every push and pull request:

```bash
# Push to main - automatically runs tests
git push origin main

# Create pull request - tests run automatically
# PR shows ✅ or ❌ based on test results

# Merge only allowed if tests pass (due to branch protection)
```

### Manual Build (build.yml)

To manually trigger a build:

1. Go to **Actions** → **Build App**
2. Click **Run workflow**
3. Select branch
4. Click **Run workflow**
5. Wait for build to complete
6. Download artifacts from the workflow run

### Manual Publish (publish.yml)

To publish to app stores:

```bash
# Option 1: Via GitHub UI
# Actions → Publish to App Stores → Run workflow
# Select platform and auto-submit option

# Option 2: Via GitHub CLI
gh workflow run publish.yml \
  -f platform=all \
  -f auto_submit=true
```

---

## Monitoring Builds

### GitHub Actions Dashboard

1. Go to your repository
2. Click **Actions** tab
3. View all workflow runs
4. Click a run to see details

### Build Status Badge

Add to your README.md:

```markdown
![Test & Lint](https://github.com/YOUR_USERNAME/expense-tracker-mobile/actions/workflows/test.yml/badge.svg)
![Build App](https://github.com/YOUR_USERNAME/expense-tracker-mobile/actions/workflows/build.yml/badge.svg)
```

### Viewing Logs

1. Click on a workflow run
2. Click a job
3. Expand steps to see detailed logs
4. Search for errors or specific output

---

## Troubleshooting

### Workflow Fails: "EXPO_TOKEN not found"

**Problem**: Workflow can't authenticate with Expo

**Solution**:
1. Check that `EXPO_TOKEN` secret is set
2. Verify token is valid: `expo whoami --non-interactive`
3. Regenerate token if expired

---

### Workflow Fails: "Apple credentials invalid"

**Problem**: iOS build fails due to Apple authentication

**Solution**:
1. Verify `APPLE_ID` and `APPLE_PASSWORD` are correct
2. Check that app-specific password hasn't expired
3. Ensure `APPLE_TEAM_ID` matches your account
4. Try regenerating app-specific password

---

### Workflow Fails: "Android keystore error"

**Problem**: Android build fails due to keystore issues

**Solution**:
1. Verify `ANDROID_KEYSTORE_BASE64` is properly encoded
2. Check that passwords match the keystore
3. Verify `ANDROID_KEY_ALIAS` is correct
4. Regenerate keystore if corrupted:
   ```bash
   keytool -genkey -v -keystore expense-tracker.keystore \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias expense-tracker
   ```

---

### Workflow Fails: "Tests failed"

**Problem**: Unit tests fail, blocking build

**Solution**:
1. Check test logs in GitHub Actions
2. Fix failing tests locally: `pnpm test`
3. Commit fix: `git commit -am "fix: failing tests"`
4. Push: `git push origin main`
5. Workflow automatically re-runs

---

### Build Takes Too Long

**Problem**: Build is stuck or taking longer than expected

**Solution**:
1. Check Expo build queue: [build.expo.dev](https://build.expo.dev)
2. Cancel stuck builds: `eas build:cancel`
3. Try rebuilding: `eas build --platform android --clear-cache`

---

## Best Practices

### 1. Always Run Tests Locally First

```bash
# Before pushing
pnpm test
pnpm check  # TypeScript
pnpm lint   # Linting
```

### 2. Use Meaningful Commit Messages

```bash
git commit -m "feat: add recurring expenses"
git commit -m "fix: balance calculation bug"
git commit -m "chore: update dependencies"
```

### 3. Create Pull Requests for Review

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git commit -m "feat: implement new feature"

# Push and create PR
git push origin feature/new-feature

# GitHub will run tests automatically
# Request review from team members
# Merge only after approval and tests pass
```

### 4. Version Your Releases

```bash
# Update version in app.config.ts
# version: "1.0.0" → version: "1.0.1"

git commit -m "chore: bump version to 1.0.1"
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin main --tags

# Then trigger publish workflow
```

### 5. Monitor Build History

Keep track of successful builds:
- Check GitHub Actions for build history
- Review app store submission status
- Monitor user feedback after release

---

## Advanced Configuration

### Custom Build Profiles

Edit `eas.json` to customize builds:

```json
{
  "build": {
    "staging": {
      "distribution": "internal",
      "ios": {
        "buildType": "simulator"
      }
    },
    "production": {
      "distribution": "store",
      "ios": {
        "resourceClass": "m1"
      }
    }
  }
}
```

### Environment-Specific Configuration

Use different configurations for different environments:

```bash
# Development build
eas build --profile development

# Staging build
eas build --profile staging

# Production build
eas build --profile production
```

### Scheduled Builds

Create nightly builds using cron:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily
```

---

## Next Steps

1. ✅ Set up GitHub repository
2. ✅ Configure GitHub secrets
3. ✅ Enable branch protection
4. ✅ Test workflow by pushing code
5. ✅ Monitor first build
6. ✅ Publish to app stores
7. ✅ Monitor app performance

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo EAS Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## Support

For issues:
1. Check GitHub Actions logs
2. Review Expo build logs: [build.expo.dev](https://build.expo.dev)
3. Search [Expo Community Forums](https://forums.expo.dev)
4. Open GitHub issue with workflow logs
