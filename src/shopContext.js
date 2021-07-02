import axios from "axios";
import React, { Component } from "react";

const ShopContext = React.createContext();

class ShopProvider extends Component {

  state = {
    products: [],
    product: {},
    checkout: {},
    cart: [],
    isCartOpen: false,
  };

  async componentDidMount() {
    if (localStorage.cart) {
      this.setCart()
    } else {
      localStorage.setItem("cart", [])
    }
    await this.requestAllProducts();
  }

  setCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    this.setState({
      cart: cart,
    })
  }

  requestAllProducts = async () => {
    await axios({
      method: 'GET',
      url: 'http://localhost:3001'
    }).then((response) => {
      let items = response.data.items
      this.setState({
        products: items
      })
    }).catch(err => console.log(err))
  }

  getAllProducts = () => {
    return this.state.products
  }

  addItemToCart = (item_id, order_id, version) => {
    axios({
        method: 'POST',
        url: 'http://localhost:3001/cart/update-order-add-item',
        data: {
            orderId: order_id,
            version: version.toString(),
            itemVarId: item_id,
            itemQuantity: "1",
        }
    }).then((response) => {
        console.log(response)
    }).catch(err => console.log(err))
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          getAllProducts: this.getAllProducts,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCart: this.addItemToCart,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;