import React, { useState, useEffect } from "react";
import "./Profile.css";

import ProfileTab from "./ProfileTab";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';

import { getCurrentUserData, getPFP, getBanner } from '../lib/firebase/utils'

import Loader from "../Loader";

function Profile({ data }) {
  const [loading, setLoading] = useState(true);

  const [pfp, setPFP] = useState('https://firebasestorage.googleapis.com/v0/b/twitter-clone-5f618.appspot.com/o/pfps%2FdefaultPFP.png?alt=media');
  const [banner, setBanner] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      const findPicture = await getPFP(data.uid);
      setPFP(findPicture);
      const findBanner = await getBanner(data.uid);
      setBanner(findBanner);
      setLoading(false);
    };

    fetchInfo();
  }, [data.uid]);

  
  
  return (
    <div className="profile__menu">
      
      <div className="profile__header">
        <a href='/'><KeyboardBackspaceIcon /></a>
        <div className="profile__namer">
        <h2 className={`skeleton ${loading ? 'fade-out' : 'fade-in'}`}></h2>
        <p className={`skeleton ${loading ? 'fade-out' : 'fade-in'}`}></p>
        {!loading && (
          <>
            <h2>{data.displayName}</h2>
            <p>0 tweet</p>
          </>
        )}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="profile__content">
          <div className="profile__background" style={{ backgroundImage: `url(${banner})` }}></div>
          <div className="profile__hold">
            <div className="profile__avatar">
              <div className="profile__avatarHold">
                <img src={pfp}  />
              </div>
              <button>Edit Profile</button>
            </div>
            <div className="profile__names">
              <p className="profile__username">{data.displayName} {data.isVerified && <VerifiedUserIcon className='post__badge' />}</p>
              <p className="profile__special">@{data.username}</p>
              <p className="profile__bio">{data.bio}</p>
            </div>
            <div className="profile__joined">
              <LocationOnOutlinedIcon />
              <p>Unknown</p>
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
              <h1>@{data.username} hasn't tweeted</h1>
              <p>When they do, their Tweets will show up here.</p>
              {/* <h1>This account doesn't exist</h1>
                      <p>Try searching for another.</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
