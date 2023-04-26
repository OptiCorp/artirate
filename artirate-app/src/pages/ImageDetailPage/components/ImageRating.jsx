import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { API_RatingUrl } from '../../../constants/api';

const getStars = (rating) => {
    switch(rating) {
        case 1:   return <>
            <small className="pe-2">Rating:</small>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
        </>
        case 2:   return <>
            <small className="pe-2">Rating:</small>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
        </>
        case 3:   return <>
        <small className="pe-2">Rating:</small>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
        </>
        case 4:   return <>
            <small className="pe-2">Rating:</small>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
        </>
        case 5:   return <>
            <small className="pe-2">Rating:</small>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
        </>
        
        default:   return <>
        <small className="pe-2">Rating:</small>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
    </>
    }
}

function ImageRating(props) {
    const [ratings, setRating] = useState([]);

    useEffect(() => {
        if(props.imgId){
            const userRating = document.querySelectorAll(".ratingValue");
            const fetch = async () => {
                try {
                    axios.get(API_RatingUrl).then((response) => {
                        let values = [];
                        response.data.forEach(element => {
                            if(element.imgId === props.imgId){
                                values.push(parseInt(element.ratingValue));
                            }
                        });
                        if(values.length > 0){
                            if(values.length === 1){
                                const avg = values[0];
                                setRating(avg);
                            }else {
                                const sum = values.reduce((a, b) => a + b, 0);
                                const avg = (sum / values.length) || 0;
                                //console.log(Math.round(avg))
                                setRating(Math.round(avg));
                            }
                        }else{
                            setRating(false);
                        }
                      });
                } catch (err) {
                  console.error(err);
                }
            };
            fetch();
            userRating.forEach(element => {
                element.onclick = (e) => {
                    setTimeout(() => {
                        fetch();
                      }, "500");
                }
            });
        }
      }, [props.imgId, ratings]);

      if(!props.imgId) return 'Getting Ratings';
  return (
    <>
        <div className="image-rating d-flex flex-row-reverse">
            <div>{ratings? 
            (<>{ getStars(ratings) }</>) 
            : 
            (<><small className="pe-2">Rating:</small>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i></>)}
            </div>
        </div>
    </>
  )
}

export default ImageRating