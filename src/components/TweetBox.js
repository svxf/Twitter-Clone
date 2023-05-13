import React, { useState } from 'react'
import "./TweetBox.css";

import { Avatar, Button } from "@mui/material"

import db from './firebase'

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const sendTweet = e => {
    e.preventDefault();

    const timestamp = Date.now();

    db.collection('posts').add({
      id: timestamp,
      displayName: 'svxf',
      username: 'svxf',
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "https://avatars.githubusercontent.com/u/60079016",
      comments: 0,
      retweets: 0,
      likes: 0,
      timestamp,
    });

    setTweetMessage('');
    setTweetImage('');
  }

  return (
    <div className='tweetBox'>
        <form>
            <div className='tweetBox__input'>
                <Avatar src="https://avatars.githubusercontent.com/u/60079016" />
                <input onChange={(e) => setTweetMessage(e.target.value)} value={tweetMessage} placeholder="What's happening?!" type="text" />
            </div>
            <input
              onChange={(e) => setTweetImage(e.target.value)}
              value={tweetImage}
              className="tweetBox__imageInput" 
              placeholder="Enter image URL" 
              type="text" 
            />
            
            <Button disabled={!tweetMessage.trim()} onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Tweet</Button>
        </form>
    </div>
  )
}

export default TweetBox