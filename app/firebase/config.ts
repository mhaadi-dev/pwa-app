import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDAulwMR3W5p1YWlgLWv5LbuzjIrSrC_VE",
  authDomain: "webpush-notification-fb522.firebaseapp.com",
  projectId: "webpush-notification-fb522",
  storageBucket: "webpush-notification-fb522.firebasestorage.app",
  messagingSenderId: "507516122860",
  appId: "1:507516122860:web:efa59a834887b1d99ed7c9",
  measurementId: "G-N0Z5TKRQ7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging (Only in the browser)
let messaging: Messaging | null = null;

if (typeof window !== "undefined" && "Notification" in window) {
  messaging = getMessaging(app);
}

// Function to request notification permission
export const requestNotificationPermission = async () => {
  if (!messaging) {
    console.error("Messaging is not initialized (SSR detected).");
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BEIpLDnJCn2-zlEjx8dDNIVo3-36dJXxJ0S0RoDZOwNfEENcFEfi3WnYHQrc1sMNbm72ocrEyi_78mFnMCw3fwA",
      });

      if (token) {
        console.log("FCM Token:", token);
        return token;
      } else {
        console.error("Failed to retrieve FCM token.");
      }
    } else if (permission === "denied") {
      console.error("User denied the notification permission.");
      alert("You have blocked notifications. Please enable them in your browser settings.");
    } else {
      console.warn("Notification permission not granted yet.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

// Listen for foreground messages (Only in the browser)
if (typeof window !== "undefined" && messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    new Notification(payload.notification?.title || "New Notification", {
      body: payload.notification?.body,
    });
  });
}

export { messaging };
