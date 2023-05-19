import React from "react";
import "./Profile.css";

import ProfileTab from "./ProfileTab";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EventNoteIcon from "@mui/icons-material/EventNote";

function Profile({ username }) {
  return (
    <div className="profile__menu">
      <div className="profile__header">
        <KeyboardBackspaceIcon />
        <h2>User</h2>
      </div>
      <div className="profile__content">
        <div className="profile__background"></div>
        <div className="profile__hold">
          <div className="profile__avatar">
            <div className="profile__avatarHold">
            <img src="https://avatars.githubusercontent.com/u/60079016" />
            </div>
            <button>Edit Profile</button>
          </div>
          <div className="profile__names">
            <p className="profile__username">{username}</p>
            <p className="profile__special">@{username}</p>
          </div>
          <div className="profile__joined">
            <EventNoteIcon />
            <p>Joined May 2023</p>
          </div>
          <div className="profile__info">
            <span>
              <a>0 </a> Following
            </span>
            <span>
              <a>0 </a> Followers
            </span>
          </div>

          <div className="profile__tabs">
            <ProfileTab name="tweets" active />
            <ProfileTab name="Tweets & Replies" />
            <ProfileTab name="Media" />
            <ProfileTab name="Likes" />
          </div>
        </div>

        <div className="profile__feed">
          <div className="profile__error">
            <h1>@{username} hasn't tweeted</h1>
            <p>When they do, their Tweets will show up here.</p>
            {/* <h1>This account doesn't exist</h1>
                    <p>Try searching for another.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
