import axios from 'axios'

const ShopHelper = {
    getAllProducts: async function() {
        let res = await axios({
            method: 'GET',
            url: 'http://localhost:3001'
        }).then((response) => {
            return response.data.items
        }).catch(err => console.log(err))
        return res;
    },
    getCart: async function() {
        if(localStorage.getItem('checkout-id')){
            let checkoutId = localStorage.getItem('checkout-id')
            let res = await axios({
                method: 'POST',
                url: 'http://localhost:3001/cart/order-info',
                data: {
                    orderId: checkoutId
                }
            }).then((response) => {
                console.log(response.data)
                return response.data
            }).catch(err => console.log(err))
            return res
        } else {
            return []
        }
    },
    getCategories: async function() {
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: 'http://localhost:3001/items/categories'
        }).then((response) => {
            console.log(response)
            return response
        }).catch(err => console.log(err))
        return res;
    },
    getMens: async function() {
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: 'http://localhost:3001/items/mens'
        }).then((response) => {
            console.log(response)
            return response
        }).catch(err => console.log(err))
        return res;
    },
    getImages: async function() {
        let res = await axios({
            method: 'GET',
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
            url: 'http://localhost:3001/items/images'
        }).then((response) => {
            console.log(response)
            return response
        }).catch(err => console.log(err))
        return res;
    },
    clearCart: function(){
        localStorage.removeItem('checkout-id')
        console.log('Cart Cleared!')
    }
}

export default ShopHelper;