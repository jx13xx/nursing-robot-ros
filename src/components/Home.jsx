import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Connection from "./Connection";
import TeleOperation from "./TeleOperation";
import { Row, Col, Container } from "react-bootstrap";
import RobotState from "./RobotState";

class Home extends Component {
  state = {
    counter: 1,
  };

  render() {
    return (
      <div>
        <Container>
          <h1 className="text-center mt-3">Nursing Robot Control Interface</h1>
          <Row>
            <Col>
              <Connection />
            </Col>
          </Row>

          <Row>
            <Col>
              <TeleOperation />
            </Col>
            <Col>
              <h1>MAP </h1>
              <p>This will be added on later for displaying the map buttons</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <RobotState />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
