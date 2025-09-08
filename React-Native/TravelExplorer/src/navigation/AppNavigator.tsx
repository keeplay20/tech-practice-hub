import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Import navigators
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

// Simple auth context for Day 1 testing
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default function AppNavigator(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    console.log("🎉 User logged in successfully!");
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("👋 User logged out");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <NavigationContainer>
        {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
