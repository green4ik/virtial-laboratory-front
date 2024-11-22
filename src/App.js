import React from 'react';
import './App.css';
import "@fontsource/mulish";
import Navbar from './Navbar';


function App() {
  return (
    <div className="App">
        <Navbar />

      {/* Main Content */}
      <div className="main-content">
        <p className="main-heading">Virtual laboratory</p>
      </div>

    </div>
  );
}

export default App;
