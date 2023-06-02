import React, { useState, useEffect, useRef } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import PostRetweet from "./PostRetweet";

import db from "../lib/firebase/firebase";
import FlipMove from "react-flip-move";
import { AnimatePresence } from "framer-motion";

import Loader from "../Loader";

import "./Feed.css";

function Feed() {
  const [loading, setLoading] = useState(true);
  
  const [posts, setPosts] = useState([]);
  const matchedPostRef = useRef(null);

  const postId = window.location.pathname.substring(1);

  /*
  Fetch posts
  */
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
          const post = doc.data();

          return {
            id: doc.id,
            ...post,
          };
        });

        setPosts(fetchedPosts);

        /*
        Check if the post ID from the URL matches one of the fetched posts
        */
        const matchedPost = fetchedPosts.find(
          (post) => post.id === parseInt(postId)
        );
        if (matchedPost) {
          matchedPostRef.current = matchedPost.id;
        }

        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  /*
  Scroll to post
  */
  useEffect(() => {
    if (matchedPostRef.current) {
      const matchedPostElement = document.getElementById(
        matchedPostRef.current
      );
      if (matchedPostElement) {
        matchedPostElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        matchedPostElement.classList.add("post__outline");
        setTimeout(() => {
          matchedPostElement.classList.remove("post__outline");
        }, 2000);
      }
    }
  }, [matchedPostRef.current]);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* Posts */}
      {loading ? (
        <Loader />
      ) : (
      <AnimatePresence mode="popLayout">
        {posts.map((post) => {
          if (post.retweet_id) {
            const parentPost = posts.find((p) => p.id === post.retweet_id);

            if (parentPost) {
              return (
                <PostRetweet
                  key={post.id}
                  id={post.id}
                  retweet_id={post.retweet_id}
                  displayName={post.displayName}
                  username={post.username}
                  verified={post.verified}
                  text={post.text}
                  avatar={post.avatar}
                  image={post.image}
                  comments={post.comments}
                  retweets={post.retweets}
                  likes={post.likes}
                  timestampO={post.timestamp}
                  type={post.type}
                />
              );
            }
          }

          return (
            <Post
              key={post.id}
              id={post.id}
              uid={post.uid}
              // displayName={post.displayName}
              username={post.username}
              // verified={post.verified}
              text={post.text}
              // avatar={post.avatar}
              image={post.image}
              comments={post.comments}
              retweets={post.retweets}
              likes={post.likes}
              timestampO={post.timestamp}
              type={post.type}
            />
          );
        })}
      </AnimatePresence>
    )}
    </div>
  );
}

export default Feed;
