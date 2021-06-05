import { React, Component } from "react";
import {Container, Row, Col, Image} from 'react-bootstrap'
import Olympia from '../../Assets/contact-us.jpg'
import Map from '../Map'

export default class ContactUs extends Component {
    render(){
        return(
            <Container className="pt-5">
                <Row xs={1} md={2} lg={2}>
                    <Col>
                        <h1 className="h1 text-left">Contact Us</h1>
                        <h1 className="h4 pt-2 text-left">Steven and Ashley are husband and wife as well as the owners of South Bay Strength Company. They both dedicated to their sports. Steven is a nationally qualified Bodybuilder.  Ashley is a national record-holding international elite powerlifter. They would drive endless hours to workout at gyms that barely met their needs. Holidays and off-peak hours were a nightmare.</h1>
                        <h1 className="h4 pt-3 text-left">Hence, how South Bay Strength Company was born. They wanted to create a bad ass gym that they actually WANTED to train at. The opportunity to train at a facility that is open 24/7 and has all of the equipment anyone would every need for lifting was and is a must for a serious lifter. Look no further. You are home at SBSC.</h1>
                        <h1 className="h4 pt-5 text-left reach-us">Reach us at: <a style={{color: "gold"}} href="mailto:info@southbaystrengthco.com?subject=Reaching Out">info@southbaystrengthco.com</a></h1>
                    </Col>
                    <Col className="pt-5">
                        <Image src={Olympia} fluid />
                    </Col>
                </Row>
                <Row className="py-5">
                    <Col>
                        <h1 className="h1 text-center">Parking</h1>
                        <Map />
                    </Col>
                </Row>
            </Container>
        )
    }
}