import React, { useState, useEffect } from 'react';
import './Theme.css';

import { auth } from '../lib/firebase/firebase';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

function Theme() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.cookie = `theme=${newTheme}`;
  };

  // Temp
  const logout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      navigate('/');
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="theme">
      <Button variant="outlined" onClick={toggleTheme}>
        Theme
      </Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default Theme;