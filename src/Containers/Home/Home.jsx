import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../Components/Header";
import Main from "../../Components/Main";

const Home = () => {
  return (
    <Container fluid={true} className="home m-0 p-0">
      <Row className="p-0 m-0">
        <Col md={12} className="p-0">
          <Header />
        </Col>
      </Row>

      <Row className="p-0 m-0">
        <Col md={12} className="p-0">
          <Main />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
