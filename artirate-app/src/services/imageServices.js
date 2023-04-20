import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ImgUrl, API_UserUrl } from "../constants/api.js";
import { GetGeneratorById } from "./generatorServices.js";



export async function PostImage(url, inputs, user) {
  const genId = parseInt(inputs.generator);
  
  await fetch(API_ImgUrl, {
  method: 'POST',
  body: JSON.stringify({
     imgUrl: url,
     imgTitle: inputs.title,
     imgDescription: inputs.description,
     imgPrompt: inputs.prompt,
     generatorId: genId,
     userId: 44
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