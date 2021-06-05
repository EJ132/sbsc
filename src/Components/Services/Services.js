import { React, Component } from "react";
import { Container, Row, Col, Image} from 'react-bootstrap'
import teamSBSC from '../../Assets/team-sbsc.jpg'
import pt from '../../Assets/ashley-pt.png'
import oneOnOne from '../../Assets/one-on-one.jpeg'
import meetPrep from '../../Assets/meet-prep.jpg'
import './Services.css'

export default class Services extends Component {

    navigateTo = (path) => {
        console.log(window.location.pathname)
        window.location.pathname = path
    }

    render(){
        return(
            <Container className="pb-5">
                <Row className="pt-5">
                    <Col>
                        <h1 className="h1 text-left" style={{color: "white"}}>Services</h1>
                        <h1 className="h5 text-left" style={{color: "white"}}>Dr. Ashley Contorno has much more than a gym to offer.</h1>
                    </Col>
                    <Col></Col>
                </Row>
                <Row xs={1} md={2} lg={2} className="pt-3">
                    <Col className="service-option py-2" onClick={() => this.navigateTo('/services/team-sbsc')}>
                        <Image src={teamSBSC} className="service-img team-sbsc" fluid rounded width="100%" />
                        <h1 className="service-h1 text-left">Team SBSC</h1>
                    </Col>
                    <Col className="service-option py-2" onClick={() => this.navigateTo('/services/physical-therapy')}>
                        <Image src={pt} className="service-img pt" fluid rounded width="100%"/>
                        <h1 className="service-h1 text-left">Physical Therapy</h1>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={2} className="pt-3">
                    <Col className="service-option py-2" onClick={() => this.navigateTo('/services/personal-sessions')}>
                        <Image src={oneOnOne} className="service-img one-on-one" fluid rounded width="100%"/>
                        <h1 className="service-h1 text-left">1 - 1 Personal Sessions</h1>
                    </Col>
                    <Col className="service-option py-2" onClick={() => this.navigateTo('/services/meet-prep')}>
                        <Image src={meetPrep} className="service-img meet-prep" fluid rounded width="100%"/>
                        <h1 className="service-h1 text-left">Meet Prep</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
}