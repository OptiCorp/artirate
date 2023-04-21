import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../services/AuthContext.js";

import { API_GeneratorUrl, API_ImgUrl, API_RatingUrl, API_UserUrl } from "../constants/api.js";
import { Row, Col } from "react-bootstrap";
import ImageRater from "../components/image/ImageRater.jsx";
import ImageRating from "../components/image/ImageRating.jsx";

const Image = () => {
    const { user } = useContext(AuthContext);

    const [image, setImage] = useState({});
    const [generator, setGenerator] = useState({});
    const [userRating, setUserRating] = useState({});

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    const genId = query.get("generator");


    useEffect(() => {
        const fetch = async () => {
            try {
                const getImg = axios.get(`${API_ImgUrl}/${id}`);
                const getGenerator= axios.get(`${API_GeneratorUrl}/${genId}`);
                const getUserRating= axios.get(`${API_RatingUrl}`);
                const responses = await axios.all([getImg, getGenerator, getUserRating]);
                setImage(responses[0].data);
                setGenerator(responses[1].data);
                if(responses[2].data){
                    //console.log(responses[2].data);
                    responses[2].data.forEach(element => {
                     //console.log(element)
                    });
                }
                //console.log(responses);
            } catch (err) {
              console.error(err);
            }
          };
        
          fetch();
        }, []);


    return (
    <>
    <Row>
        <Col className="text-center" xs={12}>
            <h3>{image.imgTitle}</h3>
            <p>{image.imgPrompt}</p>
        </Col>
    </Row>
    <Row>
        <Col xs={12}>
           <img className="image-main" src={image.imgUrl} alt={image.imgDescription} />
        </Col>
    </Row>
    <Row>
        <Col xs={12}>
           <ImageRating imgId={image.imgId}/>
        </Col>
    </Row>
    <Row>
        <Col xs={12}>
            <ImageRater imgId={image.imgId} />
        </Col>
    </Row>
    </>
    
    );
};

export default Image;