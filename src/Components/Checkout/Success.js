import react, { Component } from 'react';
import {Container, Row, Col, Image, Button, Form, ToggleButton} from 'react-bootstrap'
import ShopHelper from '../../Helpers/shopHelper'

export default class Success extends Component {

    state = {
        payment: {},
        paymentId: ''
    }

    async componentDidMount() {
        const paramId = this.props.match.params.receipt
        console.log('receipt id: ' + paramId)
        let paymentDetails = await ShopHelper.retrieveOrder(paramId);
        console.log(paymentDetails.data.result)
        this.setState({
            payment: paymentDetails.data.result,
            paymentId: paymentDetails.data.result.payment.id
        })
    }

    render() {
        return(
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1 className="h4 text-center">Thank you for shopping with SBSC!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="h3 text-center">{this.props.result}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="h3 text-center">Receipt ID: <span className="h4">{this.state.paymentId}</span></h1>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <h1 className="h5 text-center">Receipt will also be sent to your email.</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
}