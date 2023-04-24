import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { API_GeneratorUrl, API_ImgUrl} from "../constants/api.js";
import { Row, Col } from "react-bootstrap";
import ImageRater from "../components/image/ImageRater.jsx";
import ImageRating from "../components/image/ImageRating.jsx";
import ImageCarousel from "../components/image/ImageCarousel.jsx";

const Image = () => {
    const [image, setImage] = useState({});
    const [allImages, setAllImages] = useState({});
    const [generator, setGenerator] = useState({});
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let genId = query.get("generator");
    const navigate = useNavigate();

    const carouselImages = document.querySelectorAll(".carousel-img");

    useEffect(() => {
        const fetch = async () => {
            try {
                const getImg = axios.get(`${API_ImgUrl}/${id}`);
                const getGenerator= axios.get(`${API_GeneratorUrl}/${genId}`);
                const getAllImages = axios.get(`${API_ImgUrl}`);
                const responses = await axios.all([getImg, getGenerator, getAllImages])
                setImage(responses[0].data);
                setGenerator(responses[1].data);
                setAllImages(responses[2].data)

                if(allImages.length > 0){
                    allImages.forEach((element, index) => {
                         if(element.imgId === image.imgId){
                            if (index > 0){
                                setPrevious(allImages[index - 1]);
                                setNext(allImages[index + 1]);
                            }else if( index < allImages.length - 1){
                                setPrevious(allImages[index - 1]);
                                setNext(false);
                            }else {
                                setPrevious(false);
                                setNext(allImages[index + 1]);
                            }
                             setPrevious(allImages[index - 1]);
                             setNext(allImages[index + 1]);
                         }
                    });
                }
                
            } catch (err) {
              console.error(err);
            }
        };
        fetch();
        carouselImages.forEach(element => {
            element.onclick = (e) => {
                setTimeout(() => {
                    id = query.get("id");
                    genId = query.get("generator");
                    fetch();
                  }, "1");
            }
        });
    }, [carouselImages, genId, id]);

    return (
    <>
    <i className="bi bi-x mobile-details-close" onClick={() => navigate(-1)}></i>
    <Row className="justify-content-center mt-3">
        <Col className="text-center" xs={12}   xl={8}>
            <h3>{image.imgTitle}</h3>
            <p>{image.imgPrompt}</p>
        </Col>
    </Row>
    <Row className="justify-content-center align-items-center position-relative">
        <Col xs={12}  lg={8} xl={6}>
        <a href={image.imgUrl}><img className="image-main" src={image.imgUrl} alt={image.imgDescription} /></a>
        </Col>
        { next?
            (<><Link className="carousel-img carousel-navigator position-absolute end-0 fs-1 m-2 text-light" to={`/image?id=${next.imgId}&generator=${next.generatorId}`}>
                <i className="bi bi-arrow-right-circle"></i>
            </Link></>) : (<></>)}
        { previous? 
            (<Link className="carousel-img carousel-navigator position-absolute start-0 fs-1 m-2 text-light" to={`/image?id=${previous.imgId}&generator=${previous.generatorId}`}>
                <i className="bi bi-arrow-left-circle"></i>
            </Link>) : (<></>)}
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