import React, { useState } from "react";

import {
  auth,
  provider,
  createUserProfileDocument,
} from "./components/firebase";
import db from "./components/firebase";

import errorMessages from "./errorMessages.json"

import { Button, TextField } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function SignIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .catch((error) => alert(error.message));
  };

  const loginWithEmail = () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid } = userCredential.user;
        console.log("User ID:", uid);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = errorMessages[errorCode] || error.message;

        // Create the notification div
        const notificationDiv = document.createElement("div");
        notificationDiv.classList.add("Notification");
        notificationDiv.textContent = errorMessage;

        // Append the notification div to the document
        document.body.appendChild(notificationDiv);

        // Remove the notification div after 3 seconds
        setTimeout(() => {
            notificationDiv.remove();
        }, 3000);
        alert(errorMessage);
      });
  };

  return (
    <div className="login fix">
      <div className="login__container">
        <div className="login__header">
          <div className="login__exit">
            <CloseIcon style={{ width: "21px", height: "21px" }}  />
          </div>
          <TwitterIcon style={{ width: "36px", height: "36px" }} />
          <TwitterIcon style={{ width: "32px", height: "32px", color: "black" }} />
        </div>
        <h1>Sign in To Twitter</h1>

        <button onClick={signInWithGoogle} className="login__provider"><GoogleIcon />Sign in with <span className="login__google">Google</span></button>
        <button className="login__provider"><AppleIcon />Sign in with <span className="login__apple">Apple</span></button>
        <div className="login__lines">
          <div className="login__linesLeft"></div>
          <span className="login__or">or</span>
          <div className="login__linesRight"></div>
        </div>

        <div className="login__inputBox">
        <TextField
            id="username"
            label="Email Address"
            type="text"
            InputLabelProps={{ shrink: true }} 
            sx={{
                input: {
                    color: 'white',
                    "&::placeholder": {
                        opacity: 1,
                    },
                },
                label: { color: '#64686d' }
            }}
        />
        <TextField
            id="password"
            label="Password"
            type="text"
            InputLabelProps={{ shrink: true }} 
            sx={{
                input: {
                    color: 'white',
                    "&::placeholder": {
                        opacity: 1,
                    },
                },
                label: { color: '#64686d' }
            }}
        />
        </div>
        <br/>
        <button onClick={loginWithEmail} className="login__createAccount">Login</button>

        <div className="login__INFO login__Login">Don't have an account? <a href="/signup">Sign up</a></div>
      </div>
      {/* <h1 className="logo" alt="Slack logo">
        LOGIN
      </h1>
      {loggedIn ? (
        <div>
          <p className="login-message">You are now logged in.</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <>
          <Button onClick={signInWithGoogle}>Sign In with Google</Button>
          <Button onClick={signUpWithEmail}>Sign Up with Email</Button>
          <Button onClick={loginWithEmail}>Log in with Email</Button>

          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="dob"
            label="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
        </>
      )} */}
    </div>
  );
}

export default SignIn;
