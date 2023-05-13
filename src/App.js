import React from 'react';


import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import Theme from './components/Theme';

import './App.css';

function App() {

  

  return (
    <div className="app">
      <Theme />
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

    </div>
  );
}

export default App;
