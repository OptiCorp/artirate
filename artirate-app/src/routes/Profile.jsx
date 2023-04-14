import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext.js";
import { logOut } from "../services/loginServices.js";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate replace to="/login" />;
    }
    return (
    <>
    <h1>Profile</h1>
    <button onClick={logOut}>Logout</button>
    </>
    );
};

export default Profile;