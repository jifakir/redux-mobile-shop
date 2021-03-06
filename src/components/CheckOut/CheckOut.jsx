import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckItem from './CheckItem/CheckItem';

import './CheckOut.scss';




const CheckOut = ({cart, subtotal}) => {
    const location = useHistory();
    const shipping = subtotal*0.3;
    return (
        <div className="checkout-container">
            <div className="checkout-wrapper">
                <h1 className="checkout-title">Check Out</h1>
                <ul className="checkout-items">
                    {
                        cart.length > 0 ? 
                        cart.map((item, idx) => <CheckItem key={idx} item={item}  />):
                        <li>There is no item in the cart</li>
                    }
                </ul>
                <div className="subtotal-wrapper">
                    <div className="subtotal">
                        <h3>Subtotal</h3>
                        <h3>$ {subtotal}</h3>
                    </div>
                    <div className="shipping">
                        <h3>Shipping</h3>
                        <h3>$ {shipping}</h3>
                    </div>
                </div>
                <div className="total-wrapper">
                    <h2>Total</h2>
                    <h2><span className='usd'>usd </span>$ {subtotal + shipping}</h2>
                </div>
                <div className="checkout-routing">
                    <button onClick={() => location.push('/cart')} className="back-to-cart-btn">back to cart</button>
                    <button onClick={() => location.push('/payment')} className="payment-btn">pay now</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {

    return {
        cart: state.cart.cartItems,
        subtotal: state.cart.cartItems.reduce((acc, val) => acc + (val.price * val.quantity),0),
    }
};

export default connect(mapStateToProps)(CheckOut);