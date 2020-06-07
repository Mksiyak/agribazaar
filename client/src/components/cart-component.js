import React, { Component, useState,useEffect } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
import '../shared/stylesheets/cart-style.css'
import Items from '../shared/data/cart-data'
import productsdata from "../shared/data/products-data";
const socket = SIOC(websocketUrl);

class Cart extends Component{
    constructor(props){
      super(props);
      this.state = {
        cart: [],
      }
    }
    ajaxGoBrr = ans =>{
      
      console.log(typeof this.state.cart,this.state.cart)
      console.log(typeof ans,ans)
      this.setState({
        cart: JSON.parse(ans)
      })
    }
    componentDidMount(){
      this.getCart();
      socket.emit('send userid', { username: this.props.user.username });
      socket.on('get cart',this.ajaxGoBrr);
    }
    getCart = () =>{
      console.log(Items)
      Items.cart.map(Item=>
        {
          const newItem = {};
          newItem['quantity'] = Item.quantity;
          newItem['product'] = this.getProductById(Item.id);
          this.state.cart.push(newItem);
        }
        )
    }
    getProductById = (id) =>
    {
       return productsdata.products.find(x=> x._id === id);
    }
    render(){
      return (
        <div className = "cart-wrapper">
                    <h1>Shopping Cart</h1>
          <div className="shopping-cart">

            <div className="column-labels">
              <label className="product-image">Image</label>
              <label className="product-details">Product</label>
              <label className="product-price">Price</label>
              <label className="product-quantity">Quantity</label>
              <label className="product-removal">Remove</label>
              <label className="product-line-price">Total</label>
            </div>
            {this.state.cart.map = (Item=>
                  <div>
                    <div class="product">
                      <div className="product-image">
                        <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" alt = ""></img>
                      </div>
                    </div>
                  </div>
              )}
             <div class="product">
              <div className="product-image">
                <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg"></img>
              </div>
              <div className="product-details">
                <div className="product-title">Dingo Dog Bones</div>
                <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
              </div>
              <div className="product-price">12.99</div>
              <div className="product-quantity">
                <input type="number" value="2" min="1"></input>
              </div>
              <div className="product-removal">
                <button className="remove-product">
                  Remove
                </button>
              </div>
              <div className="product-line-price">25.98</div>
            </div>

            <div className="totals">
              <div className="totals-item">
                <label>Subtotal</label>
                <div className="totals-value" id="cart-subtotal">71.97</div>
              </div>
              <div className="totals-item">
                <label>Tax (5%)</label>
                <div className="totals-value" id="cart-tax">3.60</div>
              </div>
              <div className="totals-item">
                <label>Shipping</label>
                <div className="totals-value" id="cart-shipping">15.00</div>
              </div>
              <div className="totals-item totals-item-total">
                <label>Grand Total</label>
                <div className="totals-value" id="cart-total">90.57</div>
              </div>
            </div>

                <button className="checkout">Checkout</button>
          </div> 
                  </div>
    );
    }

}
export default Cart;