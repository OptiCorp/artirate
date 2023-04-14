import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap'

function TopNav(props) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Navbar</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/upload">
              <Nav.Link><Button variant="outline-light">Upload</Button>{' '}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>Username</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default TopNav;