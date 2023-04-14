import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthProvider.js";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GetAllUsers from './services/userServices';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from './constants/firebase.js'

import Signup from "./components/login/Signup.jsx";
import Login from "./components/login/Login.jsx";
import TopNav from './components/base/TopNav.jsx';
import Profile from "./routes/Profile.jsx";



function App() {

  GetAllUsers();
  const [user, loading, error] = useAuthState(auth);  
  const [username, setUsername] = useState("");

  return (
    <>
    <TopNav />
    <div className="App-header">
    <Container>
      <Row>
        <Col>
          <Signup />
        </Col>
        <Col></Col>
        <Col><Login /></Col>
      </Row>
    </Container>
    </div>
    </>
  );
}

export default App;
