// src/App.tsx
import React from 'react';
import Auth from './pages/Auth';
import Home from './pages/Home';

import './App.css'

interface AppProps {
  // Define any props here
}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      {/* <Auth /> */}
      <Home />
    </div>
  );
};

export default App;
