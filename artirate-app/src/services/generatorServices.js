import React from "react";
import axios from "axios";
import { API_GeneratorUrl } from "../constants/api.js";


export function GetGeneratorById(id) {
  React.useEffect(() => {
    const url = API_GeneratorUrl + "/" + id; 
    axios.get(url).then((response) => {
      return response.data
    });
  }, []);
}
