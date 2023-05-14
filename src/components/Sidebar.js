import React from 'react';
import './Sidebar.css';

import SidebarOption from './SidebarOption';
import Profile from './Profile';

import { Button } from '@mui/material';

import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar__twitterIconDiv"><TwitterIcon className="sidebar__twitterIcon" /></div>
        {/* Option */}
        <SidebarOption active text="Home" Icon={HomeIcon} />
        <SidebarOption text="Settings" Icon={SearchIcon} />
        <SidebarOption text="Notifications"Icon={NotificationsNoneIcon} />
        <SidebarOption text="Messages"Icon={MailOutlineIcon} />
        <SidebarOption text="Bookmarks"Icon={BookmarkBorderIcon} />
        <SidebarOption text="Lists"Icon={ListAltIcon} />
        <SidebarOption text="Profile"Icon={PermIdentityIcon} />
        <SidebarOption text="More"Icon={MoreHorizIcon} />
        {/* Button Tweet */}
        <Button fullWidth variant="outlined" className="sidebar__tweet">Tweet</Button>
        <Button fullWidth variant="outlined" className="sidebar__tweet_small"><svg style={{ fill: 'white' }} viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg></Button>

        {/* Profile */}
        <Profile />
    </div>
  )
}

export default Sidebar;