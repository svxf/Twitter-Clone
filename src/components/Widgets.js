import React, { useState } from 'react'
import "./Widgets.css";

import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import FollowSuggest from './FollowSuggest';

import SearchIcon from '@mui/icons-material/Search';

function Widgets() {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const widgetsClassName = `widgets__input${isActive ? ' active' : ''}`;

  return (
    <div className='widgets'>
      <div className={widgetsClassName}>
        <SearchIcon className='widgets__searchIcon' />
        <input
          placeholder='Search Twitter'
          type='text'
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div className='widgets__widgetContainer'>
        <h2>What's happening</h2>

        <TwitterTweetEmbed tweetId={"1657073688632762368"} />
        
        
      </div>

      <div className='widgets__widgetContainer'>
        <h2>Who to follow</h2>

        <FollowSuggest userid='CbcxLAkBivbkYAFxCvgggWoRkCC3' />
        <FollowSuggest />
        <FollowSuggest />

        {/* <TwitterTweetEmbed tweetId={"1657073688632762368"} /> */}
        
        
      </div>

      {/* <div className='widgets__widgetContainer'>
      <TwitterTimelineEmbed 
          sourceType='profile'
          screenName='twitter'
          options={{ height: 400 }}
        />
      </div> */}

      <br />
    </div>
  )
}

export default Widgets;