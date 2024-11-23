import React from 'react';
import './App.css';
import "@fontsource/mulish";
import Navbar from './Navbar';
import {Routes,Route,Link, Navigate} from 'react-router-dom';
import MainPage from './MainPage';
import CompleteTask from './CompleteTask';
import { NotFound } from './NotFound';


function App() {
  return (
    <div >
         <Routes>
            <Route path = "/" element={<Navigate to="/home" />}></Route>
            <Route path = "/home" element = {<MainPage/>}></Route>
            <Route path = "/completetask" element = {<CompleteTask/>}>   </Route>
            <Route path = "*" element = {<NotFound/>}></Route>
        </Routes>

    </div>
  );
}

export default App;
