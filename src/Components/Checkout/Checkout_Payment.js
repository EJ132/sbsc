import react, { Component } from 'react';
import {Container, Row, Col, Image, Button, Form, ToggleButton} from 'react-bootstrap'
import Square from '../../Components/Square/Square';

export default class Checkout_Payment extends Component {

    render(){
        return (
            <Container className="py-5">
                <Row className="my-3">
                    <Col><h1 className="text-center checkout-title nonActive">1. Shipping</h1></Col>
                    {/* <Col xs={1} md={1} lg={1} className="circle-seperator">{String.fromCharCode(9675)}</Col> */}
                    <Col><h1 className="text-center checkout-title nonActive">2. Billing</h1></Col>
                    {/* <Col xs={1} md={1} lg={1} className="circle-seperator">{String.fromCharCode(9675)}</Col> */}
                    <Col><h1 className="text-center checkout-title active">3. Payment</h1></Col>
                </Row>
                <Row>
                    <Square paymentForm={ window.SqPaymentForm } totalAmount={this.props.totalAmount}/>
                </Row>
                {/* <div id="form-container">
                    <div id="sq-card-number"></div>
                    <div class="third" id="sq-expiration-date"></div>
                    <div class="third" id="sq-cvv"></div>
                    <div class="third" id="sq-postal-code"></div>
                    <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Pay $1.00</button>
                </div> */}
                {/* <Square paymentForm={ window.SqPaymentForm } totalAmount={this.props.totalAmount}/> */}
            </Container>
        )
    }
}