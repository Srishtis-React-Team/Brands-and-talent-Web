import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBk6ash6vVFZ1Z63n3UjOPhihqlkFAGlbw",
  authDomain: "brandsandtalent.firebaseapp.com",
  projectId: "brandsandtalent",
  storageBucket: "brandsandtalent.appspot.com",
  messagingSenderId: "301564582988",
  appId: "1:301564582988:web:ed1857f2f10ca27f34a8e9",
  measurementId: "G-FQPBVVZXZQ",
};

//

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const generateToken = async () => {
  // alert("generateToken");
  const permission = await Notification.requestPermission();

  let passToken;
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BOrRUsFr6qM_RnH76mGZmeCu3_zRjKrl9rshpQSB2QRRe38Q-NbFYEZ2Bm-VTapy9UgzUHw313RFfT1bu8slsp4",
    });

    localStorage.setItem("fcmToken", token);
    passToken = token;
  }
  return passToken;
};
