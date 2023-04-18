import React from "react";
import { useContext } from "react";
import axios from "axios";
import { API_ImgUrl } from "../constants/api.js";
import AuthContext from "../services/AuthContext.js";


export function GetAllImages() {
  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      return response.data
    });
  }, []);
}