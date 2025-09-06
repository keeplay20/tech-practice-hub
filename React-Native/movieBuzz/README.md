# 🎬 MovieBuzz

> **Your ultimate movie companion app built with React Native & Expo**

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-green.svg)](https://www.themoviedb.org/documentation/api)

## 📱 Features

### ✨ **Core Features**
- 🏠 **Home Screen**: Browse popular and trending movies
- 🔍 **Search**: Find movies with real-time search
- 📱 **Movie Details**: Comprehensive movie information with cast, genres, and trailers
- ❤️ **Watchlist**: Save movies to watch later
- 👤 **User Profiles**: Multiple user profile support
- 🎨 **Netflix-inspired UI**: Beautiful, modern interface

### 🚀 **Technical Features**
- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **TMDB API Integration**: Real movie data from The Movie Database
- **Custom Hooks**: Reusable logic for data fetching and state management
- **Optimized Images**: Lazy loading and caching
- **Navigation**: React Navigation with tab and stack navigation
- **Responsive Design**: Works on all device sizes

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **API**: The Movie Database (TMDB) API
- **State Management**: React Hooks & Context
- **Styling**: React Native StyleSheet
- **Icons**: Expo Vector Icons
- **Image Handling**: Custom OptimizedImage component

## 🎯 Architecture

```
src/
├── api/            # API client and services
├── components/     # Reusable UI components
├── constants/      # App configuration and colors
├── hooks/          # Custom React hooks
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # Business logic services
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mandarvyas/tech-practice-hub.git
   cd tech-practice-hub/React-Native/movieBuzz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Get TMDB API Key**
   - Visit [TMDB API](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Add the key to your `.env` file

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run on device**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal

## 📦 Building for Production

### Development Build
```bash
npm run build:preview
```

### Production Build
```bash
# Android APK
eas build --platform android --profile preview

# iOS Build
eas build --platform ios --profile production
```

## 🎨 Screenshots

| Home Screen | Movie Details | Search | Watchlist |
|-------------|---------------|---------|-----------|
| ![Home](docs/screenshots/home.png) | ![Details](docs/screenshots/details.png) | ![Search](docs/screenshots/search.png) | ![Watchlist](docs/screenshots/watchlist.png) |

## 🔧 Configuration

### App Configuration (`app.json`)
- App name: MovieBuzz
- Bundle identifier: `com.mandarvyas.moviebuzz`
- Supports: iOS, Android, Web
- Dark theme optimized

### Environment Variables
```bash
EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
```

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for distribution
eas build --platform all
```

### Manual Distribution
- APK builds available for Android testing
- Enterprise distribution for iOS

## 🎯 Future Enhancements

### Planned Features (Phase 3)
- 🎬 **Video Player**: In-app trailer playback
- 📱 **Offline Support**: Download movies for offline viewing
- 🔔 **Push Notifications**: New movie alerts
- 🔐 **Biometric Auth**: Face ID/Touch ID support
- 📊 **Analytics**: User engagement tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a personal portfolio and is available under the MIT License.

## 👨‍💻 Developer

**Mandar Vyas**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn URL]
- GitHub: [@mandarvyas](https://github.com/mandarvyas)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React Native](https://reactnative.dev/) team for the amazing framework
- [Expo](https://expo.dev/) for simplifying React Native development
- Netflix for design inspiration

---

⭐ **Star this repository if you found it helpful!**
