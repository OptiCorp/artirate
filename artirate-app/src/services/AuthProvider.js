import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../constants/firebase.js'
import { useState, useEffect } from 'react';
import AuthContext from './AuthContext.js'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
        })
    }, []);
    return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};