import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

import { API_ImgUrl } from "../constants/api.js";
import AuthContext from "../services/AuthContext.js";
import Login from "../components/login/Login.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      setImages(response.data);
      console.log(response.data);
    });
  }, []);

  if (!images) return null;

  const PER_PAGE = 12;
  const offset = currentPage * PER_PAGE;
  const currentPageData = images
    .slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(images.length / PER_PAGE);
 

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const toggleClassName = (index) => {
    const getElement = "#" + index;
    document.querySelector(getElement).classList.toggle("hide");
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
    <Row className="images-container">
    {currentPageData.map(({imgId, imgTitle, imgPrompt, imgUrl, imgGenerator, imgDescription}) => (
      
        <Col sm={4} key={imgId} className="pt-3">
        <div className="browse-card card bg-dark text-white" onMouseEnter={(e) => {
                  toggleClassName(imgTitle);
                 }}
                 onMouseLeave={e => {
                  toggleClassName(imgTitle);
                 }}>
            <img className="browse-img card-img" src={imgUrl} alt={imgDescription} />
            <div className="card-img-overlay browse-layover hide" id={imgTitle}>
              <h5 className="card-title">{imgTitle}</h5>
              <p className="card-text">Generated with:</p>
            </div>
          </div>
        </Col>
    ))}
        <Col xs={12} className="mt-3 d-flex justify-content-end  align-self-end">
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