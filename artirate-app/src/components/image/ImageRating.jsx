import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { API_RatingUrl } from '../../constants/api';

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
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <i className="bi bi-star"></i>
        <small className="pe-2">Rating:</small>
    </>
    }
   
}
function ImageRating(props) {
    const [ratings, setRating] = useState([]);
    useEffect(() => {
        if(props.imgId){
            const fetch = async () => {
                try {
                    axios.get(API_RatingUrl).then((response) => {
                        let values = [];
                        //console.log(response)
                        response.data.forEach(element => {
                            //console.log(element)s
                            if(element.imgId === props.imgId){
                                console.log("found!");
                                values.push(parseInt(element.ratingValue));
                            }
                        });
                        console.log("lenght: " + values.length);
                        if(values.length > 0){
                            if(values.length === 1){
                                const avg = values[0];
                                console.log(avg)
                                setRating(avg);
                            }else {
                                const sum = values.reduce((a, b) => a + b, 0);
                            const avg = (sum / values.length) || 0;
                            console.log(avg)
                            setRating(avg);
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
        }
      }, [props.imgId]);

      if(!props.imgId) return 'Getting Ratings';
  return (
    <>
        <div className="image-rating d-flex flex-row-reverse">
            <div>{ratings? (<>{ getStars(ratings) }</>) : (<>No ratings yet!</>)}</div>
        </div>
    </>
  )
}

export default ImageRating