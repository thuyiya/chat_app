// src/App.tsx
import React, { useState } from 'react';
import Auth from './pages/Auth';
import Home from './pages/Home';

import './App.css'

interface AppProps {
  // Define any props here
}

const App: React.FC<AppProps> = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token')? true: false) 

  return (
    <div className="App">
      {loggedIn ? <Home /> : <Auth setLoggedIn={setLoggedIn}/>}
    </div>
  );
};

export default App;
