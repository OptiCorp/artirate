import React from "react";
import { useContext } from "react";
import axios from "axios";
import { API_ImgUrl } from "../constants/api.js";
import AuthContext from "../services/AuthContext.js";
import Login from "../components/login/Login.jsx";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      setImages(response.data);
      console.log(response.data)
    });
  }, []);

  if (!images) return null;

    if (!user) {
        return <>
        <div><Login /></div>
        </>;
    }
    return (
    <>
    <div>Home page with Images</div>
    {images.map(img => (
        <div key={img.imgId}>
            {img.imgTitle}
        </div>
    ))}
    </>
    );
};

export default Home;