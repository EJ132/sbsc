import { React, Component } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./Banner.css";

export default class Banner extends Component {
  render() {
    return (
      <Container
        fluid
        className={this.props.toggle ? "showBanner" : "hideBanner"}
      >
        <Row>
          <Col>
            <h1 className="h3 text-center">Grand Opening August 14 - 15</h1>
            <h1 className="h5 text-center" onClick={this.props.onClick}>Close</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
