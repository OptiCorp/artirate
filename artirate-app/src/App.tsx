import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {  useState } from "react";
import { Routes, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './constants/firebase.js'

import TopNav from './components/base/TopNav';
import Home from './routes/Home';
import ProfilePage from './routes/ProfilePage';
import UploadPage from './routes/UploadPage';
import ImagePage from './routes/ImagePage';




function App() {
  const [user, loading, error] = useAuthState(auth);  


  return (
    <>
    <TopNav />
    <div className="App-header">
    <Container className="App-content pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/image" element={<ImagePage />} />
        </Routes>
    </Container>
    </div>
    </>
  );
}

export default App;
