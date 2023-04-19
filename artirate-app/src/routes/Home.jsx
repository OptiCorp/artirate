import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

import { API_ImgUrl } from "../constants/api.js";
import AuthContext from "../services/AuthContext.js";
import Login from "../components/login/Login.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const Home = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      setImages(response.data);
      //console.log(response.data)
    });
  }, []);

  if (!images) return null;

  const PER_PAGE = 12;
  const offset = currentPage * PER_PAGE;
  const currentPageData = images
    .slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(images.length / PER_PAGE);
  //console.log(currentPageData);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}

    if (!user) {
        return <>
        <div><Login /></div>
        </>;
    }
    return (
    <>
    <Row>
        <Col>
        <h4 className="text-center">BROWSE</h4>
        </Col>
    </Row>
    <Row>
    {currentPageData.map(({imgId, imgTitle, imgPrompt}) => (
        <Col sm={4} key={imgId} className="pt-3">
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title className="text-secondary">{imgTitle}</Card.Title>
              <Card.Text className="text-dark">{imgPrompt}</Card.Text>
              </Card.Body>
              </Card>
        </Col>
    ))}
        <Col xs={12} className="mt-3 d-flex justify-content-end">
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"page-item disabled"}
        activeClassName={"page-item active"}
      />
        </Col>
    </Row>
    </>
    );
};

export default Home;