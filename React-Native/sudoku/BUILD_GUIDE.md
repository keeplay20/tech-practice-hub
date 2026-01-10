# Sudoku App - Build Instructions

## Prerequisites

1. **Install EAS CLI globally** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Create an Expo account** (if you don't have one):
   - Go to https://expo.dev/signup
   - Or run `eas login` and follow the prompts

## Building APK

### Option 1: Build APK for Testing (Recommended for First Build)

This creates an APK file that you can install directly on your Android device.

1. **Navigate to the project directory**:
   ```bash
   cd /Users/mandarvyas/personalGit/tech-practice-hub/React-Native/sudoku
   ```

2. **Login to Expo/EAS** (first time only):
   ```bash
   eas login
   ```
   Enter your Expo credentials.

3. **Configure the project** (first time only):
   ```bash
   eas build:configure
   ```
   - This will generate a project ID and update your `app.json`
   - Select "All" when asked which platforms

4. **Build the preview APK**:
   ```bash
   npm run build:preview
   ```
   OR
   ```bash
   eas build --platform android --profile preview
   ```

5. **Wait for the build to complete**:
   - The build will happen on Expo's cloud servers
   - You'll see a progress URL in the terminal
   - Takes about 5-15 minutes
   - You can close the terminal and check status at: https://expo.dev/accounts/[your-username]/projects/sudoku/builds

6. **Download the APK**:
   - Once complete, you'll get a download link
   - Download the APK file to your computer
   - Transfer it to your Android device
   - Enable "Install from Unknown Sources" on your phone
   - Install the APK

### Option 2: Build for Production (Google Play Store)

This creates an AAB (Android App Bundle) for publishing to Google Play Store.

```bash
npm run build:production
```

## Build Profiles Explained

The `eas.json` file contains three build profiles:

1. **development**: For development builds with debugging enabled
2. **preview**: Creates APK for internal testing (what we use above)
3. **production**: Creates AAB for Play Store submission

## Troubleshooting

### Issue: "eas: command not found"
**Solution**: Install EAS CLI globally:
```bash
npm install -g eas-cli
```

### Issue: "No project ID found"
**Solution**: Run `eas build:configure` to set up the project.

### Issue: Build fails with dependency errors
**Solution**: 
```bash
npm install
npx expo install --fix
```

### Issue: Permission denied during global install
**Solution**: 
```bash
sudo npm install -g eas-cli
```

## Alternative: Local Build (Advanced)

If you want to build locally instead of using EAS cloud build:

1. **Install Android Studio** and set up Android SDK
2. **Run prebuild**:
   ```bash
   npx expo prebuild --platform android
   ```
3. **Build locally**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
4. **Find APK at**:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

Note: Local builds are more complex and require Android development environment setup.

## Quick Reference Commands

```bash
# Login to EAS
eas login

# Configure project
eas build:configure

# Build APK for testing
npm run build:preview

# Build for production
npm run build:production

# Check build status
eas build:list

# View specific build details
eas build:view [build-id]
```

## Project Configuration Files

- **eas.json**: Build configuration
- **app.json**: App metadata and settings
- **package.json**: Build scripts

All files are now configured and ready to build! 🚀
