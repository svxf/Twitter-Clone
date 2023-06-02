import React, { useState, useEffect, Fragment } from "react";
import "./followSuggest.css";

import { getRandomUserData, getUserProfileById, getPFP } from "../lib/firebase/utils";
import db from "../lib/firebase/firebase";
import { Avatar } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";

function FollowSuggest({ userid }) {
  const [loading, setLoading] = useState(true);

  const [randomUser, setRandomUser] = useState(null);
  const [pfp, setPFP] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user =  await getUserProfileById(userid);
      const pfp = await getPFP(userid)
      setRandomUser(user);
      setPFP(pfp);
    }

    const fetchRandomUser = async () => {
      const user = await getRandomUserData();
      const pfp = await getPFP(user.uid)
      setPFP(pfp);

      if (user.username == "svxf") {
        fetchRandomUser();
      } else {
        setRandomUser(user);
      }
    };


    if (userid) {
      fetchUser();
    } else {
      fetchRandomUser();
    }
    setLoading(false);
  }, []);

  return (
    <Fragment>
      {randomUser && (
        <Link to={`/users/${randomUser.username}`}>
        <div className="suggest">
          <div className="suggest_hold">
            <div className="suggest__avatar">
              <Avatar src={pfp} />
            </div>
            <div className="suggest__names">

            <h2 className={`skeleton ${loading ? 'fade-out' : 'fade-in'}`}></h2>
              <p className={`skeleton ${loading ? 'fade-out' : 'fade-in'}`}></p>
              {!loading && (
                <>
                   <p>
              
              {randomUser.displayName}
              {randomUser.isVerified && (
                <VerifiedUserIcon className="post__badge" />
              )}{" "}
            </p>

          <a>@{randomUser.username}</a>
                </>
              )}

             
            </div>
          </div>

          <button className="suggest__follow">Follow</button>
        </div>
        </Link>
      )}
    </Fragment>
  );
}

export default FollowSuggest;
