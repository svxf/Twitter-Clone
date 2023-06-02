import React, { useState, useEffect } from "react";
import "./DisplayName.css";

import { auth } from "../lib/firebase/firebase";
import { checkUsernameAvailability, updateUsername, updateUserData, getCurrentUserData } from "../lib/firebase/utils";

import TwitterIcon from "@mui/icons-material/Twitter";

function DisplayName() {
  const [userName, setUserName] = useState("");
  const [curuserName, setcurUserName] = useState("");

  const validUsernameRegex = /^[a-zA-Z0-9]{1,15}$/;

  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await getCurrentUserData("username");
        setcurUserName(user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsername();
  }, []);

  const handleName = async (val) => {
    const isValidUsername = validUsernameRegex.test(val);
    if (!isValidUsername) {
        alert("Invalid username. Please use only letters and numbers, and limit it to 15 characters.");
        return;
    }
    setUserName(val);
  };

  const submitName = async (e) => {
    e.preventDefault();
    const isValidUsername = validUsernameRegex.test(userName);
    if (userName !== "" && isValidUsername) {
        const isUsernameTaken = await checkUsernameAvailability(userName);
        if (isUsernameTaken) {
            alert("AUsername is already taken. Please choose a different one.");
        } else {
            const currentUser = auth.currentUser;
            const canChoose = false;
            if (currentUser) {
            try {
                await updateUsername(currentUser.uid, userName);
                await updateUserData(currentUser.uid, { canChoose });
                console.log("Changing username: " + userName)
                handleSkip();
            } catch (error) {
                console.log("Error updating username", error.message);
            }
            }
        }
    }
  }

  const handleSkip = (e) => {
    e.preventDefault();
    setSkipped(true);
    const currentUser = auth.currentUser;
    const canChoose = false;

    // Update user data
    updateUserData(currentUser.uid, { canChoose })
    .then(() => {
      // Data updated successfully
      console.log("canChoose field updated successfully.");
    })
    .catch((error) => {
      // Error updating data
      console.log("Error updating canChoose field:", error);
    });
  };

  return (
    <div className={`displayName__popup ${skipped === true ? 'displayName__hide' : ''}`}>
      <div className="displayName__container">
        <form>
          <div className="displayName__upper">
            <TwitterIcon />
            <h1>What should we call you?</h1>
            <p>Your @username is unique. You can always change it later.</p>

            <input
              type="text"
              className="displayName__usernameBox"
              placeholder={curuserName}
              value={userName}
              onChange={(e) => handleName(e.target.value)}
            />

          </div>

          <div className="displayName__lower">
            <button onClick={submitName} className={`login__createAccount ${userName !== "" ? '' : 'displayName__locked'}`}>
              Set username
            </button>
            <button onClick={handleSkip} className="login__createAccount">Skip</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DisplayName;
