import React, {useState, useEffect}from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { API_ImgUrl } from '../../../constants/api';
import AuthContext from '../../../services/AuthContext';
import { Row, Col } from 'react-bootstrap';

function ImageCarousel(props) {
    const { user } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [startIndex, setStartIndex] = useState("");
    const [endIndex, setEndIndex] = useState("");
  
    useEffect(() => {
    if(props.imgId){
        fetch(API_ImgUrl)
        .then((response) => response.json())
        .then((data) => {
                data.forEach((element, index) => {
                    if(element.imgId === props.imgId){
                        if(index < 2){
                            if(index === 0){
                                setStartIndex(index);
                                setEndIndex(index + 5);
                            }else{
                                setStartIndex(index - 1);
                                setEndIndex(index +4 );
                            }
                        }else if(index >= data.length - 2){
                            if(index === data.length - 1){
                                setStartIndex(index - 4);
                                setEndIndex(index);
                            }else{
                                setStartIndex(index - 4 );
                                setEndIndex(index + 1);
                            }
                        }else{
                            setStartIndex(index - 2);
                            setEndIndex(index + 3);
                        }
                    }
                });
            const filteredImages = data.slice(startIndex, endIndex);
            let carouselImages = []
            filteredImages.forEach(element => {
                    if(element.imgId !== props.imgId){
                        carouselImages.push(element);
                    }
            });
            setImages(carouselImages.reverse());
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    }, [props.imgId, user, endIndex, startIndex]);
  
  
  if(!props.imgId) return 'Getting Images';
  
    return (
      <Row className='pb-3'>
        {images.map(({imgId, imgTitle, imgUrl, generatorId}) => (
        <Col key={imgId} xs={3} className="mt-5">
            <Link to={`/image?id=${imgId}&generator=${generatorId}`}>
               <img className="card-img carousel-img" src={imgUrl} alt={imgTitle} />
            </Link>
        </Col>
        ))}
      </Row>
    )
}

export default ImageCarousel