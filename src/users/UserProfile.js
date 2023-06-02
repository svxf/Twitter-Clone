import React, {Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getUserProfileByUsername } from '../lib/firebase/utils';

import Sidebar from '../components/Sidebar';
import Profile from './Profile';
import Widgets from '../components/Widgets';
import Theme from '../components/Theme';

import Loading from '../Loading';

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
    return <Loading />;
  }
  
  return (
    <Fragment>
        < Sidebar />
        < Profile data={userData} />
        < Widgets />
        < Theme />
    </Fragment>
  );
}

export default UserProfile;