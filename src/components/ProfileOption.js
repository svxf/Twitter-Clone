import React, { useState, useEffect } from 'react'
import './ProfileOption.css';

import { Avatar } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { getCurrentUserData, getPFP } from '../lib/firebase/utils';
import { auth } from '../lib/firebase/firebase';
import db from '../lib/firebase/firebase';

function ProfileOption() {
  const [username, setUsername] = useState("");
  const [displayname, setDisplayName] = useState("");
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
              const currentUserUsername = await getCurrentUserData('username');
              const currentUserDisplayname = await getCurrentUserData('displayName');
              const pfp = await getPFP(uid);
              setUsername(currentUserUsername);
              setDisplayName(currentUserDisplayname);
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


  return (
    <div className='profileOption'>
        <div className='profileOption__avatar'>
            <Avatar src={pfp} />
        </div>
        <div className='profileOption__names'>
            <span>{displayname}</span>
            <span className='profileOption__special'>@{username}</span>
        </div>

        <div className='profileOption__more'>
            <MoreHorizIcon/>
        </div>
    </div>
  )
}

export default ProfileOption