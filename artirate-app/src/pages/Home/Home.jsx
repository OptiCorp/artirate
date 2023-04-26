import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

import { API_ImgUrl } from "../../constants/api.js";
import AuthContext from "../../services/AuthContext.js";
import Login from "../../components/login/Login.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageCard from "./components/ImageCard.jsx";


const Home = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = React.useState(null);
  const [filteredImages, setFilteredImages] = useState(images);

  React.useEffect(() => {
    axios.get(API_ImgUrl).then((response) => {
      setImages(response.data);
      setFilteredImages(response.data.reverse());
      //console.log(response.data);
    });
  }, []);

  if (!images) return null;

  const PER_PAGE = 9;
  const offset = currentPage * PER_PAGE;
  const currentPageData = filteredImages
    .slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filteredImages.length / PER_PAGE);
 

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; 
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = images.filter((data) => {
      return (
        data.imgTitle.toLowerCase().search(value) !== -1 ||
        data.imgPrompt.toLowerCase().search(value) !== -1 )
    })
    setFilteredImages(result);
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
        <h4 className="text-center mb-0 pb-0">BROWSE</h4>
        </Col>
    </Row>
    <Row className="mb-0">
        <Col className="d-flex justify-content-end mt">
        <input type="search" className="search-input text-end" placeholder="search" onChange={(event) =>handleSearch(event)}/>
        </Col>
    </Row>
    <Row className="images-container mb-0 pb-0">
    {currentPageData.map(({imgId, imgTitle, imgPrompt, imgUrl, generatorId, imgDescription}) => (
      <Col sm={4} key={imgId} className="pt-3 mt-5 mt-sm-0 mb-0 pb-0">
        <Link to={`/image?id=${imgId}&generator=${generatorId}`}>
          <ImageCard title={imgTitle} description={imgDescription} url={imgUrl} prompt={imgPrompt}/>
        </Link>
      </Col>
    ))}
      <Col xs={12} className="d-flex justify-content-end  align-self-end mt-n1 pt-0">
        <ReactPaginate
        previousLabel={<i className="bi bi-arrow-left-short"></i>}
        nextLabel={<i className="bi bi-arrow-right-short"></i>}
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