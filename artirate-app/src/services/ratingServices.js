import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ImgUrl, API_RatingUrl, API_UserUrl } from "../constants/api.js";
import { GetGeneratorById } from "./generatorServices.js";

export async function PostRating(userId, imgId, value, user) {
    
    await fetch(API_RatingUrl, {
    method: 'POST',
    body: JSON.stringify({
        ratingValue: value,
        userId: userId,
        imgId: imgId
    }),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer ${user.accessToken}`
    },
    })
    .then((response) => response.json())
    .then((data) => {
       //console.log(data)
    })
    .catch((err) => {
       console.log(err.message);
    });
  
};
export async function EditRating(userId, imgId, value, user, ratingId) {
    const url = API_RatingUrl + "/" + ratingId;
    await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
        ratingValue: value,
        imgId: imgId,
        userId: userId,
        id: ratingId
    }),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer ${user.accessToken}`
    },
    })
    .then((response) => response.json())
    .then((data) => {
       //console.log(data)
    })
    .catch((err) => {
       console.log(err.message);
    });
  
};

export async function RatingExists(userId, imgId){
  await fetch(API_RatingUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
        if(element.userId === userId && element.imgId === imgId){
           // console.log(element.userId);
            return element.userId;
        }
    });
  })
  .catch((err) => {
     console.log(err.message);
  });
}