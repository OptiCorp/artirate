import { Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Signup from "./components/login/Signup.jsx";
import Login from "./components/login/Login.jsx";
import TopNav from './components/base/TopNav.jsx';
import Profile from "./routes/Profile.jsx";

function Layout() {
  return (
    <>
    <TopNav />
    <Outlet />
  </>
  )
}

export default Layout