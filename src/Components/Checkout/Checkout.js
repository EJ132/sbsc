import react, { Component } from 'react'
import {Container, Row, Col, Image, Button, Form, ToggleButton} from 'react-bootstrap'
import './Checkout.css'
import ShopHelper from '../../Helpers/shopHelper'
import Checkout_Details from './Checkout_Details'
import Checkout_Payment from './Checkout_Payment'
import Checkout_Billing from './Checkout_Billing'
// var addressValidator = require('address-validator');
// var Address = addressValidator.Address;
// var _ = require('underscore');

export default class Checkout extends Component {

    state = {
        current_cart: [],
        order_details: "",
        validated: false,
        personal_information: [],
        shippingOption: "",
        checkout_step: 999,
    }

    async componentDidMount() {
        let cart_items = await ShopHelper.getCart();
        if(cart_items.length !== 0){
            this.setState({
                current_cart: cart_items.orderInfo.lineItems,
                order_details: cart_items,
                totalAmount: cart_items.orderInfo,
                checkout_step: 0,
            })
            console.log(this.state)
        } else {
            return;
        }
    }

    updateCheckoutStep = (step) => {
        this.setState({
            checkout_step: step
        })
    }

    getCurrentStep = () => {

        if(this.state.checkout_step === 999) {
            return
        }

        console.log(this.state)
        if(this.state.checkout_step === 0) {
            return <Checkout_Details orderId={this.state.order_details.orderInfo.id} updateCheckout={this.updateCheckoutStep} totalAmount={this.state.order_details.orderInfo ? ((this.state.order_details.orderInfo.totalMoney.amount + 4.50) + (this.state.order_details.orderInfo.totalMoney.amount * 0.085)).toFixed(2) : null} />
        } else {   
            return <Checkout_Payment totalAmount={this.state.order_details.orderInfo ? (this.state.order_details.orderInfo.totalMoney.amount).toFixed(2) : null} />
        }
    }

    render(){
        return(
            <Container className="pb-5">
                <Row className="pt-5">
                    <Col>
                        <h1 className="h1 text-left" style={{color: "white"}}>Checkout</h1>
                        <h1 className="h5 text-left" style={{color: "white"}}>Hope you found everything you need!</h1>
                        {/* <Button variant="light" onClick={() => this.getTestCheckout()}>Checkout</Button> */}
                        {/* <Button variant="light" onClick={() => this.addItemToCart()}>Add Item</Button> */}
                    </Col>
                    {/* <Col></Col> */}
                </Row>
                <Container className="checkout-container p-3 my-3">
                    <Row>
                        <Col lg={6}>
                            {this.getCurrentStep()}
                        </Col>
                        {/* ORDER DETAILS */}
                        <Col>
                            <Container id="checkout-items">
                            {this.state.current_cart.map(product => 
                                <Row key={product.name} className="my-4">
                                    {/* <Col sm={3}>
                                        <Image src={product.images[0].url} className="cart-image text-center" height="100px" width="200px" />
                                    </Col> */}
                                    <Col>
                                        <Row>
                                            <Col>
                                                <h1 className="text-left h2">{product.name} - {product.variationName}</h1>
                                            </Col>
                                            <Col xs={12} lg={4}>
                                                <h1 className="h4 quantity text-right pr-2" >Quantity: 1</h1>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} lg={12}>
                                                <h1 className="h3 amount text-right pr-2" >${product.variationTotalPriceMoney.amount}</h1>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            )}
                            </Container>
                            <Container id="checkout-total">
                            <Row>
                                <Col md={8} lg={9}>
                                    <h1 className="h5 text-right">Subtotal</h1>
                                </Col>
                                <Col>
                                    <h1 className="h5 text-left">{`$${this.state.order_details === "" ? null : (this.state.order_details.orderInfo.totalMoney.amount - this.state.order_details.orderInfo.totalTaxMoney.amount).toFixed(2) }`}</h1>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col md={8} lg={9}>
                                    <h1 className="h5 text-right">Shipping</h1>
                                </Col>
                                <Col>
                                    <h1 className="h5 text-left">{`$${this.state.order_details === "" ? 0 : 4.00.toFixed(2)}`}</h1>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col md={8} lg={9}>
                                    <h1 className="h5 text-right">Tax</h1>
                                </Col>
                                <Col>
                                    <h1 className="h5 text-left">{`$${this.state.order_details === "" ? null : (this.state.order_details.orderInfo.taxes[0].appliedMoney.amount).toFixed(2) }`}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} lg={9}>
                                    <h1 className="h5 text-right">Total</h1>
                                </Col>
                                <Col>
                                <h1 className="h5 text-left">{`$${this.state.order_details === "" ? null : (this.state.order_details.orderInfo.totalMoney.amount).toFixed(2) }`}</h1>
                                </Col>
                            </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}