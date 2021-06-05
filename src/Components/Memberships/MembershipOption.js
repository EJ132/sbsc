import { Button } from "react-bootstrap";
import { React, Component } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import './MembershipOption.css'

export default class MembershipOption extends Component {
    descritions = this.props.description.map(desc => {
        return console.log(desc)
    })
    render(){
        return(
            <Container className="p-5 price-table" style={{backgroundColor: "rgba(140,140,151,0.2)", color: "white"}}>
                <Row>
                    <Col>
                        <h1 className="h3 text-center">{this.props.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} md={3} lg={3}></Col>
                    <Col xs={1} md={1} lg={1}>
                        <div className="dollar-sign h5">$</div>
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                        <h1 className="h1 price-header">{this.props.price}</h1>
                    </Col>
                </Row>
                {this.props.description.map(desc => {
                    return <Row>
                        <Col>
                            <h1 className="h5 text-center">{desc}</h1>
                        </Col>
                    </Row>
                })}
                <Row className="pt-1 pb-5">
                    <Col>
                        <h1 className="h5 taxes text-center">*taxes included upon final check out</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button href={this.props.link} target="_blank" variant="warning py-2 px-4" style={{color: "white", fontWeight: "700"}}>Sign Up</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
