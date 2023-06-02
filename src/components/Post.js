import React, { forwardRef, useState, useEffect } from "react";
import "./Post.css";

import { Link } from "react-router-dom";

import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import db from "../lib/firebase/firebase";
import { getUserProfileById, getPFP } from "../lib/firebase/utils";

import { AnimatePresence, motion } from "framer-motion";
export const TweetProps = (props) => {
  const { user, modal, pinned, profile, parentTweet, ...tweetProps } = props;

  return {
    user,
    modal,
    pinned,
    profile,
    parentTweet,
    ...tweetProps,
  };
};

export const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Post = forwardRef(
  (
    {
      id,
      uid,
      username,
      text,
      image,
      type,
      comments,
      retweets,
      likes,
      timestampO,
    },
    ref
  ) => {
    const [userProfile, setUserProfile] = useState(null);
    const [pfp, setPFP] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const profile = await getUserProfileById(uid);
          const pfp = await getPFP(uid);
          setUserProfile(profile);
          setPFP(pfp);
        } catch (error) {
          console.log("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }, [uid]);

    if (userProfile == null) return;

    const handleLike = () => {
      if (!liked) {
        db.collection("posts")
          .where("id", "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                likes: doc.data().likes + 1,
              });
            });
            setLiked(true);
          })
          .catch((error) => {
            console.log("Error updating document:", error);
          });
      } else {
        db.collection("posts")
          .where("id", "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                likes: doc.data().likes - 1,
              });
            });
            setLiked(false);
          })
          .catch((error) => {
            console.log("Error updating document:", error);
          });
      }
    };

    // TODO: Remake retweet
    const handleRetweet = (e, retweet_id) => {
      e.preventDefault();

      db.collection("posts")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              retweets: doc.data().retweets + 1,
            });
          });
        })
        .catch((error) => {
          console.log("Error updating document:", error);
        });

      const timestamp = timestampO - 1;

      db.collection("posts")
        .add({
          id: timestamp,
          displayName: "svxf",
          username: "svxf",
          verified: true,
          text: `retweet: ${text}`,
          image: image ? image : null,
          type: `${type}`,
          avatar: "https://avatars.githubusercontent.com/u/60079016",
          comments: 0,
          retweets: 0,
          retweet_id: id,
          likes: 0,
          timestamp,
        })
        .catch((error) => console.log("Error adding post:", error));
    };

    const handleShare = (e) => {
      e.preventDefault();

      navigator.clipboard.writeText(window.location.origin + "/" + id);

      // Create the notification div
      const notificationDiv = document.createElement("div");
      notificationDiv.classList.add("Notification");
      notificationDiv.textContent = "Copied to clipboard";

      // Append the notification div to the document
      document.body.appendChild(notificationDiv);

      // Remove the notification div after 3 seconds
      setTimeout(() => {
        notificationDiv.remove();
      }, 3000);
    };

    const options = { month: "long", day: "numeric" };
    const readableTime = new Date(timestampO).toLocaleDateString(
      undefined,
      options
    );

    return (
      <AnimatePresence>
        <motion.div
          className="post"
          id={id}
          ref={ref}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {/* // <div className='post' id={id} ref={ref}> */}
          <Link to={`/users/${userProfile.username}`}>
            <div className="post__avatar">
              <Avatar src={pfp} />
            </div>
          </Link>
          <div className="post__body">
            {/* Header */}
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {userProfile.displayName}{" "}
                  <span className="post__headerSpecial">
                    {userProfile.isVerified && (
                      <VerifiedUserIcon className="post__badge" />
                    )}{" "}
                    @{userProfile.username} • {readableTime}
                  </span>
                </h3>
              </div>
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            </div>

            <div className="post__media">
              {image &&
                (type === "video" ? (
                  <video controls src={image} alt="" />
                ) : (
                  <img src={image} alt="" />
                ))}
            </div>
            {/* Footer */}
            <div className="post__footer">
              <ModeCommentOutlinedIcon fontSize="small" />
              <span>{comments}</span>
              <RepeatIcon onClick={handleRetweet} fontSize="small" />
              <span>{retweets}</span>
              {liked ? (
                <FavoriteOutlinedIcon
                  onClick={() => handleLike({ id })}
                  fontSize="small"
                  color="error"
                />
              ) : (
                <FavoriteBorderIcon onClick={handleLike} fontSize="small" />
              )}
              <span>{likes}</span>
              <FileUploadOutlinedIcon onClick={handleShare} fontSize="small" />
            </div>
          </div>
          {/* </div> */}
        </motion.div>
      </AnimatePresence>
    );
  }
);

export default Post;
