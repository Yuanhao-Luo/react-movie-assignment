import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


export function FirebaseApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyCx6hLW9yAkdJk9R-2ZpkcTr34YECZ_X8M",
        authDomain: "react-movie-assignment.firebaseapp.com",
        projectId: "react-movie-assignment",
        storageBucket: "react-movie-assignment.appspot.com",
        messagingSenderId: "274258953108",
        appId: "1:274258953108:web:7a3111d734d959358fc581",
        measurementId: "G-7XESDFCP9X"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return app;
}