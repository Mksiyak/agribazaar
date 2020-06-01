import React, { Component, useState,useEffect } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
const Cart = () => {
    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = SIOC(websocketUrl);
      socket.emit('send userid', { userId: '2' });
      socket.on('get cart',(data)=>{
        setResponse(data)
      })
    }, []);

    return (
        <div style={{marginTop:"56px"}}>
          {response}
          <table>
            <tr>
              <th>Item Name</th>
              <th>Buying From</th>
              <th>Quantity (in kg)</th>
              <th>Price</th>
            </tr>
            {table}
          </table>
        </div>
    );
}
export default Cart;