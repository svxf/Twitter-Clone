import React, {Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getUserProfileByUsername } from '../components/firebase';

import Sidebar from '../components/Sidebar';
import Profile from './Profile';
import Widgets from '../components/Widgets';
import Theme from '../components/Theme';

function UserProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await getUserProfileByUsername(username);
      if (userProfile) {
        setUserData(userProfile);
      } else {
        setUserData({ username: "Null" });
      }
    };

    fetchUserProfile();
  }, [username]);

  if (userData === null) {
    return <p>Loading...</p>;
  }
  
  return (
    <Fragment>
        {/* {userData ? <h1>{userData.username}</h1> : <p>Loading...</p>} */}
        < Sidebar />
        < Profile username={userData.username} />
        < Widgets />
        < Theme />
    </Fragment>
  );
}

export default UserProfile;