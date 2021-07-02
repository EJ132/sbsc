import React from 'react';
import { Container, Row, Col, Image, Button, Spinner} from 'react-bootstrap'
import { Component } from 'react';
import axios from 'axios'
import { ShopContext } from '../../shopContext'
import './Product.css'
import ShopHelper from '../../Helpers/shopHelper'

export default class Product extends Component {

    static contextType = ShopContext;

    state = {
        loading: false,
        count: 1,
        products: [],
        categoryId: "",
        productId: "",
        variations: [],
        selectedVariation: "",
        isVariationSelected: false,
        itemId: "",
    }

    async componentDidMount() {
        let products = await ShopHelper.getAllProducts();
        this.setState({
            products: products
          })
        const paramId = this.props.match.params.id
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: `http://localhost:3001/items/product/${paramId}`
        }).then((response) => {
            this.setState({
                item: response.data.items,
                categoryId: response.data.items.object.itemData.categoryId,
                productId: response.data.items.object.id,
                variations: response.data.items.object.itemData.variations
            })
            console.log(response)
        }).catch(err => console.log(err))
    }

    displayExtras = () => {
        // console.log(this.state.products)
        // console.log(this.state.categoryId)
        let results = [];
        this.state.products.map(item => {
            if(item.catalogItemObj.itemData.categoryId === this.state.categoryId && item.catalogItemObj.id !== this.state.productId) {
                console.log(item)
                results.push(item)
            }
        })
        console.log(results)
        return results.map((item, index) => {
            return(
                <Col key={index} className="item-hover" onClick={() => this.navigateTo(`/shop/product/${item.catalogItemObj.id}`)}>
                    <Image src={item.catalogImageObj.imageData.url} className="product-extra-image text-center" />
                    <h1 className="h3">{item.catalogItemObj.itemData.name}</h1>
                </Col>
            )
        })
    }

    displayVariations = () => {
        console.log(this.state.variations)
        return this.state.variations.map((item, index) => {
            return(
                <Col key={index} className={this.state.selectedVariation === item.itemVariationData.name ? "variationOption variationActive" : "variationOption"} 
                    onClick={() => { 
                        this.setState({ 
                            selectedVariation: item.itemVariationData.name, 
                            isVariationSelected: true,
                            selectedVariationData: item
                        }, () => {
                            console.log(this.state.selectedVariation)
                        }) 
                    }}>
                    <h1 className="h5 text-center">{item.itemVariationData.name}</h1>
                </Col>
            )
        })
    }

    navigateTo = (path) => {
        window.location.pathname = path
    }

    addItemAnimation = (item_id) => {
        let button = document.getElementById(item_id);
        button.classList.remove("btn-outline-warning");
        button.classList.add("btn-success");
        button.innerText = 'Added +'
        setTimeout(() => {
            button.classList.remove("btn-success");
            button.classList.add("btn-outline-warning");
            button.innerText = 'Add to Cart'
        }, 2000)
    }

    addItemToCart = (item_id, id) => {
        console.log(item_id)
        console.log(item_id.id)
        if(!localStorage.getItem('checkout-id')){
            axios({
                method: 'POST',
                url: 'http://localhost:3001/create-order',
                data: {
                    itemVarId: item_id.id,
                    itemQuantity: "1",
                }
            }).then((response) => {
                console.log(response.data.order)
                this.setState({
                    orderId: response.data.order.order.id,
                    itemId: item_id.id
                }, () => {
                    this.addItemAnimation(id)
                    localStorage.setItem("checkout-id", response.data.order.order.id)
                    localStorage.setItem("checkout-version", response.data.order.order.version.toString())
                })
            }).catch(err => console.log(err))
        } else {
            this.setState({
                version: parseInt(localStorage.getItem('checkout-version')),
                orderId: localStorage.getItem('checkout-id'),
                itemId: item_id.id,
            }, () => {
                console.log(`item id: ${item_id.id}, order id: ${this.state.orderId}, version: ${this.state.version}`)
                this.reqItemAddToCart(item_id.id, this.state.orderId, this.state.version)
                this.addItemAnimation(id)
            })
        }
    }

    reqItemAddToCart = (item_id, order_id, version) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3001/cart/update-order-add-item',
            data: {
                orderId: order_id,
                version: version,
                itemVarId: item_id,
                itemQuantity: "1",
            }
        }).then((response) => {
            console.log(response)
            localStorage.setItem("checkout-version", response.data.order.order.version.toString())
        }).catch(err => console.log(err))
    };

    render() {
        return (
            <Container className="py-5">
                {!this.state.item ? <Spinner className="spinner" animation="grow" variant="warning" /> :
                    <Container fluid className="py-5">
                        <Row>
                            <Col>
                                <Image src={this.state.item.relatedObjects[2].imageData.url} style={{objectFit: 'cover'}} className="productImg" />
                            </Col>
                            <Col>
                                <Row>
                                    <h1 className="h2 text-left">{this.state.item.object.itemData.name}</h1>
                                </Row>
                                <Row>
                                    <h1 className="h3 text-left">${this.state.item.object.itemData.variations[0].itemVariationData.priceMoney.amount.toFixed(2)}</h1>
                                </Row>
                                <Row>
                                    <h1 className="h4 text-left">Options</h1>
                                </Row>
                                <Row>
                                    {this.state.variations.length > 0 ? this.displayVariations() : null}
                                </Row>
                                <Row className="pt-2">
                                    <h1 className="h4 text-left">Quantity</h1>
                                </Row>
                                <Row>
                                    <div className="quantityBox w-50 p-3 my-3">
                                        <div className="quantitySub" onClick={() => {
                                            if(this.state.count < 2){

                                            } else {
                                                this.setState({ count: this.state.count - 1})
                                            }
                                            }}><h1 className="h4">-</h1></div>
                                        <div className="quantityCount"><h1 className="h4">{this.state.count}</h1></div>
                                        <div className="quantityAdd" onClick={() => this.setState({ count: this.state.count + 1})}><h1 className="h4">+</h1></div>
                                    </div>
                                </Row>
                                <Row className="my-3">
                                    {this.state.isVariationSelected ? 
                                        <button className="btn btn-info" id="add_to_cart_btn" onClick={() => this.addItemToCart(this.state.selectedVariationData, "add_to_cart_btn")} >ADD TO CART</button>
                                    :
                                        <button className="btn btn-secondary" disabled id="add_to_cart_btn" >ADD TO CART</button>
                                    }
                                </Row>
                                <Row>
                                    <h1 className="h4 text-left">{this.state.item.object.itemData.description}</h1>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-5 pt-5 divider">
                            <Col>
                                <h1 className="h3 text-center">You may also like</h1>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.products.length > 0 ? this.displayExtras() : null}
                        </Row>
                    </Container>
                }
            </Container>
        )
    }
}