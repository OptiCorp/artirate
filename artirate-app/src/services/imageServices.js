import React from "react";
import axios from "axios";
import { API_ImgUrl } from "../constants/api.js";


export function GetAllImages() {
  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      return response.data
    });
  }, []);
}

export async function PostImage(url, inputs, user) {
  console.log("inputs: " + inputs);
  console.log(inputs.prompt)
  console.log(user);
  const genId = parseInt(inputs.generator);
  
  
  
  await fetch(API_ImgUrl, {
  method: 'POST',
  body: JSON.stringify({
     imgUrl: url,
     imgTitle: inputs.title,
     imgDescription: inputs.description,
     imgPrompt: inputs.prompt,
     generatorId: genId
  }),
  headers: {
     'Content-type': 'application/json; charset=UTF-8',
     'Authorization': `Bearer ${user.accessToken}`
  },
  })
  .then((response) => response.json())
  .then((data) => {
     console.log(data)
  })
  .catch((err) => {
     console.log(err.message);
  });

};