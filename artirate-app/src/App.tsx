import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useState } from "react";
import { Routes, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import GetAllUsers from './services/userServices';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './constants/firebase.js'

import TopNav from './components/base/TopNav.jsx';
import Home from './routes/Home';
import ProfilePage from './routes/ProfilePage.jsx';



function App() {

  GetAllUsers();
  const [user, loading, error] = useAuthState(auth);  
  const [username, setUsername] = useState("");

  return (
    <>
    <TopNav />
    <div className="App-header">
    <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </Container>
    </div>
    </>
  );
}

export default App;
