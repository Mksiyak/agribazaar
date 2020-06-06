import React, { Component, useState,useEffect } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
const socket = SIOC(websocketUrl);

class Cart extends Component{
    constructor(props){
      super(props);
      this.state = {
        cart: []
      }
    }
    ajaxGoBrr = ans =>{
      ans = JSON.parse(ans);
      console.log(typeof this.state.cart,this.state.cart)
      console.log(typeof ans,ans)
      this.setState({
        cart: ans
      })
    }
    componentDidMount(){
      socket.emit('send userid', { userId: '2' });
      socket.on('get cart',this.ajaxGoBrr);
    }
    render(){
      return (
        <div style={{marginTop:"56px"}}>
          <table>
            <tr>
              <th>Item Name</th>
              <th>Buying From</th>
              <th>Quantity (in kg)</th>
              <th>Price</th>
            </tr>
            {this.state.cart.map(item=>
              <tr key="1">
                <td>{item.ItemName}</td>
                <td>{item.SellerName}</td>
                <td>{item.ItemPrice}</td>
                <td>{item.Quantity}</td>
              </tr>
            )}
          </table>
        </div>
    );
    }

}
export default Cart;