// import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Messenger from './components/messenger/messenger';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from 'react-router-dom'
import React, { useEffect, useState } from "react";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path="/messenger" element={<Messenger />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
