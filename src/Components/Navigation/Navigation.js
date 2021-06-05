import axios from "axios";
import { React, Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './Navigation.css'
import ShopHelper from '../../Helpers/shopHelper'

export default class Navigation extends Component {

    async componentDidMount() {
        let categories = await ShopHelper.getAllProducts();
        console.log(categories)
    }

    render(){
        return(
            <>
                <Navbar collapseOnSelect sticky="top" style={{backgroundImage: 'linear-gradient(to right, #8f6d06, #d39e00)'}} expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">South Bay Strength Company</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/memberships">Memberships</Nav.Link>
                                <Nav.Link href="/services">Services</Nav.Link>
                                <Nav.Link href="/contact">Contact</Nav.Link>
                                {/* <Nav.Link href="/shop">Shop</Nav.Link> */}
                                <NavDropdown title="Shop" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/shop/mens">Men's</NavDropdown.Item>
                                    <NavDropdown.Item href="/shop/womens">Women's</NavDropdown.Item>
                                    <NavDropdown.Item href="/shop/sweatshirts">Sweatshirts</NavDropdown.Item>
                                    <NavDropdown.Item href="/shop/unisex">Unisex</NavDropdown.Item>
                                    <NavDropdown.Item href="/shop/accessories">Accessories</NavDropdown.Item>
                                    {/* <NavDropdown.Item href="/shop/clinics">Clinics</NavDropdown.Item> */}
                                    {/* <NavDropdown.Divider /> */}
                                    <NavDropdown.Item href="/shop/pets">Pets</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Nav.Link href="/">My Account</Nav.Link> */}
                                <Nav.Link href="/cart">Cart</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
