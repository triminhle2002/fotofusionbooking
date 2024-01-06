import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBqeFN6z-BZxQH0dOoABNxV_rupX7ZxnkM",
    authDomain: "fotofushion-51865.firebaseapp.com",
    projectId: "fotofushion-51865",
    storageBucket: "fotofushion-51865.appspot.com",
    messagingSenderId: "592146594340",
    appId: "1:592146594340:web:dd0f32a5035271d0d036b1",
    measurementId: "G-73E8BDEK4Z"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage }