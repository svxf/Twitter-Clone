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

function SignUp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const signInWithGoogle = () => {
    const username = document.getElementById("username").value;

    auth
      .signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        if (user) {
          const userRef = db.doc(`users/${user.uid}`);
          userRef.get().then((snapshot) => {
            if (!snapshot.exists) {
              if (username !== "" && username) {
                createUserProfileDocument(user, { username, dob });
                setLoggedIn(true);
              }
            } else {
              setLoggedIn(true);
              navigate("/");
            }
          });
        }
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

  const signUpWithEmail = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("email").value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const { user } = result;
        if (user) {
          const userRef = db.doc(`users/${user.uid}`);
          userRef.get().then((snapshot) => {
            if (!snapshot.exists) {
              if (username) {
                createUserProfileDocument(user, { username, dob });
                setLoggedIn(true);
              }
            } else {
              setLoggedIn(true);
              navigate("/");
            }
          });
        }
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

  const loginWithEmail = () => {
    const email = document.getElementById("email").value;
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
        alert(error.message);
      });
  };

  const logout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <div className="login__exit">
            <CloseIcon style={{ width: "21px", height: "21px" }}  />
          </div>
          <TwitterIcon style={{ width: "36px", height: "36px" }} />
          <TwitterIcon style={{ width: "32px", height: "32px", color: "black" }} />
        </div>
        <h1>Join Twitter Today</h1>

        <button onClick={signInWithGoogle} className="login__provider"><GoogleIcon />Sign up with <span className="login__google">Google</span></button>
        <button className="login__provider"><AppleIcon />Sign up with <span className="login__apple">Apple</span></button>
        <div className="login__lines">
          <div className="login__linesLeft"></div>
          <span className="login__or">or</span>
          <div className="login__linesRight"></div>
        </div>

        <div className="login__inputBox">
        <TextField
            id="email"
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
        <button onClick={signUpWithEmail} className="login__createAccount">Create Account</button>

        <div className="login__INFO">
        By signing up, you agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>, including <a>Cookie Use.</a>
        </div>
        <br/>
        <div className="login__INFO login__Login">Have an account already? <a href="/login">Log in</a></div>
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

export default SignUp;
