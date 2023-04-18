import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../../services/AuthContext.js";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap'

import "bootstrap-icons/font/bootstrap-icons.css";

function TopNav(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><h1>ArtiRate</h1></Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto justify-content-end flex-grow-1 align-items-center">
            <LinkContainer to="/upload">
              <Nav.Link>
                <Button variant="outline-light">Upload</Button>
              </Nav.Link>
            </LinkContainer>
              {!user ? (
                <LinkContainer to="/profile">
                  <Nav.Link>LogIn</Nav.Link>
                  </LinkContainer>
              ):(
                <LinkContainer to="/profile">
                <Nav.Link><i className="bi bi-person-circle profile-img text-light"></i></Nav.Link>
                </LinkContainer>
              )}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default TopNav;