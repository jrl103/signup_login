import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBemtjjNJyYKU5ubfnhy1yQlRYy6TViRbg",
    authDomain: "authex-f963d.firebaseapp.com",
    projectId: "authex-f963d",
    storageBucket: "authex-f963d.appspot.com",
    messagingSenderId: "1064059643880",
    appId: "1:1064059643880:web:d939396539ee139744665d",
    measurementId: "G-GG3C1BG6WM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;