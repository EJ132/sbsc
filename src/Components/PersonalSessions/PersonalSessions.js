import React, { Component } from 'react'
import { Container, Row, Col, Image, Button} from 'react-bootstrap'
import teamSBSC from '../../Assets/team-sbsc.jpg'
import pt from '../../Assets/ashley-pt.png'
import oneOnOne from '../../Assets/one-on-one.jpeg'
import meetPrep from '../../Assets/meet-prep.jpg'

export default class PersonalSessions extends Component {

    navigateTo = (path) => {
        console.log(window.location.pathname)
        window.location.pathname = path
    }

    render(){
        return(
            <Container className="pt-5 mt-5">
                
                <Row xs={1} md={1} lg={2}>
                    <Col>
                        <Image src={oneOnOne} fluid rounded className="main-service-img" />
                    </Col>
                    <Col>
                        <h1 className="h1 service-header text-left">Personal Sessions</h1>
                        <h1 className="service-desc-h5 text-left">Perfect your form and technique for Squat, Bench, or Deadlift.</h1>
                        <Button variant="outline-warning py-2 px-3 my-3" onClick={() => this.navigateTo('/services/schedule-one-on-one')}>Book 1 on 1 Session</Button>
                    </Col>
                </Row>

                <Row className="more-options">
                    <Col>
                        <h1 className="h2 more-options-header pb-2 text-left">More Options</h1>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className="pt-5 pb-5">
                    <Col className="service-option py-3" onClick={() => this.navigateTo('/services/team-sbsc')}>
                        <Image src={teamSBSC} className="more-option-img pt" fluid rounded width="100%"/>
                        <h1 className="h3 pt-2 text-left">Team SBSC</h1>
                    </Col>
                    <Col className="service-option py-3" onClick={() => this.navigateTo('/services/physical-therapy')}>
                        <Image src={pt} className="more-option-img pt" fluid rounded width="100%"/>
                        <h1 className="h3 pt-2 text-left">Physical Therapy</h1>
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