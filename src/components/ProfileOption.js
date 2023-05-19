import React from 'react'
import './ProfileOption.css';

import { Avatar } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ProfileOption() {
  return (
    <div className='profileOption'>
        <div className='profileOption__avatar'>
            <Avatar src="https://avatars.githubusercontent.com/u/60079016" />
        </div>
        <div className='profileOption__names'>
            <span>svxf</span>
            <span className='profileOption__special'>@svxf</span>
        </div>

        <div className='profileOption__more'>
            <MoreHorizIcon/>
        </div>
    </div>
  )
}

export default ProfileOption