import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import { getFirestore, addDoc, collection } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
const db = getFirestore();
const Auth = getAuth();


const signUpUser = async (email:string, password:string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });
    return true
  } catch (error: any){
    return {error: error.message}
  }
};

const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      Auth,
      email,
      password
    );
    const user = userCredential.user;
    return true
  } catch (error: any) {
    return {error: error.message}
  }
};

const signOutUser = async() => {
  try {
    await signOut(Auth)
    return true
  } catch (error) {
    return false
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>AritRate</h3>
      </header>
      <Router>
        <div>
          <Routes>
            <Route path="./signup"> Signup</Route>
            <Route path="./login"> Login</Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
