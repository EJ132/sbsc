import react, { Component } from 'react'
import { Container, Row, Col, Image, Button, Form, ToggleButton } from 'react-bootstrap'
import Square from '../../Components/Square/Square';
import ShopHelper from '../../Helpers/shopHelper';

export default class Checkout_Shipping extends Component {

    state = {

    }

    async componentDidMount() {
        // console.log(this.props)
        const shippingDetails = await ShopHelper.getShippingRateDetails(localStorage.getItem('shipping-id'));
        console.log(shippingDetails)
        // await ShopHelper.getShippingRates();
    }

    render() {
        return (
            <Container>
                <Row className="my-3">
                    <Col><h1 className="text-center checkout-title nonActive">1. Information</h1></Col>
                    <Col><h1 className="text-center checkout-title active">2. Shipping</h1></Col>
                    <Col><h1 className="text-center checkout-title nonActive">3. Payment</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="text-center h4">Please select a shipping option below: </h1>
                    </Col>
                </Row>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>

                    </Form.Row>
                    <Row className="py-2">
                        <Col className="text-right">
                            <Button type="submit" variant="outline-light">Next</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}