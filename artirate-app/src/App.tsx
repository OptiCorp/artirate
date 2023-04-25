import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import TopNav from './components/base/TopNav';
import Home from './routes/Home';
import ProfilePage from './routes/ProfilePage';
import UploadPage from './routes/UploadPage';
import ImagePage from './routes/ImagePage';




function App() {
  return (
    <>
    <TopNav />
    <div className="App-header">
    <Container className="App-content">
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
