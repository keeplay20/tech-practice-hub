import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyAdVXXA2EPuIWPu6lZ9Zkslw2_HBpx0csw",
  authDomain: "travelexplorer-1a766.firebaseapp.com",
  projectId: "travelexplorer-1a766",
  storageBucket: "travelexplorer-1a766.firebasestorage.app",
  messagingSenderId: "1009103546333",
  appId: "1:1009103546333:web:bbfc828e9cbb52450ab834",
  measurementId: "G-569SM6ZDBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = getAuth(app);

export { auth };
export default app;
