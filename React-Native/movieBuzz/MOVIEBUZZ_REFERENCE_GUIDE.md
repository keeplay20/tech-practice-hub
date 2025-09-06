# 🎬 MovieBuzz App - Complete Reference Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Phase Breakdown](#phase-breakdown)
5. [Component Specifications](#component-specifications)
6. [API Design](#api-design)
7. [Data Models](#data-models)
8. [Implementation Guidelines](#implementation-guidelines)
9. [Learning Objectives](#learning-objectives)

---

## 🎯 Project Overview

### Vision
Build a Netflix-inspired movie streaming app using React Native to practice all major RN concepts while creating a production-ready application.

### Key Features
- **User Management**: Profile selection and authentication
- **Movie Discovery**: Browse popular, trending, and categorized movies
- **Search & Filter**: Find movies with advanced filtering
- **Watchlist**: Save and manage favorite movies
- **Offline Support**: Download and sync capabilities
- **Video Playback**: Custom video player with controls
- **Push Notifications**: New releases and recommendations

### Success Metrics
- Complete all 4 phases of development
- Implement 20+ React Native concepts
- Create reusable component library
- Achieve smooth 60fps performance
- Support offline functionality

---

## 🛠️ Technology Stack

```json
{
  "core": {
    "framework": "React Native 0.79+",
    "language": "TypeScript",
    "bundler": "Metro"
  },
  "navigation": {
    "library": "@react-navigation/native",
    "types": ["Stack", "Bottom Tab", "Drawer"]
  },
  "ui": {
    "styling": "StyleSheet + Custom Theme",
    "animations": "react-native-reanimated v3",
    "gestures": "react-native-gesture-handler"
  },
  "data": {
    "networking": "Axios",
    "caching": "Custom Cache Service",
    "storage": "AsyncStorage + SQLite",
    "state": "Context API + Custom Hooks"
  },
  "media": {
    "video": "react-native-video",
    "images": "react-native-fast-image"
  },
  "platform": {
    "notifications": "react-native-firebase",
    "analytics": "Firebase Analytics",
    "security": "react-native-keychain"
  },
  "development": {
    "testing": "Jest + React Native Testing Library",
    "linting": "ESLint + Prettier",
    "typing": "TypeScript strict mode"
  }
}
```

---

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                   │
├─────────────────────────────────────────────────────────┤
│ Screens │ Components │ Navigation │ Animations │ Theme  │
├─────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC LAYER                 │
├─────────────────────────────────────────────────────────┤
│ Custom Hooks │ Services │ Utils │ State Management      │
├─────────────────────────────────────────────────────────┤
│                      DATA LAYER                         │
├─────────────────────────────────────────────────────────┤
│ API Client │ Cache │ Storage │ Sync Manager             │
├─────────────────────────────────────────────────────────┤
│                   EXTERNAL SERVICES                     │
├─────────────────────────────────────────────────────────┤
│ TMDB API │ Firebase │ Video CDN │ Push Notifications    │
└─────────────────────────────────────────────────────────┘
```

### Folder Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Button, Input, etc.)
│   ├── movies/          # Movie-specific components
│   └── media/           # Video/Audio components
├── screens/             # Screen components
│   ├── auth/           # Authentication screens
│   ├── home/           # Home and discovery screens
│   ├── search/         # Search functionality
│   └── profile/        # User profile screens
├── navigation/          # Navigation configuration
├── services/           # API and business logic
│   ├── api/           # HTTP client and endpoints
│   ├── cache/         # Caching mechanisms
│   └── storage/       # Local data storage
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # App constants and config
└── assets/             # Images, fonts, etc.
```

---

## 🎯 Phase Breakdown

### 📱 Phase 1: Core Features (3-4 weeks)
**Goal**: Basic app with navigation, movie lists, and search

#### Key Features:
1. **Navigation System**
   - Stack navigator for main flow
   - Bottom tab navigator for main sections
   - Smooth transitions between screens

2. **Movie Display**
   - Home screen with featured content
   - Horizontal movie lists (Popular, Trending)
   - Movie detail screen with full information
   - Optimized image loading and caching

3. **Search Functionality**
   - Real-time search with debouncing
   - Search history and suggestions
   - Filter by genre, year, rating

4. **Basic Watchlist**
   - Add/remove movies from watchlist
   - Persistent storage with AsyncStorage
   - Watchlist screen with saved movies

#### React Native Concepts Practiced:
- Navigation (Stack + Tab)
- FlatList optimization
- Custom hooks
- AsyncStorage
- API integration
- Image caching
- State management

### 🎨 Phase 2: Enhanced UX (2-3 weeks)
**Goal**: Smooth animations and intuitive gestures

#### Key Features:
1. **Hero Animations**
   - Shared element transitions
   - Movie card to detail screen
   - Smooth page transitions

2. **Gesture Interactions**
   - Swipe to add to watchlist
   - Pull-to-refresh functionality
   - Swipe navigation between tabs

3. **Loading States**
   - Skeleton loaders
   - Shimmer effects
   - Error boundaries and retry mechanisms

4. **Performance Optimization**
   - Lazy loading components
   - Virtualized lists
   - Memory leak prevention

#### React Native Concepts Practiced:
- React Native Reanimated v3
- Gesture Handler
- Performance optimization
- Error boundaries
- Custom animations

### 🚀 Phase 3: Advanced Features (4-5 weeks)
**Goal**: Offline support, media, and platform integration

#### Key Features:
1. **Offline System**
   - Download movies for offline viewing
   - Sync data when online
   - Conflict resolution

2. **Video Player**
   - Custom controls
   - Picture-in-picture mode
   - Closed captions support

3. **Push Notifications**
   - New movie alerts
   - Personalized recommendations
   - Background app refresh

4. **Security & Auth**
   - Biometric authentication
   - Secure token storage
   - User session management

#### React Native Concepts Practiced:
- SQLite database
- Background tasks
- Native modules
- Biometric authentication
- Push notifications
- Video handling

### ✨ Phase 4: Polish (2-3 weeks)
**Goal**: Production-ready with monitoring and accessibility

#### Key Features:
1. **Performance Monitoring**
   - Crash reporting
   - Performance metrics
   - User analytics

2. **Accessibility**
   - Screen reader support
   - Dynamic font sizing
   - High contrast mode

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E testing

4. **Deployment**
   - CI/CD pipeline
   - Code signing
   - Store deployment

#### React Native Concepts Practiced:
- Performance monitoring
- Accessibility APIs
- Testing strategies
- CI/CD with RN
- App store deployment

---

## 🧩 Component Specifications

### Core Components

#### MovieCard Component
```typescript
interface MovieCardProps {
  movie: Movie;
  size: 'small' | 'medium' | 'large';
  onPress: (movie: Movie) => void;
  onAddToWatchlist?: (movie: Movie) => void;
  showRating?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Features:
// - Optimized image loading
// - Gesture support (tap, long press)
// - Loading and error states
// - Accessibility support
```

#### MovieList Component
```typescript
interface MovieListProps {
  title: string;
  movies: Movie[];
  horizontal?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  onMoviePress: (movie: Movie) => void;
}

// Features:
// - Virtualized rendering
// - Infinite scroll
// - Pull-to-refresh
// - Loading indicators
```

#### SearchBar Component
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  suggestions?: string[];
  debounceMs?: number;
}

// Features:
// - Debounced search
// - Auto-suggestions
// - Clear functionality
// - Voice search support
```

### Screen Components

#### HomeScreen
```typescript
interface HomeScreenState {
  featuredMovie: Movie | null;
  popularMovies: Movie[];
  trendingMovies: Movie[];
  continueWatching: Movie[];
  loading: boolean;
  error: string | null;
}

// Features:
// - Multiple horizontal lists
// - Featured content hero
// - Continue watching section
// - Refresh functionality
```

#### DetailScreen
```typescript
interface DetailScreenProps {
  route: RouteProp<{ movie: Movie }>;
}

// Features:
// - Hero image with parallax
// - Movie information display
// - Action buttons (play, watchlist)
// - Related movies
// - Reviews and ratings
```

---

## 🔌 API Design

### TMDB API Integration

#### Base Configuration
```typescript
const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  API_KEY: process.env.TMDB_API_KEY,
  LANGUAGE: 'en-US',
  REGION: 'US'
};
```

#### Endpoints
```typescript
// Movie endpoints
GET /movie/popular          // Popular movies
GET /movie/top_rated        // Top rated movies
GET /movie/now_playing      // Now playing movies
GET /movie/upcoming         // Upcoming movies
GET /movie/{id}            // Movie details
GET /movie/{id}/videos     // Movie trailers
GET /movie/{id}/credits    // Movie cast and crew
GET /movie/{id}/similar    // Similar movies

// Search endpoints
GET /search/movie          // Search movies
GET /search/person         // Search people
GET /search/multi          // Multi search

// Discovery endpoints
GET /discover/movie        // Discover movies with filters
GET /genre/movie/list      // Movie genres

// Configuration endpoints
GET /configuration         // API configuration
```

#### Response Models
```typescript
interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}
```

### Service Layer Design

#### MovieService
```typescript
class MovieService {
  private cache: CacheService;
  private client: AxiosInstance;

  async getPopularMovies(page: number = 1): Promise<MovieResponse>;
  async getTrendingMovies(timeWindow: 'day' | 'week'): Promise<MovieResponse>;
  async getMovieDetails(id: number): Promise<MovieDetails>;
  async searchMovies(query: string, page: number = 1): Promise<MovieResponse>;
  async getMovieVideos(id: number): Promise<VideoResponse>;
  async getMovieCredits(id: number): Promise<CreditsResponse>;
  async discoverMovies(filters: DiscoverFilters): Promise<MovieResponse>;
}
```

#### CacheService
```typescript
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheService {
  private cache: Map<string, CacheItem<any>>;

  get<T>(key: string): T | null;
  set<T>(key: string, data: T, ttl: number): void;
  invalidate(pattern: string): void;
  clear(): void;
  size(): number;
}
```

---

## 💾 Data Models

### Local Storage Schema

#### AsyncStorage Keys
```typescript
const STORAGE_KEYS = {
  // User data
  USER_PROFILE: '@moviebuzz:user_profile',
  SELECTED_USER: '@moviebuzz:selected_user',
  
  // Movie data
  WATCHLIST: '@moviebuzz:watchlist',
  FAVORITES: '@moviebuzz:favorites',
  CONTINUE_WATCHING: '@moviebuzz:continue_watching',
  RECENTLY_VIEWED: '@moviebuzz:recently_viewed',
  
  // App state
  USER_PREFERENCES: '@moviebuzz:preferences',
  SEARCH_HISTORY: '@moviebuzz:search_history',
  
  // Cache metadata
  CACHE_METADATA: '@moviebuzz:cache_metadata',
  LAST_SYNC: '@moviebuzz:last_sync'
};
```

#### Data Structures
```typescript
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  preferences: UserPreferences;
  createdAt: string;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  region: string;
  adultContent: boolean;
  autoplay: boolean;
  downloadQuality: 'SD' | 'HD' | 'FHD';
  notifications: NotificationSettings;
}

interface WatchlistItem {
  movieId: number;
  addedAt: string;
  movie: Movie;
}

interface ContinueWatchingItem {
  movieId: number;
  progress: number; // 0-100 percentage
  duration: number; // total duration in seconds
  lastWatched: string;
  movie: Movie;
}

interface SearchHistoryItem {
  query: string;
  timestamp: string;
  resultCount: number;
}
```

### SQLite Schema (Phase 3)
```sql
-- Movies table
CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  overview TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date TEXT,
  vote_average REAL,
  vote_count INTEGER,
  popularity REAL,
  adult INTEGER DEFAULT 0,
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User watchlist
CREATE TABLE watchlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Download queue
CREATE TABLE downloads (
  id TEXT PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  quality TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  progress REAL DEFAULT 0,
  file_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Sync operations
CREATE TABLE sync_operations (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  data TEXT,
  synced INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎯 Implementation Guidelines

### Development Workflow

#### Git Workflow
```bash
# Branch naming convention
feature/phase-1/home-screen
feature/phase-2/hero-animations
bugfix/search-performance
refactor/component-structure

# Commit message format
feat(home): add popular movies list
fix(search): resolve debouncing issue
refactor(components): extract movie card logic
test(api): add movie service unit tests
```

#### Code Organization Principles
1. **Single Responsibility**: Each component/hook/service has one clear purpose
2. **Composition over Inheritance**: Prefer composition patterns
3. **DRY (Don't Repeat Yourself)**: Extract common logic into hooks/utils
4. **YAGNI (You Aren't Gonna Need It)**: Don't over-engineer early phases
5. **Consistent Naming**: Use consistent naming conventions throughout

#### Performance Guidelines
```typescript
// Do: Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Do: Optimize FlatList rendering
const renderItem = useCallback(({ item }) => (
  <MovieCard movie={item} onPress={handlePress} />
), [handlePress]);

// Do: Use lazy loading for screens
const DetailScreen = React.lazy(() => import('./DetailScreen'));

// Don't: Create objects in render
// Bad:
<Component style={{ marginTop: 10 }} />
// Good:
const styles = StyleSheet.create({
  container: { marginTop: 10 }
});
```

### Testing Strategy

#### Test Structure
```
__tests__/
├── components/          # Component tests
├── hooks/              # Custom hook tests
├── services/           # Service layer tests
├── screens/            # Screen integration tests
├── utils/              # Utility function tests
└── e2e/               # End-to-end tests
```

#### Testing Types
1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: Component interactions and data flow
3. **E2E Tests**: Full user journeys
4. **Performance Tests**: Render performance and memory usage

---

## 🎓 Learning Objectives

### Phase-wise Learning Goals

#### Phase 1: Foundation
- ✅ React Navigation patterns and best practices
- ✅ FlatList optimization and virtualization
- ✅ Custom hooks for state management and side effects
- ✅ API integration with error handling and loading states
- ✅ Image optimization and caching strategies
- ✅ AsyncStorage for simple data persistence
- ✅ TypeScript with React Native

#### Phase 2: Advanced UI
- ✅ React Native Reanimated v3 for smooth animations
- ✅ Gesture Handler for touch interactions
- ✅ Performance profiling and optimization techniques
- ✅ Error boundaries and graceful error handling
- ✅ Custom component design patterns
- ✅ Advanced styling techniques and theming

#### Phase 3: Platform Integration
- ✅ SQLite for complex data storage
- ✅ Background task management and sync strategies
- ✅ Push notification implementation and handling
- ✅ Native module integration and platform-specific code
- ✅ Security best practices (Keychain, encryption)
- ✅ Media handling and video player implementation

#### Phase 4: Production Ready
- ✅ Performance monitoring and crash reporting
- ✅ Accessibility implementation and testing
- ✅ Comprehensive testing strategies
- ✅ CI/CD pipeline setup and automation
- ✅ App store deployment and release management
- ✅ Code quality and maintainability practices

### Skills Assessment Checklist

#### Junior Level ✅
- [ ] Can create basic screens with navigation
- [ ] Can implement simple lists with FlatList
- [ ] Can integrate with REST APIs
- [ ] Can handle basic state with hooks
- [ ] Can style components with StyleSheet

#### Mid Level ✅
- [ ] Can optimize performance of large lists
- [ ] Can implement complex animations
- [ ] Can design reusable component architectures
- [ ] Can handle offline scenarios
- [ ] Can implement custom gesture interactions

#### Senior Level ✅
- [ ] Can architect scalable app structure
- [ ] Can implement complex sync strategies
- [ ] Can optimize for different devices and OS versions
- [ ] Can implement security best practices
- [ ] Can set up complete development and deployment pipeline

---

## 📚 Additional Resources

### Documentation
- [React Native Official Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation v6](https://reactnavigation.org/docs/getting-started)
- [React Native Reanimated v3](https://docs.swmansion.com/react-native-reanimated/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

### Libraries and Tools
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [react-native-video](https://github.com/react-native-video/react-native-video)
- [react-native-firebase](https://rnfirebase.io/)
- [Flipper](https://fbflipper.com/) for debugging

### Learning Resources
- [React Native Express](http://www.reactnativeexpress.com/)
- [Start React Native](https://start.reactnativeexpress.com/)
- [React Native School](https://reactnativeschool.com/)

---

## 🏁 Getting Started Checklist

### Environment Setup
- [ ] Node.js (v16+) installed
- [ ] React Native CLI installed
- [ ] Android Studio / Xcode setup
- [ ] Device/Emulator configured
- [ ] VS Code with React Native extensions

### Project Setup
- [ ] Initialize React Native project with TypeScript
- [ ] Install core dependencies (navigation, reanimated, etc.)
- [ ] Setup folder structure
- [ ] Configure ESLint and Prettier
- [ ] Setup Git repository and initial commit

### Development Setup
- [ ] TMDB API key obtained and configured
- [ ] Environment variables setup
- [ ] Debug tools configured (Flipper, React Native Debugger)
- [ ] Testing framework setup
- [ ] CI/CD pipeline basic configuration

---

*This reference guide will be your single source of truth throughout the MovieBuzz development journey. Update it as you learn and discover new patterns!*

