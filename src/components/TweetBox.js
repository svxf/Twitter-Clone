import React, { useState, useEffect } from "react";
import "./TweetBox.css";

import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import { getUserProfileById, getPFP, getCurrentUserData } from "../lib/firebase/utils";
import db, { auth, storage } from "../lib/firebase/firebase";

function TweetBox() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetType, setTweetType] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");
  const [pfp, setPFP] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
          if (authUser) {
            const userRef = db.doc(`users/${authUser.uid}`);
            const snapshot = await userRef.get();
  
            if (snapshot.exists) {
              const uid = await getCurrentUserData('uid')
              const pfp = await getPFP(uid);
              setPFP(pfp);
            }
          }
        });
  
        return () => {
          unsubscribe();
        };
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchInfo();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setTweetImage(event.target.result);
    };

    if (file) {
      if (file.type.includes("image")) {
        setTweetType("image");
      } else if (file.type.includes("video")) {
        setTweetType("video");
      } else {
        setTweetType("");
      }

      const storageRef = storage
        .ref()
        .child(`images/${auth.currentUser.uid}/${file.name}`);
      storageRef.put(file).then(() => {
        storageRef.getDownloadURL().then((url) => {
          setTweetImage(url);
        });
      });

      if (tweetImage) {
        const previousStorageRef = storage.refFromURL(tweetImage);
        previousStorageRef
          .delete()
          .then(() => {
            console.log("Previous image deleted successfully");
          })
          .catch((error) => {
            console.log("Error deleting previous image:", error);
          });
      }

      setIsDialogOpen(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (tweetUrl) {
      const extension = tweetUrl.split(".").pop().toLowerCase();
      if (
        extension === "gif" ||
        extension === "webp" ||
        extension === "png" ||
        extension === "jpeg" ||
        extension === "jpg"
      ) {
        setTweetType("image");
      } else if (
        extension === "mp4" ||
        extension === "webm" ||
        extension === "ogg" ||
        extension === "mov"
      ) {
        setTweetType("video");
      } else {
        setTweetImage(null);
      }
      if (tweetType !== null) setTweetImage(tweetUrl);
      else setTweetImage("");
      setTweetUrl("");
      setIsDialogOpen(false);
    }
  };

  const sendTweet = async (e) => {
    e.preventDefault();

    const timestamp = Date.now();
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    try {
      const userData = await getUserProfileById(uid);
      if (userData) {
        const username = userData.username;
        let imageURL = tweetImage;

        // Create the tweet document
        db.collection("posts")
          .add({
            id: timestamp,
            uid: uid,
            username: username,
            text: tweetMessage,
            image: imageURL,
            type: tweetType,
            comments: 0,
            retweets: 0,
            likes: 0,
            timestamp: timestamp,
          })
          .then(() => {
            setTweetMessage("");
            setTweetImage(null);
            setTweetType("");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("User profile not found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={pfp} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?!"
            type="text"
          />
        </div>
        <div className="tweetBox__Holder">
          <div className="tweetBox__mediaHolder">
            {tweetImage &&
              (tweetType === "image" ? (
                <img src={tweetImage} alt="" />
              ) : (
                <video controls src={tweetImage} alt="" />
              ))}
          </div>
        </div>
        <div className="tweetBox__buttons2">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="tweetBox__imageButton"
          >
            <ImageOutlinedIcon />
          </Button>
          <Button
            disabled={!tweetMessage.trim()}
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
          >
            Tweet
          </Button>
        </div>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          {/* URL */}
          <DialogTitle>Add Image or Video URL</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUrlSubmit}>
              <TextField
                label="URL"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <Button onClick={handleUrlSubmit}>Add URL</Button>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          {/* URL */}

          {/* INPUT */}
          <DialogTitle>Add Image or Video</DialogTitle>
          <DialogContent>
            <label htmlFor="image-input">
              <input
                id="image-input"
                onChange={handleImageUpload}
                // onChange={(e) => setTweetImage(e.target.files[0])}
                className="tweetBox__imageInput"
                type="file"
                accept="image/*,video/*"
                style={{ display: "none" }}
              />
              <Button
                color="primary"
                component="span"
                startIcon={<ImageOutlinedIcon />}
              >
                Add
              </Button>
            </label>
          </DialogContent>
          {/* INPUT */}
        </Dialog>
      </form>
    </div>
  );
}

export default TweetBox;
