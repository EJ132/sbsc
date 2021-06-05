import { render } from '@testing-library/react';
import React from 'react';
import { Container, Row, Col, Image, Button, Spinner} from 'react-bootstrap'
import { Component } from 'react';
import axios from 'axios'
import ShopHelper from '../../Helpers/shopHelper'
import './Product.css'

export default class Product extends Component {

    state = {
        count: 1
    }

    async componentDidMount() {
        const paramId = this.props.match.params.id
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: `http://localhost:3001/items/product/${paramId}`
        }).then((response) => {
            console.log(response)
            this.setState({
                item: response.data.items
            })
            console.log(response.data.items)
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <Container className="py-5">
                {!this.state.item ? <Spinner className="spinner" animation="grow" variant="warning" /> :
                    <Row className="py-5">
                        <Col>
                            <Image src={this.state.item.relatedObjects[2].imageData.url} style={{objectFit: 'cover'}} className="itemImg" />
                        </Col>
                        <Col>
                            <Row>
                                <h1 className="h2 text-left">{this.state.item.object.itemData.name}</h1>
                            </Row>
                            <Row>
                                <h1 className="h3 text-left">${this.state.item.object.itemData.variations[0].itemVariationData.priceMoney.amount.toFixed(2)}</h1>
                            </Row>
                            {/* <Row>
                                <h1>Options</h1>
                            </Row> */}
                            <Row>
                                <h1 className="h4 text-left">Quantity</h1>
                            </Row>
                            <Row>
                                <div className="quantityBox w-50 p-3 my-3">
                                    <div className="quantitySub"><h1 className="h4">-</h1></div>
                                    <div className="quantityCount"><h1 className="h4">{this.state.count}</h1></div>
                                    <div className="quantityAdd"><h1 className="h4">+</h1></div>
                                </div>
                            </Row>
                            <Row className="my-3">
                                <Button variant="info" style={{backgroundColor: '#d39e00', borderColor: '#d39e00'}}>ADD TO CART</Button>
                            </Row>
                            <Row>
                                <h1 className="h4 text-left">{this.state.item.object.itemData.description}</h1>
                            </Row>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}