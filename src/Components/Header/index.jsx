import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Col md={12} className="p-0">
      <Row className="p-0 m-0 header__top"></Row>
      <Row className="p-0 m-0 py-3 header__bottom align-items-center">
        <Col
          md={1}
          className="p-0 header__bottom__left d-flex justify-content-center"
        >
          <Link to="/">
            <img
              src="./Adidas_isologo.svg"
              alt=""
              className="header__bottom__left__img justify-content-center"
            />
          </Link>
        </Col>
        <Col md={11} className="p-0"></Col>
      </Row>
    </Col>
  );
};

export default Home;
