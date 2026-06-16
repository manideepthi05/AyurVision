# GitHub Workflows Setup Guide

## Overview
This project uses GitHub Actions for continuous integration across:
- ✅ Web (React Native Web / Expo Web)
- ✅ Android (Expo/EAS Build)
- ✅ iOS (Expo/EAS Build)
- ✅ Backend API (Node.js/Express)

## Quick Start

### 1. Add Expo Token to GitHub Secrets
```bash
# Step 1: Generate token locally
expo login
expo tokens:list

# Step 2: Go to GitHub repo Settings
# Settings → Secrets and variables → Actions → New repository secret

# Step 3: Add secret
Name: EXPO_TOKEN
Value: <your-token>
```

### 2. Verify eas.json exists
The project should already have `eas.json`. Check:
```bash
cat eas.json
```

### 3. Commit and Push
```bash
git add .github/workflows/ci.yml
git commit -m "Add CI/CD pipeline"
git push origin main
```

## Workflow Files

### ci.yml (Main Pipeline)
Runs on every push and PR:
- **Lint** - Code quality (TypeScript, ESLint)
- **Web** - Build Expo web
- **Android** - Build APK with EAS
- **iOS** - Build IPA with EAS
- **Backend** - Test Node.js API
- **Dependencies** - Security audit
- **TypeScript** - Type checking

**Status**: ✅ Will run even with errors (allows monitoring)

### Optional: deployment.yml
For production releases (can be created on demand)

### Optional: test.yml
For unit/integration testing (can be created on demand)

## Configuration Details

### Node Version
Currently: `20` (LTS)
Edit line 7 in `ci.yml` to change

### Branches
Triggers on: `main`, `develop`
Edit lines 5-6 to add/remove branches

### Build Timeout
- Web: 10 minutes
- Other: Default (6 hours)

## Troubleshooting

### ❌ "EXPO_TOKEN not found"
```
Solution: Add EXPO_TOKEN to GitHub Secrets
```

### ❌ Android build fails
```
Check: Java 17 availability, Gradle config
```

### ❌ iOS build fails (macOS only)
```
Check: Xcode version, certificates, provisioning profiles
```

### ❌ Backend server won't start
```
Check: MongoDB connection, PORT availability
```

## Performance Tips

1. **Cache hits**: First run is slowest, subsequent runs use cache
2. **Parallel execution**: Jobs run in parallel when possible
3. **Selective builds**: Consider using workflow_dispatch for manual runs

## Security

- Never commit secrets in code
- Use GitHub Secrets for sensitive data
- Rotate tokens regularly
- Review GitHub Actions logs for exposed data

## Support Resources

- [Expo Docs](https://docs.expo.dev)
- [EAS Build](https://docs.expo.dev/build)
- [GitHub Actions](https://docs.github.com/en/actions)
- [React Native](https://reactnative.dev)
