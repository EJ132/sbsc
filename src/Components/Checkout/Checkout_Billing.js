import react, { Component } from 'react'
import {Container, Row, Col, Image, Button, Form, ToggleButton} from 'react-bootstrap'

export default class Checkout_Billing extends Component {

    state = {
        validated: false,
        billing_information: [],
        shippingOption: "",
    }

    handleSubmit = (event) => {
        const form = event.currentTarget
        console.log(event.currentTarget[1])
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.updateCheckout(2)
        }

        let billingInformation = []
        for(let i = 0; i < event.currentTarget.length - 1; i++){
            let keyPair = {[event.currentTarget[i].placeholder]: event.currentTarget[i].value}
            billingInformation.push(keyPair)
        }
        this.setState({
            validated: true,
            billing_information: [...billingInformation]
        }, () => { 
            console.log(this.state.billing_information);
        })
        event.preventDefault();
    }

    toggleShipping = (shippingOption) => {
        let el = document.getElementById(`inline-${shippingOption}`)
        if(shippingOption === "Shipping"){
            document.getElementById(`inline-Local Pickup`).checked = false;
            this.setState({
                shippingOption: shippingOption
            })
        } else {
            document.getElementById(`inline-Shipping`).checked = false;
            this.setState({
                shippingOption: shippingOption
            })
        }

    }

    render(){
        return(
            <Container>
                <Row className="my-3">
                    <Col><h1 className="text-center checkout-title nonActive">1. Shipping</h1></Col>
                    <Col><h1 className="text-center checkout-title active">2. Billing</h1></Col>
                    <Col><h1 className="text-center checkout-title nonActive">3. Payment</h1></Col>
                </Row>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        {["Same as Shipping", "Different" ].map((shippingType) => (
                            <Form.Check inline label={`${shippingType}`} onClick={() => this.toggleShipping(`${shippingType}`)} type={"checkbox"} id={`inline-${shippingType}`} />
                        ))}
                    </div>
                </Form>
                {/* <Row>
                    <Col className="text-center">
                        <h1 className="h5">Defaults to different.</h1>
                    </Col>
                </Row> */}
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} className="text-left" controlId="validationCustom01">
                            <Form.Label className="form-label">Full name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} className="text-left" controlId="validationCustom02">
                            <Form.Label className="form-label">Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Address"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} className="text-left" controlId="validationCustom03">
                            <Form.Label className="form-label">City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} className="text-left" md="6" controlId="validationCustom04">
                            <Form.Label className="form-label">State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="State"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="text-left" md="6" controlId="validationCustom05">
                            <Form.Label className="form-label">Zipcode</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Zipcode"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
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