import React from 'react'
import './Profile.css';

import { Avatar } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Profile() {
  return (
    <div className='profile'>
        <div className='profile__avatar'>
            <Avatar src="https://avatars.githubusercontent.com/u/60079016" />
        </div>
        <div className='profile__names'>
            <span>svxf</span>
            <span className='profile__special'>@svxf</span>
        </div>

        <div className='profile__more'>
            <MoreHorizIcon/>
        </div>
    </div>
  )
}

export default Profile