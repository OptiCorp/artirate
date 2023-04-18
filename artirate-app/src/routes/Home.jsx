import React from "react";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { API_ImgUrl } from "../constants/api.js";
import AuthContext from "../services/AuthContext.js";
import Login from "../components/login/Login.jsx";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [post, setPost] = React.useState(null);
    
  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      setPost(response.data);
      console.log(response.data)
    });
  }, []);

  if (!post) return null;

    if (!user) {
        return <>
        <div><Login /></div>
        </>;
    }
    return (
    <>
    <div>Home page with Images</div>
    {post.map(p => (
        <div>{p.imgTitle}</div>
    ))}
    </>
    );
};

export default Home;