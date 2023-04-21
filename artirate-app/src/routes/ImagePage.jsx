import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../services/AuthContext.js";

import { API_GeneratorUrl, API_ImgUrl} from "../constants/api.js";
import { Row, Col } from "react-bootstrap";
import ImageRater from "../components/image/ImageRater.jsx";
import ImageRating from "../components/image/ImageRating.jsx";
import ImageCarousel from "../components/image/ImageCarousel.jsx";

const Image = () => {
    const { user } = useContext(AuthContext);

    const [image, setImage] = useState({});
    const [allImages, setAllImages] = useState({});
    const [generator, setGenerator] = useState({});
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    const genId = query.get("generator");

    const carouselImages = document.querySelectorAll(".carousel-img");

    useEffect(() => {
        const fetch = async () => {
            try {
                const getImg = axios.get(`${API_ImgUrl}/${id}`);
                const getGenerator= axios.get(`${API_GeneratorUrl}/${genId}`);
                const getAllImages = axios.get(`${API_ImgUrl}`);
                const responses = await axios.all([getImg, getGenerator, getAllImages]);
                setImage(responses[0].data);
                setGenerator(responses[1].data);
                setAllImages(responses[2].data);
            } catch (err) {
              console.error(err);
            }
          };
          fetch();
          carouselImages.forEach(element => {
            element.onclick = (e) => {
                setTimeout(() => {
                    fetch();
                  }, "1");
            }
        });
    }, [carouselImages, genId, id]);

    return (
    <>
    <Row className="justify-content-center">
        <Col className="text-center" xs={12}   xl={8}>
            <h3>{image.imgTitle}</h3>
            <p>{image.imgPrompt}</p>
        </Col>
    </Row>
    <Row className="justify-content-center">
        <Col xs={12}  lg={8} xl={6}>
           <img className="image-main" src={image.imgUrl} alt={image.imgDescription} />
        </Col>
    </Row>
    <Row className="justify-content-center">
        <Col xs={12} lg={8} xl={6} className="position-relative">
            <ImageRating imgId={image.imgId}/>
            <div className="position-absolute top-0">
                <small><strong>Generator: </strong></small>
                <small><a href={generator.generatorUrl} target="_blank" rel="noreferrer">{generator.generatorName}</a></small>
            </div>
        </Col>
    </Row>
    <Row className="pt-3">
        <Col xs={12}>
            <ImageRater imgId={image.imgId} />
        </Col>
    </Row>
    <Row className="pt-3 justify-content-center">
        <Col  xs={12} lg={8} xl={6}>
            <ImageCarousel imgId={image.imgId}/>
        </Col>
    </Row>
    </>
    
    );
};

export default Image;