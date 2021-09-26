import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9CTFpNK3wZBlqr2wuAoYPcHkO-t-4MtE",
  authDomain: "emergency-monitor-hz21.firebaseapp.com",
  databaseURL: "https://emergency-monitor-hz21-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "emergency-monitor-hz21",
  storageBucket: "emergency-monitor-hz21.appspot.com",
  messagingSenderId: "417647155833",
  appId: "1:417647155833:web:f6541c4ef52a1c405252a8"
};

export const getActionCodeSettings = (document: Document) => ({
    url: `${document.location.origin}/app`,
    handleCodeInApp: true
});

if (!getApps().length) {
    initializeApp(firebaseConfig);
    console.log("Firebase was successfully initialised")
}
