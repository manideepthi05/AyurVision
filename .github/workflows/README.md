# CI/CD Setup for Planty

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Files

- **ci.yml** - Main CI/CD pipeline that runs on push and pull requests

## Required GitHub Secrets

To make the full CI/CD pipeline work, add these secrets to your GitHub repository:

### Expo Configuration
- `EXPO_TOKEN` - Your Expo authentication token
  - Generate at: https://expo.dev/settings/tokens
  - Instructions: `expo login` then `expo whoami --non-interactive`

### Optional: EAS Build Credentials
- `EAS_PROJECT_ID` - Your EAS project ID (found in `eas.json`)

## Setup Instructions

### 1. Configure Expo Token
```bash
# On your local machine
expo login
expo whoami --non-interactive

# Copy the token and add it to GitHub Secrets
# Settings → Secrets and variables → Actions → New repository secret
# Name: EXPO_TOKEN
```

### 2. Update EAS Configuration
Ensure your `eas.json` is properly configured:
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "distribution": "internal",
      "android": {
        "gradleCommand": "./gradlew assembleDebug"
      },
      "ios": {
        "buildConfiguration": "Debug"
      }
    },
    "production": {
      "android": {},
      "ios": {}
    }
  }
}
```

### 3. Environment Variables
Create a `.env` file in the root (never commit this):
```
EXPO_TOKEN=your_token_here
```

## Workflow Details

### Jobs

1. **Lint** - TypeScript and code quality checks
   - Runs: `npm run lint`

2. **Web Build** - Builds web version
   - Runs: `npm run web`

3. **Android Build** - Builds Android APK/AAB
   - Uses EAS Build or Expo CLI
   - Requires: Java 17, Android SDK
   - Requires: `EXPO_TOKEN` secret

4. **iOS Build** - Builds iOS app
   - Runs on: macOS
   - Uses EAS Build or Expo CLI
   - Requires: Xcode, CocoaPods
   - Requires: `EXPO_TOKEN` secret

5. **Backend Build** - Tests Node.js backend
   - Services: MongoDB (Docker)
   - Validates all models, routes, middleware
   - Checks API connectivity

6. **Dependency Check** - Security audit
   - Checks: `npm audit` for vulnerabilities

7. **TypeScript Check** - Type validation
   - Runs: `npx tsc --noEmit`

8. **CI Summary** - Overall status check

## Triggering the Workflow

The workflow runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

To manually trigger:
1. Go to: GitHub → Actions → CI/CD Pipeline
2. Click: "Run workflow"

## Debugging Failed Builds

### Check Logs
1. Go to: GitHub → Actions
2. Select the failed workflow run
3. Click the failed job to see detailed logs

### Common Issues

**Lint Failure**
```bash
npm run lint
# Fix issues locally before pushing
```

**Android Build Failure**
- Ensure Java 17 is configured
- Check Gradle sync issues in `android/build.gradle`

**iOS Build Failure**
- Requires valid Apple Developer credentials
- Check Xcode build settings

**Backend Server Issues**
- Verify MongoDB connection string
- Check `.env` file configuration

## Local Testing

To test the workflow locally before pushing:

```bash
# Test lint
npm run lint

# Test web build
npm run web

# Test backend
cd server
npm install
npm start
```

## Caching

The workflow uses npm caching to speed up builds:
- Dependencies are cached between runs
- Significantly reduces build time

## Cost Optimization

- Android & iOS builds use `continue-on-error: true` for non-critical steps
- Web build has a 10-minute timeout
- Parallel job execution reduces overall pipeline time

## Next Steps

1. Commit and push `.github/workflows/ci.yml` to your repository
2. Add `EXPO_TOKEN` to GitHub Secrets
3. Update `eas.json` if needed
4. Create a pull request to test the workflow
