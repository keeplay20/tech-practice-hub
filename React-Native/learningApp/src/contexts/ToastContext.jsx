import { createContext, useContext, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const ToastContext = createContext();

export function ToastContextProvider({ children }) {
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const timerRef = useRef(null);

  const showToast = (msg, type) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(msg);
    setToastType(type);

    timerRef.current = setTimeout(() => {
      setMessage("");
      setToastType("");
    }, 3000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {message ? (
        <View
          style={[
            styles.container,
            { backgroundColor: toastType === "success" ? "green" : "red" },
          ]}
        >
          <Text style={styles.text}>{message}</Text>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 15,
    top: 50,
    left: 10,
    right: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
