import React, { useState, useEffect, useRef } from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import PostRetweet from './PostRetweet'

import db from './firebase';
import FlipMove from 'react-flip-move';

import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const matchedPostRef = useRef(null);

  const postId = window.location.pathname.substring(1);

  useEffect(() => {
    const unsubscribe = db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(fetchedPosts);

      // Check if the post ID from the URL matches one of the fetched posts
      const matchedPost = fetchedPosts.find(post => post.id === parseInt(postId));
      if (matchedPost) {
        matchedPostRef.current = matchedPost.id;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    // If a post with the ID from the URL is found it will scroll to it
    if (matchedPostRef.current) {
      const matchedPostElement = document.getElementById(matchedPostRef.current);
      if (matchedPostElement) { 
        
        matchedPostElement.scrollIntoView({ behavior: "smooth", block: "start" });
        matchedPostElement.classList.add("post__outline");
        setTimeout(() => {
          matchedPostElement.classList.remove("post__outline");
        }, 2000);

      }
    }
  }, [matchedPostRef.current]);


  // useEffect(() => {
  //   const unsubscribe = db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
  //     setPosts(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //     )
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);


  return (
    <div className="feed">
        {/* Header */}
        <div className="feed__header">
            <h2>Home</h2>
        </div>

        {/* Tweet */}
        <TweetBox />

        {/* Posts */}

        <FlipMove>
          {posts.map((post) => {
            if (post.retweet_id) {
              const parentPost = posts.find((p) => p.id === post.retweet_id);
              
              if (parentPost) {
                // Render retweet Post
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

            // Render regular Post
            return (
              <Post
                key={post.id}
                id={post.id}
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
          })}
        </FlipMove>
    </div>
  )
}

export default Feed