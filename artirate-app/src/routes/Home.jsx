import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext.js";
import { logOut } from "../services/loginServices.js";
import Login from "../components/login/Login.jsx";

const Home = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <>
        <div><Login /></div>
        </>;
    }
    return (
    <>
    <div>Home page with Images</div>
    </>
    );
};

export default Home;