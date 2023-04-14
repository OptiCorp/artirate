import {  signOut } from "firebase/auth";
import { auth } from "../constants/firebase.js"


export const logOut = async() => {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      return false
    }
  };

  export default logOut;