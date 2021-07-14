import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import { ShopContext } from "../../shopContext";
import ShopHelper from "../../Helpers/shopHelper";

export default class Shop extends Component {
  static contextType = ShopContext;

  state = {
    products: [],
    orderId: "",
    version: 0,
  };

  async componentDidMount() {
    const context = this.context.getAllProducts();
    let products = await ShopHelper.getAllProducts();
    console.log(products);
    this.setState({
      products: products,
    });
  }

  getTestCheckout = () => {
    axios({
      method: "POST",
      url: "http://localhost:3001/create-order",
      data: {
        // itemVarId: "UKVTZMEYHL3FJELIYNR47ICX",
        // itemQuantity: "1",
      },
    })
      .then((response) => {
        console.log(response.data.order);
        this.setState({
          orderId: response.data.order.order.id,
        });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  };

  addItemAnimation = (item_id) => {
    let button = document.getElementById(item_id);
    button.classList.remove("btn-outline-warning");
    button.classList.add("btn-success");
    button.innerText = "Added +";
    setTimeout(() => {
      button.classList.remove("btn-success");
      button.classList.add("btn-outline-warning");
      button.innerText = "Add to Cart";
    }, 2000);
  };

  addItemToCart = (item_id) => {
    if (!localStorage.getItem("checkout-id")) {
      axios({
        method: "POST",
        url: "http://localhost:3001/create-order",
        data: {
          itemVarId: item_id,
          itemQuantity: "1",
        },
      })
        .then((response) => {
          console.log(response.data.order);
          this.setState({
            orderId: response.data.order.order.id,
          });
          this.addItemAnimation(item_id);
          localStorage.setItem("checkout-id", response.data.order.order.id);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState(
        {
          version: this.state.version + 1,
          orderId: localStorage.getItem("checkout-id"),
        },
        () => {
          console.log(
            `item id: ${item_id}, order id: ${this.state.orderId}, version: ${this.state.version}`
          );
          this.context.addItemToCart(
            item_id,
            this.state.orderId,
            this.state.version
          );
          this.addItemAnimation(item_id);
        }
      );
    }
  };

  navigateTo = (path) => {
    window.location.pathname = path;
  };

  render() {
    return (
      <Container className="pb-5">
        <Row className="pt-5">
          <Col>
            <h1 className="h1 text-left" style={{ color: "white" }}>
              Shop
            </h1>
            <h1 className="h5 text-left" style={{ color: "white" }}>
              Browse all SBSC merch.
            </h1>
            {/* <Button variant="light" onClick={() => this.getTestCheckout()}>Checkout</Button> */}
            {/* <Button variant="light" onClick={() => this.addItemToCart()}>Add Item</Button> */}
          </Col>
          <Col></Col>
        </Row>
        <Row xs={1} md={2} lg={4} className="pt-3">
          {this.state.products.map((product) => (
            <Col
              onClick={() =>
                this.navigateTo(`/shop/product/${product.catalogItemObj.id}`)
              }
              xs={12}
              md={6}
              lg={4}
              key={product.catalogItemObj.id}
              className="my-3 item"
            >
              <Image
                src={product.catalogImageObj.imageData.url}
                style={{ objectFit: "cover" }}
                width="350"
                height="350"
              />
              <h1 className="h2 text-left">
                {product.catalogItemObj.itemData.name}
              </h1>
              <Button
                variant="outline-warning"
                id={product.catalogItemObj.itemData.variations[0].id}
                onClick={() =>
                  this.addItemToCart(
                    product.catalogItemObj.itemData.variations[0].id
                  )
                }
              >
                Add to Cart
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
