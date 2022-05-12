import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import ButtonCustom from "../ButtonCustom";
import GLOBAL from "../../Config/Global";

const Main = () => {
  return (
    <Row className="p-0 m-0 main">
      <Col
        md={6}
        className="p-0 d-flex align-items-center justify-content-center main__left"
      >
        <div>
          <div className="p-0 m-0 main__left__text main__left__text__title">
            {GLOBAL.TEXTS.HEADERS.MAIN_TITLE}
          </div>
          <div className="p-0 m-0 main__left__text main__left__text__subtitle">
            {GLOBAL.TEXTS.HEADERS.MAIN_SUBTITLE}
          </div>
          <Link to="/createteam">
            <ButtonCustom
              description={GLOBAL.TEXTS.BUTTONS.CREATE_TEAM}
              className="main__left__button"
              imgClassname={"fa-solid fa-arrow-right-long"}
            />
          </Link>
        </div>
      </Col>
      <Col md={6} className="p-0 main__right"></Col>
    </Row>
  );
};

export default Main;
