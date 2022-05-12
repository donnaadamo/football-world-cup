import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../Components/Header";
import TeamPlayers from "../../Components/TeamPlayers";
import TeamList from "../../Components/TeamList";
import UserTeam from "../../Components/UserTeam";
import { useSelector } from "react-redux";
import GLOBAL from "../../Config/Global";

const CreateTeam = () => {
  const selectedTeam = useSelector((state) => state.team);

  return (
    <Container fluid={true} className="m-0 p-0 createteam">
      <Row className="p-0 m-0">
        <Col md={12} className="p-0">
          <Header />
        </Col>
      </Row>

      <Row className="p-0 m-0 createteam__titles">
        <Col md={4} className="p-0 d-flex flex-column align-items-center">
          <p className="p-0 mb-3">{GLOBAL.TEXTS.HEADERS.CHOOSE_TEAM}</p>
          <TeamList />
        </Col>
        <Col md={4} className="p-0 d-flex flex-column align-items-center">
          <p className="p-0 mb-3">{GLOBAL.TEXTS.HEADERS.CHOOSE_PLAYERS}</p>
          {selectedTeam.id ? <TeamPlayers /> : <></>}
        </Col>
        <Col md={4} className="p-0 d-flex flex-column align-items-center">
          <p className="p-0 mb-3">{GLOBAL.TEXTS.HEADERS.MY_TEAM}</p>
          <UserTeam />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTeam;
