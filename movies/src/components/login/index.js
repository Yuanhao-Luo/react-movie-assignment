import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from "../../firebase/FirebaseApp";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setUser} = useContext(MoviesContext);

    const app = FirebaseApp();
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setUser(user)
            setError('')
            props.action(false)
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message.substring(9);
            setError(errorMessage)
        });
    }

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setUser(user)
            setError('')
            props.action(false)
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message.substring(9);
            console.log(errorMessage)
            // ..
            setError(errorMessage)
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
            {error &&
                <DialogContentText id="error_info" color="red">
                    {error}
                </DialogContentText>
            }
            
        </DialogContent>

        <DialogActions>
            <Button id="Login" onClick={handleLogin}>Login</Button>
            <Button id="Register" onClick={handleRegister}>Register</Button>
        </DialogActions>
        </>
        
    );
};

export default Login;