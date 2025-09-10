import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { colors } from "../../styles/colors";
import { useAuthStore } from "../../stores/authStore";

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({
  navigation,
}: LoginScreenProps): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuthStore();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    clearError();
    await login(email, password);
  };

  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌍</Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Travel Explorer
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Welcome back, adventurer!
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              ref={emailInputRef}
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
              {...(Platform.OS === "android" && {
                underlineColorAndroid: "transparent",
                textAlignVertical: "center",
              })}
            />

            <TextInput
              ref={passwordInputRef}
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              {...(Platform.OS === "android" && {
                underlineColorAndroid: "transparent",
                textAlignVertical: "center",
              })}
            />

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text
                style={[styles.loginButtonText, { color: colors.background }]}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text
                style={[styles.forgotPasswordText, { color: colors.primary }]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {`Don't have an account?`}{" "}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[styles.signUpText, { color: colors.primary }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 50,
    ...(Platform.OS === "android" && {
      paddingVertical: 12,
      paddingHorizontal: 16,
    }),
  },
  loginButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
});
