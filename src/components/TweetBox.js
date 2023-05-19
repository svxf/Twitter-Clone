import React, { useState } from "react";
import "./TweetBox.css";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import db, { auth } from "./firebase";

function TweetBox() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetType, setTweetType] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setTweetImage(event.target.result);
    };

    if (file) {
      // check if file type is image or video
      if (file.type.includes("image")) {
        setTweetType("image");
      } else if (file.type.includes("video")) {
        setTweetType("video");
      } else {
        setTweetType("");
      }
      reader.readAsDataURL(file);
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
        console.log("A")
        setTweetImage(null)
      }
      if (tweetType !== null)
        setTweetImage(tweetUrl);
      else
        setTweetImage("");
      setTweetUrl("");
      setIsDialogOpen(false);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();

    const timestamp = Date.now();

    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    console.log(uid)
    db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const username = userData.username;
        const displayName = userData.username;

        console.log(username);
        console.log(displayName);

        // Create the tweet document
        db.collection("posts")
          .add({
            id: timestamp,
            displayName: displayName,
            username: username,
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            type: tweetType,
            avatar: "https://avatars.githubusercontent.com/u/60079016",
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
            // Handle error
            console.log(error);
          });
      } else {
        // User profile not found
        console.log("User profile not found.");
      }
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
    
    setTweetMessage("");
    setTweetImage(null);
    setTweetType("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://avatars.githubusercontent.com/u/60079016" />
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
        {/* <div className='tweetBox_buttons'>
              <label className="tweetBox__imageButton" htmlFor="image-input">
                  <input
                    id="image-input"
                    onChange={handleImageUpload}
                    className="tweetBox__imageInput"
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                  />
                  <ImageOutlinedIcon />
                </label>
              <Button disabled={!tweetMessage.trim()} onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Tweet</Button>
            </div> */}
        <div className="tweetBox__buttons2">
          {/* <label className="tweetBox__imageButton" htmlFor="image-input">
                <input
                  id="image-input"
                  onChange={handleImageUpload}
                  className="tweetBox__imageInput"
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                />
                
              </label> */}
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
