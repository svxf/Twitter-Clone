import React, { useState, useEffect }  from 'react';
import "./Theme.css"

import { Button } from "@mui/material"

function Theme() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
    <div className='theme'>
        <Button variant='outlined' onClick={toggleTheme}>Theme</Button>
    </div>
  )
}

export default Theme