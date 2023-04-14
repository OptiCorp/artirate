import { useState, useEffect } from 'react';
import { API_UserUrl } from "../constants/api.js"


//Get All
export function GetAllUsers() {
   const [users, setUsers] = useState([]);
   useEffect(() => {
      fetch(API_UserUrl)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setUsers(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
};

export async function PostUser(userid, username, token) {
    console.log(userid);
    await fetch(API_UserUrl, {
    method: 'POST',
    body: JSON.stringify({
       userId: userid,
       userName: username,
       role: "User",
    }),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer ${token}`
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


export default GetAllUsers;