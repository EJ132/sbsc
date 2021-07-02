import React from 'react';
import config from '../Square/PaymentForm';
import './square.css'

const Square = ({ paymentForm, totalAmount }) => {

    paymentForm = new paymentForm(config);
    paymentForm.build();
    const requestCardNonce = () => {
        paymentForm.requestCardNonce();
    }

    return (
        <div id="form-container">
            <div id="sq-card-number"></div>
            <div className="third" id="sq-expiration-date"></div>
            <div className="third" id="sq-cvv"></div>
            <div className="third" id="sq-postal-code"></div>
            <button id="sq-creditcard" className="button-credit-card" onClick={requestCardNonce}> Pay ${totalAmount}</button>
        </div>
      
    )
}

export default Square;