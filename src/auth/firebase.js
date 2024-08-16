import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk6ash6vVFZ1Z63n3UjOPhihqlkFAGlbw",
  authDomain: "brandsandtalent.firebaseapp.com",
  projectId: "brandsandtalent",
  storageBucket: "brandsandtalent.appspot.com",
  messagingSenderId: "301564582988",
  appId: "1:301564582988:web:ed1857f2f10ca27f34a8e9",
  measurementId: "G-FQPBVVZXZQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log('firebaseApp:', firebaseApp);

let messaging;

if ('serviceWorker' in navigator && 'PushManager' in window) {
  messaging = getMessaging(firebaseApp);

  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
} else {
  console.warn('Firebase Messaging is not supported in this environment.');
}

export const generateToken = async () => {
  if (!messaging) {
    console.warn('Messaging is not initialized due to lack of browser support.');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BOrRUsFr6qM_RnH76mGZmeCu3_zRjKrl9rshpQSB2QRRe38Q-NbFYEZ2Bm-VTapy9UgzUHw313RFfT1bu8slsp4",
      });
      if (token) {
        localStorage.setItem("fcmToken", token);
        console.log("FCM Token:", token);
        return token;
      } else {
        console.error("No registration token available. Request permission to generate one.");
      }
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
  }

  return null;
};

// Listen for incoming messages
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Customize notification handling here
  });
}
