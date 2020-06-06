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
      
      console.log(typeof this.state.cart,this.state.cart)
      console.log(typeof ans,ans)
      this.setState({
        cart: JSON.parse(ans)
      })
    }
    componentDidMount(){
      socket.emit('send userid', { username: this.props.user.username });
      socket.on('get cart',this.ajaxGoBrr);
    }
    render(){
      return (
        <div style={{marginTop:"56px"}}>
          
          <table>
            <tr>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Seller Name</th>
            </tr>
            {this.state.cart.map(item=>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.pricePerItem} {item.unit}</td>
                <td>{item.fullname}</td>
              </tr>
            )}
          </table>
        </div>
    );
    }

}
export default Cart;