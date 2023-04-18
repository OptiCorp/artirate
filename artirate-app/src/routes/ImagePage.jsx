import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext.js";

const Image = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
    <>
    <div>Single Page of Image</div>
    </>
    );
};

export default Image;