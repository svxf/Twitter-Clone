// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Redirect , useNavigate} from 'react-router-dom';

// import { auth } from "./components/firebase";

// import SignUp from "./SignUp";
// import SignIn from "./SignIn";

// import Sidebar from './components/Sidebar';
// import Feed from './components/Feed';
// import Widgets from './components/Widgets';
// import Theme from './components/Theme';

// import './App.css';
// function AuthenticatedRoutes() {
//   return (
//     <>
//       <Theme />
//       <Sidebar />
//       <Feed />
//       <Widgets />
//     </>
//   );
// }
// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         setUser(authUser);
//       } else {
//         setUser(null);
//       }
//       // setLoading(false);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const shouldApplyAppStyles = user;

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div className={`${shouldApplyAppStyles ? 'app' : 'appFix'}`}>
//       <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<SignIn />} />
//           <Route
//             path="/"
//             element={user ? <AuthenticatedRoutes /> : <h1>You do not have an account: <a href="/signup">go here</a></h1>}
//           />
//         </Routes>
//       {/* {!user ? (
//           <SignIn />
//         // <SignUp />
//       ) : (
//         <>
//         <Theme />
//         <Sidebar />
//         <Feed />
//         <Widgets />
//         </>
//       )} */}

//     </div>
//   );
// }

// export default App;

import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { auth } from "./lib/firebase/firebase";

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";
import Theme from "./components/Theme";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserProfile from "./users/UserProfile";
import DisplayName from "./components/DisplayName";

import Loading from "./Loading";
import { getCurrentUserData } from "./lib/firebase/utils";
import db from "./lib/firebase/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDisplayName, setShowDisplayName] = useState(true);
  const [canFetch, setFetch] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setFetch(true);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (canFetch) {
        try {
          const show = await getCurrentUserData("canChoose");
          if (show === true) {
            setShowDisplayName(true);
          } else {
            setShowDisplayName(false);
          }
        } catch (err) {
          console.error(err);
          setShowDisplayName(false);
        }
      }
    };
    setLoading(false);
  
    fetchUsername();
  }, [canFetch]);
  

  const shouldApplyAppStyles = user;

  return (
    <div className={`${shouldApplyAppStyles ? "app" : "appFix"}`}>
      <BrowserRouter>
      {loading ? (
          <Loading />
        ) : (
        <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={

              user ? (
                <Fragment>
                  <Sidebar />
                  <Feed />
                  <Widgets />
                  <Theme />
                  {showDisplayName && <DisplayName />}
                </Fragment>
              ) : (
                <Navigate replace to="/signup" />
              )
            }
          />

          <Route
            path="/signup"
            element={user ? <Navigate replace to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <SignIn />}
          />


          <Route path="/users/:username" element={<UserProfile />} />

          <Route
            path="*"
            element={
              <h1>
                Not Found. <a href="/">Go Back</a>
              </h1>
            }
          />
        </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
