import React from 'react';
import './App.css';
import "@fontsource/mulish";
import Navbar from './Navbar';
import CompleteTask from './CompleteTask';
import { NotFound } from './NotFound';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  return (
    
      <div className="App">
         {location.pathname !== '/completeTask' && <Navbar />}
        {/* Основний контент, що змінюється */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/home" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path = "/completeTask" element = {<CompleteTask/>} />
            <Route path = "*" element = {<NotFound/>}></Route>
          </Routes>
        </div>
      </div>
  );

}

export default App;

function Base() {
  return  <div className="main-content">
          <p className="main-heading">Virtual laboratory</p>
          </div>;
}

function Modules() {
  return <h1>Modules Page</h1>;
}

function Join() {
  return <h1>Join Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

// <div >
    //      <Routes>
    //         <Route path = "/" element={<Navigate to="/home" />}></Route>
    //         {/* <Route path = "/home" element = {<MainPage/>}></Route> */}
    //         <Route path = "/home" element={<Home />} />
    //         <Route path = "/modules" element={<Modules />} />
    //         <Route path = "/join" element={<Join />} />
    //         <Route path = "/login" element={<Login />} />
    //         <Route path = "/completetask" element = {<CompleteTask/>}>   </Route>
    //         <Route path = "*" element = {<NotFound/>}></Route>
    //     </Routes>