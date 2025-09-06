import { NavigationProp, RouteProp } from '@react-navigation/native';

// Define the param list for the main stack navigator
export type RootStackParamList = {
  Splash: undefined;
  UserScreen: undefined;
  HomeScreen: undefined;
  DetailScreen: { movieId: number };
};

// Define the param list for the bottom tab navigator
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Watchlist: undefined;
  Profile: undefined;
};

// Navigation prop types for screens
export type RootNavigationProp = NavigationProp<RootStackParamList>;
export type BottomTabNavigationProp = NavigationProp<BottomTabParamList>;

// Route prop types for screens
export type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Splash'>;
export type UserScreenRouteProp = RouteProp<RootStackParamList, 'UserScreen'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

// Screen props interfaces
export interface ScreenProps {
  navigation: RootNavigationProp;
}

export interface SplashScreenProps extends ScreenProps {
  route: SplashScreenRouteProp;
}

export interface UserScreenProps extends ScreenProps {
  route: UserScreenRouteProp;
}

export interface HomeScreenProps extends ScreenProps {
  route: HomeScreenRouteProp;
}

export interface DetailScreenProps extends ScreenProps {
  route: DetailScreenRouteProp;
}

// Declare global types for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

