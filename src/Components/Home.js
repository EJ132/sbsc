import { React, Component } from "react";
import {Container, Card, Row, Col} from 'react-bootstrap'
import homeBG from '../Assets/home-bg.jpg'
import powerlifting from '../Assets/powerlifting.jpg'
import bodybuilding from '../Assets/bodybuilding.jpeg'
import prevention from '../Assets/prevention.jpeg'
// import sbscLogo from '../Assets/sbscLogo.jpg'
import Map from './Map'

export default class Home extends Component {

    navigateTo = (path) => {
        // console.log(window.location.pathname)
        window.location.pathname = path
    }

    render(){
        return(
            <div className="pb-5">
                <section style={{position: 'relative'}}>
                    <Container className="p-5" id="main-banner-content">
                        <img alt="home background" src={homeBG} id="home-bg" />
                        {/* <img src={sbscLogo} id="sbsc-logo" /> */}
                        <Container id="home-content" className="px-5">
                            <div className="row">
                                <h1 className="h1 bold text-left">South Bay Strength Co.</h1>
                            </div>
                            <div className="row">
                                <p className="text-left">Stand up, Stand out, Crush Shit!</p>
                            </div>
                            <div className="row">
                                <p className="text-left">387 W 6th St,</p>
                            </div>
                            <div className="row">
                                <p className="text-left">San Pedro, Ca</p>
                            </div>
                            <div className="row">
                                <p className="text-left">info@southbaystrengthco.com</p>
                            </div>
                        </Container>
                    </Container>
                </section>
                <section className="pt-3">
                    <Container fluid style={{width: '80%'}}>
                        <Card className="my-3" style={{backgroundColor: "#141414", color: "white"}}>
                            <Row xs={1} md={1} lg={2}>
                                <Col lg={5}>
                                    <img alt="powerlifting" src={powerlifting} className="card-img" />
                                </Col>
                                <Col lg={7} className="pb-4" style={{display: "flex", alignItems: "center"}}>
                                    <div className="row px-5">
                                        <h1 className="text-left card-title py-3">Powerlifting</h1>
                                        <p className="text-left card-description pb-4">Name a bar, band, block, or chain. You want it, we have it. We know powerlifters require a specific type of equipment which is why our gym is made to fit all needs. Whether you are just starting out or are experienced, SBSC is the place for your powerlifting training.</p>
                                        <button className="btn btn-outline-primary p-3" onClick={() => this.navigateTo('/memberships')}>Learn More</button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card className="my-5" style={{backgroundColor: "#b48700", color: "white"}}>
                            <Row xs={1} md={1} lg={2}>
                                <Col xs={{order: 2}} lg={{span: 7, order: 1}} className="pb-4" style={{display: "flex", alignItems: "center"}}>
                                    <div className="row px-5">
                                        <h1 className="text-left card-title py-3">Bodybuilding</h1>
                                        <p className="text-left card-description pb-4">Name a bar, band, block, or chain. You want it, we have it. We know powerlifters require a specific type of equipment which is why our gym is made to fit all needs. Whether you are just starting out or are experienced, SBSC is the place for your powerlifting training.</p>
                                        <button className="btn btn-outline-primary p-3" onClick={() => this.navigateTo('/memberships')}>Learn More</button>
                                    </div>
                                </Col>
                                <Col xs={{order: 1}} lg={{span: 5, order: 2}}>
                                    <img alt="bodybuilding" src={bodybuilding} className="card-img" />
                                </Col>
                            </Row>
                        </Card>
                        <Card className="my-3" style={{backgroundColor: "#141414", color: "white"}}>
                            <Row xs={1} md={1} lg={2}>
                                <Col lg={5}>
                                    <img alt="prevention" src={prevention} className="card-img" />
                                </Col>
                                <Col lg={7} className="pb-4" style={{display: "flex", alignItems: "center"}}>
                                    <div className="row px-5">
                                        <h1 className="text-left card-title py-3">Prevention/Recovery</h1>
                                        <p className="text-left card-description pb-4">Name a bar, band, block, or chain. You want it, we have it. We know powerlifters require a specific type of equipment which is why our gym is made to fit all needs. Whether you are just starting out or are experienced, SBSC is the place for your powerlifting training.</p>
                                        <button className="btn btn-outline-primary p-3" onClick={() => this.navigateTo('/services')}>Learn More</button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                </section>
                <section className="py-5">
                    <Container fluid style={{width: "80%"}}>
                        <Map />
                    </Container>
                </section>
            </div>
        )
    }
}
