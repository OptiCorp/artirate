import { useState, useContext, useEffect} from "react";
import AuthContext from "../../services/AuthContext";
import { API_RatingUrl, API_UserUrl } from "../../constants/api";
import { PostRating, EditRating } from "../../services/ratingServices";
import { useNavigate } from "react-router-dom";


const toggleRating= (e) =>{
  const stars = document.querySelectorAll(".ratingValue");
  const position = e.target.dataset.value;

  if(position === "1"){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 1){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(position === "2"){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 2){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(position === "3"){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 3){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(position === "4"){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 4){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(position === "5"){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 5){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
}

const toggleRatingOut= (currentRating) =>{
  const stars = document.querySelectorAll(".ratingValue");
  if(currentRating === 0){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
    })
  }
  if(currentRating === 1){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 1){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(currentRating === 2){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 2){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(currentRating === 3){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 3){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(currentRating === 4){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 4){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
  if(currentRating === 5){
    stars.forEach((element, index) => {
      element.className = "ratingValue bi bi-star";
      if(index < 5){
        element.className = "ratingValue bi bi-star-fill";
      }
    })
  }
}


function ImageRater(props) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [apiUser, setApiUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(props.imgId){
    fetch(API_UserUrl)
       .then((response) => response.json())
       .then((data) => {
          if(user){
             data.forEach(element => {
                if(element.firebaseLink === user.uid){
                   setApiUser(element.userId);
                }
             });
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
    fetch(API_RatingUrl).then((response) => response.json()).then((data) => {
      data.forEach(element => {
        if(element.userId === apiUser && element.imgId === props.imgId){
            setRating(element.ratingValue);
        }
      });
    })}
 }, [apiUser, props.imgId, user]);


 const rateImage = async (userId, imgId, value, user) => {
  try {
    await fetch(API_RatingUrl)
    .then((response) => response.json())
    .then((data) => {
      let id = false;
      data.forEach(element => {
        if(element.userId === userId && element.imgId === imgId){
            id = element.id;
        }
      });
      if(!id){
        PostRating(userId, imgId, value, user);
        setRating(value);
      }else{
        EditRating(userId, imgId, value, user, id);
        setRating(value);
      }
      //navigate(0);
    })
    .catch((err) => {
      console.log(err.message);
    });
    return true;
  } catch (error){
    return {error: error.message}
  }
};

const starContainer = () => {
  switch(rating) {

    case 1:   return <><i className="ratingValue bi bi-star-fill" data-value="1" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 1, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="2" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 2, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="3" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 3, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="4" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 4, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="5" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 5, user)
     }}></i></>;
     

    case 2: return <> <i className="ratingValue bi bi-star-fill" data-value="1" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 1, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="2" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 2, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="3" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 3, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="4" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 4, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="5" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 5, user)
     }}></i></>;


    case 3:  return <><i className="ratingValue bi bi-star-fill" data-value="1" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 1, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="2" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 2, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="3" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 3, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="4" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 4, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="5" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 5, user)
     }}></i></>;


    case 4:  return <><i className="ratingValue bi bi-star-fill" data-value="1" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 1, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="2" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 2, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="3" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 3, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="4" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 4, user)
     }}></i>
   <i className="ratingValue bi bi-star" data-value="5" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 5, user)
     }}></i></>;


    case 5:  return <><i className="ratingValue bi bi-star-fill" data-value="1" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 1, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="2" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 2, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="3" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 3, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="4" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 4, user)
     }}></i>
   <i className="ratingValue bi bi-star-fill" data-value="5" data="true" onMouseEnter={(e) => {
      toggleRating(e);
     }}
     onMouseLeave={e => {
      toggleRatingOut(rating);
     }}
     onClick={() => {
      rateImage(apiUser, props.imgId, 5, user)
     }}></i></>;

    default:      
    return <><i className="ratingValue bi bi-star" data-value="1" data="true" onMouseEnter={(e) => {
        toggleRating(e);
       }}
       onMouseLeave={e => {
        toggleRatingOut(rating);
       }}
       onClick={() => {
        rateImage(apiUser, props.imgId, 1, user)
       }}></i>
     <i className="ratingValue bi bi-star" data-value="2" data="true" onMouseEnter={(e) => {
        toggleRating(e);
       }}
       onMouseLeave={e => {
        toggleRatingOut(rating);
       }}
       onClick={() => {
        rateImage(apiUser, props.imgId, 2, user)
       }}></i>
     <i className="ratingValue bi bi-star" data-value="3" data="true" onMouseEnter={(e) => {
        toggleRating(e);
       }}
       onMouseLeave={e => {
        toggleRatingOut(rating);
       }}
       onClick={() => {
        rateImage(apiUser, props.imgId, 3, user)
       }}></i>
     <i className="ratingValue bi bi-star" data-value="4" data="true" onMouseEnter={(e) => {
        toggleRating(e);
       }}
       onMouseLeave={e => {
        toggleRatingOut(rating);
       }}
       onClick={() => {
        rateImage(apiUser, props.imgId, 4, user)
       }}></i>
     <i className="ratingValue bi bi-star" data-value="5" data="true" onMouseEnter={(e) => {
        toggleRating(e);
       }}
       onMouseLeave={e => {
        toggleRatingOut(rating);
       }}
       onClick={() => {
        rateImage(apiUser, props.imgId, 5, user)
       }}></i></>;
  }
}
if(!props.imgId) return 'Getting Ratings';

const messageContainer = () => {
  if(rating === 0){
    return <>
    <div className="text-center text-primary"><small> You have'nt voted yet!</small></div>
    </>
  }
}

  return (
    <>
    {user ? (<>
      <div className="image-rater image-rating d-flex justify-content-center fs-1" data-user={user.uid}>
        { starContainer() }
      </div>
      { messageContainer() } 
    </>): (<>
    <div>Log in to view Details ;)</div>
    </>)}
    </>
  )
}

export default ImageRater;