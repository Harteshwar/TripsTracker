import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, QuerySnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAxfV_CQNecqZ7DmF5SFORFIBr4c1Q8gFU",
    authDomain: "triptracker-1144a.firebaseapp.com",
    projectId: "triptracker-1144a",
    storageBucket: "triptracker-1144a.appspot.com",
    messagingSenderId: "806879655402",
    appId: "1:806879655402:web:5a56750121c5e2b8156e93",
    measurementId: "G-1TFZ779HVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore service
const db = getFirestore(app);
// Initialize Firebase Auth with AsyncStorage for persistence
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

  export { db, app};