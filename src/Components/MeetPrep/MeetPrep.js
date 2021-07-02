import React, { Component } from 'react'
import {Container,Row, Col, Image, Button} from 'react-bootstrap'
import teamSBSC from '../../Assets/team-sbsc.jpg'
import pt from '../../Assets/ashley-pt.png'
import oneOnOne from '../../Assets/one-on-one.jpeg'
import meetPrep from '../../Assets/meet-prep.jpg'

export default class MeetPrep extends Component {

    navigateTo = (path) => {
        console.log(window.location.pathname)
        window.location.pathname = path
    }

    render(){
        return(
            <Container className="pt-5 mt-5">

                <Row xs={1} md={1} lg={2}>
                    <Col>
                        <Image src={teamSBSC} fluid rounded />
                    </Col>
                    <Col>
                        <h1 className="h1 service-header text-left">Meet Prep</h1>
                        <h1 className="service-desc-h5 text-left">Go through prep with an experienced coach who knows how to make your meet day a success. For only $250, you get 8 weeks of custom linear or conjugate meet prep. This includes meet day prescription, openers, warm-ups, and pre-meet day consult. You also will get 1-1 communication and video analysis with Dr. Ash.</h1>
                        <Button variant="outline-warning py-2 px-3 my-3" href={"https://app.acuityscheduling.com/catalog.php?owner=20933683&action=addCart&clear=1&id=1027018"}>Sign Up Now</Button>
                    </Col>
                </Row>

                <Row className="more-options">
                    <Col>
                        <h1 className="h2 more-options-header pb-2 text-left">More Options</h1>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className="pt-5 pb-5">
                    <Col className="service-option py-3" onClick={() => this.navigateTo('/services/physical-therapy')}>
                        <Image src={pt} className="more-option-img pt" fluid rounded width="100%"/>
                        <h1 className="h3 pt-2 text-left">Physical Therapy</h1>
                    </Col>
                    <Col className="service-option py-3" onClick={() => this.navigateTo('/services/personal-sessions')}>
                        <Image src={oneOnOne} className="more-option-img pt" fluid rounded width="100%"/>
                        <h1 className="h3 pt-2 text-left">1 - 1 Personal Sessions</h1>
                    </Col>
                    <Col className="service-option py-3" onClick={() => this.navigateTo('/services/meet-prep')}>
                        <Image src={meetPrep} className="more-option-img pt" fluid rounded width="100%"/>
                        <h1 className="h3 pt-2 text-left">Meet Prep</h1>
                    </Col>
                </Row>

            </Container>
        )
    }
}