import React, {useState, useEffect} from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import PostRetweet from './PostRetweet'

import db from './firebase';
import FlipMove from 'react-flip-move';

import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

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
              />
            );
          })}
        </FlipMove>
    </div>
  )
}

export default Feed