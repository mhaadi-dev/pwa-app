importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDAulwMR3W5p1YWlgLWv5LbuzjIrSrC_VE",
  authDomain: "webpush-notification-fb522.firebaseapp.com",
  projectId: "webpush-notification-fb522",
  storageBucket: "webpush-notification-fb522.firebasestorage.app",
  messagingSenderId: "507516122860",
  appId: "YOUR_APP_ID",
  appId: "1:507516122860:web:efa59a834887b1d99ed7c9",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});
// apiKey: "AIzaSyDAulwMR3W5p1YWlgLWv5LbuzjIrSrC_VE",
//   authDomain: "webpush-notification-fb522.firebaseapp.com",
//   projectId: "webpush-notification-fb522",
//   storageBucket: "webpush-notification-fb522.firebasestorage.app",
  

//   measurementId: "G-N0Z5TKRQ7L"