import { useContext } from "react";
import AuthContext from "../services/AuthContext.js";
import { logOut } from "../services/loginServices.js";
import  Login  from "../components/login/Login.jsx"

import Button from 'react-bootstrap/Button';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    
    return (
    <>
    {!user ? (
                <>
                  <div><Login /></div>
                </>
              ):(
                <>
                <h1>Profile</h1>
                <Button onClick={logOut}>Logout</Button>
                </>
              )}
    </>
    );
};

export default ProfilePage;