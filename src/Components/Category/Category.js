import { render } from '@testing-library/react';
import React from 'react';
import { Container, Row, Col, Image, Button, Spinner} from 'react-bootstrap'
import { Component } from 'react';
import axios from 'axios'
import ShopHelper from '../../Helpers/shopHelper'
import CategoryHelper from '../../Helpers/categoriesHelper'
import './Category.css'

export default class Category extends Component {

    state = {
        // items: [],
        images: [],
        filters: [],
        filterBy: "",
        categoryId: ""
    }

    async componentDidMount() {
        let paramId = this.props.match.params.category
        let filters = CategoryHelper.filter(function(item){
            if(item.name === paramId) {
                // console.log(item)
                return item
            }
        })
        this.setState({
            filters: filters
        }, () => {
            // console.log(this.state.filters)
        })
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: `http://localhost:3001/items/${paramId}`
        }).then((response) => {
            console.log(response)
            this.setState({
                items: response.data.items,
                categoryId: response.data.items.items[0].itemData.categoryId
            })
            return response.data.items
        }).catch(err => console.log(err))
        let products = await ShopHelper.getImages();
        this.setState({
            images: products.data.items
        })
        // this.state.items.items.map(item => console.log(item.itemData))
    }

    displayCategoryItems = (item) => {

        // console.log(item)

        let imageUrl = this.state.images.filter(function(image) {
            if(image.id === item.imageId){
                return image
            }
        })

        if(imageUrl.length > 0) {
            imageUrl = imageUrl[0].imageData.url
        } else {
            imageUrl = ""
        }


        return (
            <Col xs={6} md={6} lg={3} key={item.id} className="item my-4" onClick={() => this.handleItemClick(item.id)}>
                <Image src={imageUrl} style={{objectFit: 'cover'}} className="itemImg" />
                <h1 className="itemTitle h4 mt-3 text-center">{item.itemData.name}</h1>
                {/* <Button variant="outline-warning" id={product.catalogItemObj.itemData.variations[0].id} onClick={() => this.addItemToCart(product.catalogItemObj.itemData.variations[0].id)}>Add to Cart</Button> */}
            </Col>
        )
    }

    handleItemClick = (id) => {
        // console.log(id)
        this.navigateTo(`/shop/product/${id}`)
    }

    navigateTo = (path) => {
        // console.log(window.location.pathname)
        window.location.pathname = path
    }

    filterBy = async (item) => {

        if(item === 'clear'){
            this.setState({
                filterBy: ""
            }, async () => {
                let res = await axios({
                    method: 'GET',
                    validateStatus: (status) => {
                        return true; // I'm always returning true, you may want to do it depending on the status received
                    },
                    url: `http://localhost:3001/items/${paramId}`
                }).then((response) => {
                    console.log(response)
                    this.setState({
                        items: response.data.items,
                        categoryId: response.data.items.items[0].itemData.categoryId
                    })
                    return response.data.items
                }).catch(err => console.log(err))
                return
            })
        }

        // console.log(this.state.items)
        let paramId = this.props.match.params.category
        this.setState({
            filterBy: item
        }, async () => {
            let id = {
                paramId: paramId,
                filterText: this.state.filterBy
            }
            let res = await axios({
                method: 'POST',
                validateStatus: (status) => {
                    return true; // I'm always returning true, you may want to do it depending on the status received
                },
                url: `http://localhost:3001/items/product/search/${this.state.categoryId}/${id.filterText}`
            }).then((response) => {
                console.log(response)
                this.setState({
                    items: response.data.items
                })
                // return response.data.items
            }).catch(err => console.log(err))
        })
    }

    render() {
        return (
            <Container fluid style={{paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%',}}> 
                {this.state.items && this.state.items.items ? 
                <>
                    <Row>
                        <Col></Col>
                        <Col>
                            <h1 className="categoryHeader h1 py-3">{this.props.match.params.category}</h1>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={2} lg={2}>
                            <Row>
                                <Col xs={12} lg={12}>
                                    <h1 className="filterTitle bold text-left">FILTERS</h1>
                                </Col>
                                {this.state.filters.length > 0 ? this.state.filters[0].filters.map(item => {
                                    return (
                                        <Col xs={12} lg={12}>
                                            {this.state.filterBy === item ? 
                                                <h1 onClick={async () => await this.filterBy('clear')} className="h4 my-2 selected filterText text-left">{item}</h1>
                                                :
                                                <h1 onClick={async () => await this.filterBy(item)} className="h4 my-2 filterText text-left">{item}</h1>
                                            }
                                        </Col>
                                    )
                                }) : null}
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                {this.state.items && this.state.items.items ? this.state.items.items.map(item => this.displayCategoryItems(item)) : null}
                            </Row>
                        </Col>
                    </Row>
                </>
                :
                <Spinner className="spinner" animation="grow" variant="warning" />
                }
            </Container>
        )
    }
}