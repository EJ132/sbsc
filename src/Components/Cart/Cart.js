import React, { Component } from 'react'
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import axios from 'axios'
import './Cart.css'
import {ShopContext} from '../../shopContext'
import ShopHelper from '../../Helpers/shopHelper'

export default class Cart extends Component {

    static contextType = ShopContext;

    state = {
        current_cart: [],
        order_details: "",
    }

    async componentDidMount(){
        let cart_items = await ShopHelper.getCart();
        console.log(cart_items)
        if(cart_items.length !== 0){
            this.setState({
                current_cart: cart_items.orderInfo.lineItems,
                order_details: cart_items
            })
        } else {
            return;
        }
    }

    clearCart = () => {
        ShopHelper.clearCart();
        window.location.reload();
    }

    navigateTo = (path) => {
        // console.log(window.location.pathname)
        window.location.pathname = path
    }
    
    render(){
        return(
            <Container className="pb-5">
                <Row className="pt-5">
                    <Col>
                        <h1 className="h1 text-left" style={{color: "white"}}>Cart</h1>
                    </Col>
                    <Col></Col>
                </Row>
                
                {this.state.current_cart.map(product => 
                    <Row key={product.name} className="my-4">
                        {/* <Col sm={3}>
                            <Image src={product.images[0].url} className="cart-image text-center" height="100px" width="200px" />
                        </Col> */}
                        <Col>
                            <Row>
                                <Col xs={12} md={6} lg={6}>
                                    <h1 className="text-left h2">{product.name}</h1>
                                </Col>
                                <Col xs={12} md={2} lg={2}>
                                    <h1 className="h4 remove" >Remove</h1>
                                </Col>  
                                <Col xs={12} md={2} lg={2}>
                                    <h1 className="h4 quantity" >Quantity: 1</h1>
                                </Col>
                                <Col xs={12} md={2} lg={2}>
                                    <h1 className="h3 amount" >${product.variationTotalPriceMoney.amount}</h1>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                )}
                <Row className="mt-5">
                    <Col lg={4}></Col>
                    <Col lg={4}>
                        <h1 className="h3 text-center">Cart Total</h1>
                        <Row>
                            <Col>
                                <h1 className="h4 text-right">Subtotal</h1>
                            </Col>
                            <Col>
                                <h1 className="h4 text-left">{`$${this.state.order_details === "" ? 0 : (this.state.order_details.orderInfo.totalMoney.amount - this.state.order_details.orderInfo.totalTaxMoney.amount).toFixed(2) }`}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1 className="h4 text-right">Shipping</h1>
                            </Col>
                            <Col>
                                <h1 className="h4 text-left">{`$${this.state.order_details === "" ? 0 : 4.00.toFixed(2)}`}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1 className="h4 text-right">Tax</h1>
                            </Col>
                            <Col>
                                <h1 className="h4 text-left">{`$${this.state.order_details === "" ? 0 : (this.state.order_details.orderInfo.totalTaxMoney.amount).toFixed(2) }`}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1 className="h4 text-right">Total</h1>
                            </Col>
                            <Col>
                                <h1 className="h4 text-left">{`$${this.state.order_details === "" ? 0 : ((this.state.order_details.orderInfo.totalMoney.amount + 4.00)).toFixed(2) }`}</h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}></Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button variant="outline-danger mx-1" onClick={() => this.clearCart()}>Clear Cart</Button>
                        <Button variant="outline-light mx-1" onClick={() => this.navigateTo('/checkout')}>Checkout</Button>
                    </Col>
                </Row>
                
            </Container>
        )
    }
    
}