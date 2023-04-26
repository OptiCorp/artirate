import { useContext, useState, useEffect } from "react";
import AuthContext from "../../services/AuthContext.js";
import { API_UserUrl } from "../../constants/api.js";
import { logOut } from "../../services/loginServices.js";
import  Login  from "../../components/login/Login.jsx"
import { Row, Col } from "react-bootstrap";

import Button from 'react-bootstrap/Button';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [apiUser, setApiUser] = useState("");

  useEffect(() => {
    fetch(API_UserUrl)
       .then((response) => response.json())
       .then((data) => {
          if(user){
             data.forEach(element => {
                if(element.firebaseLink === user.uid){
                   setApiUser(element);
                }
             });
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, [user, apiUser]);
    
    return (
    <>
    {!user ? (
                <>
                  <div><Login /></div>
                </>
              ):(
                <>
                <Row>
                  <Col>
                      <h4 className="w-100 text-center">PROFILE</h4>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                      <div className="w-100">Hi {apiUser.username}!</div>
                      <Button className="mt-5" onClick={logOut}>Logout</Button>
                  </Col>
                </Row>
                </>
              )}
    </>
    );
};

export default ProfilePage;