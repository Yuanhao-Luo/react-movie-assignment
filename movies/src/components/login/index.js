import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from "../../firebase/FirebaseApp";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = FirebaseApp();
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            console.log("login")
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
        });
    }

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={email}
                fullWidth
                variant="standard"
                onChange={handleEmail}
            />
            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                value={password}
                fullWidth
                variant="standard"
                onChange={handlePassword}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
        </DialogActions>
        </>
        
    );
};

export default Login;