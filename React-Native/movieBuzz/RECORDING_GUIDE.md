# 📱 iOS Simulator Screen Recording Guide

## 🎬 How to Record Your MovieBuzz App Demo

### **Method 1: Built-in iOS Simulator Recording** ⭐ **Recommended**

#### **Step 1: Start Your App**

```bash
# In your MovieBuzz directory
npx expo start --ios
```

#### **Step 2: Open iOS Simulator**

- iOS Simulator should open automatically
- If not, open it manually: `Applications > Xcode > iOS Simulator`

#### **Step 3: Start Recording**

1. **In iOS Simulator menu**: `Device > Record Screen`
2. **Or use keyboard shortcut**: `Cmd + R`
3. **Choose save location** when prompted
4. **Recording starts immediately**

#### **Step 4: Demo Your App**

```
Suggested Demo Flow (60-90 seconds):
1. App launch & splash screen (3-5 seconds)
2. Home screen - show popular movies (10 seconds)
3. Scroll through movie lists (10 seconds)
4. Tap on a movie to view details (10 seconds)
5. Go back, use search feature (15 seconds)
6. Search for a movie (e.g., "Avengers") (10 seconds)
7. Add movie to watchlist (10 seconds)
8. Navigate to watchlist tab (10 seconds)
9. Show user profiles section (5 seconds)
10. Return to home (5 seconds)
```

#### **Step 5: Stop Recording**

1. **In iOS Simulator**: `Device > Stop Recording`
2. **Or keyboard shortcut**: `Cmd + R` again
3. **Save the .mov file**

---

### **Method 2: Using QuickTime Player**

#### **Steps:**

1. **Open QuickTime Player**
2. **File > New Screen Recording**
3. **Click the dropdown arrow** next to record button
4. **Select iOS Simulator** as camera/microphone source
5. **Click Record** and select the simulator window
6. **Demo your app** following the flow above
7. **Stop recording** (Cmd + Control + Esc)

---

### **Method 3: Using Command Line** (Advanced)

```bash
# Start recording iOS simulator
xcrun simctl io booted recordVideo MovieBuzz_Demo.mp4

# Stop recording (Ctrl+C in terminal)
# File will be saved as MovieBuzz_Demo.mp4
```

---

## 🎨 **Recording Best Practices**

### **Before Recording:**

- ✅ **Clean simulator**: Reset to home screen
- ✅ **Set proper device**: iPhone 14 Pro or iPhone 15 Pro (good screen size)
- ✅ **Check orientation**: Portrait mode
- ✅ **Close other apps**: Focus on your app only
- ✅ **Test the flow**: Practice your demo once

### **During Recording:**

- ✅ **Smooth movements**: Don't rush, show features clearly
- ✅ **Wait for loading**: Let images/data load completely
- ✅ **Show key features**: Search, details, watchlist, navigation
- ✅ **Natural pace**: 2-3 seconds per screen/action

### **After Recording:**

- ✅ **Review the video**: Check for smooth playback
- ✅ **Trim if needed**: Remove unnecessary parts
- ✅ **Optimize file size**: For web/portfolio use

---

## 📱 **Recommended iOS Simulator Settings**

### **Device Selection:**

```bash
# List available simulators
xcrun simctl list devices

# Boot specific device (example)
xcrun simctl boot "iPhone 15 Pro"
```

### **Best Devices for Recording:**

- **iPhone 15 Pro** (6.1" - Perfect balance)
- **iPhone 14 Pro** (6.1" - Good alternative)
- **iPhone 15 Pro Max** (6.7" - Larger screen)

### **Simulator Appearance:**

- **Appearance**: Dark mode (matches your app theme)
- **Scale**: 50% or 75% (better for recording)
- **Window > Physical Size** for realistic demo

---

## 🎬 **Creating Portfolio-Ready Videos**

### **Demo Script Checklist:**

```
□ App launch (show splash screen)
□ Home screen navigation
□ Movie browsing (popular/trending)
□ Movie details view
□ Search functionality
□ Add to watchlist
□ Watchlist management
□ User profiles
□ Smooth navigation between tabs
```

### **Technical Highlights to Show:**

- ✅ **Fast loading**: API data fetching
- ✅ **Smooth animations**: Page transitions
- ✅ **Responsive UI**: Touch interactions
- ✅ **Error handling**: Search with no results
- ✅ **Real data**: TMDB API integration

### **Video Specs for Portfolio:**

- **Resolution**: 1170x2532 (iPhone native)
- **Frame Rate**: 30 FPS
- **Duration**: 60-90 seconds
- **Format**: .mp4 or .mov
- **File Size**: Under 50MB for web

---

## 🎯 **Portfolio Integration**

### **Where to Use Your Recording:**

1. **Portfolio Website**: Embed as hero video
2. **GitHub README**: Add to project documentation
3. **LinkedIn**: Share as project showcase
4. **Resume Portfolio**: Include link or QR code
5. **Job Applications**: Demonstrate your skills

### **Video Description Template:**

```
🎬 MovieBuzz App Demo - React Native + TypeScript

Features showcased:
✅ Netflix-inspired UI design
✅ Real-time movie search (TMDB API)
✅ Movie details with cast information
✅ Watchlist management
✅ User profiles & navigation
✅ Cross-platform React Native implementation

Tech Stack: React Native, TypeScript, Expo, TMDB API
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**

**App won't start in simulator:**

```bash
# Clear Metro cache
npx expo start --clear
npx expo start --ios
```

**Simulator too slow:**

```bash
# Allocate more memory to simulator
# Simulator > Device > Erase All Content and Settings
# Restart simulator
```

**Recording quality poor:**

- Use iPhone 15 Pro or newer
- Set simulator to 75% scale
- Ensure good lighting on screen

**App crashes on simulator:**

```bash
# Reset simulator
npx expo start --ios --clear
# Or manually reset: Device > Erase All Content and Settings
```

---

## 📁 **File Organization**

```
portfolio-assets/
├── MovieBuzz_iOS_Demo.mov          # Main demo video
├── MovieBuzz_Screens/              # Screenshots
│   ├── home-screen.png
│   ├── movie-details.png
│   ├── search-results.png
│   └── watchlist.png
└── MovieBuzz_GIFs/                 # Short feature GIFs
    ├── search-demo.gif
    ├── watchlist-action.gif
    └── navigation-flow.gif
```

---

**🎬 Perfect for showcasing your React Native skills in action!**

_Create a compelling visual demonstration of your MovieBuzz app for maximum portfolio impact._
