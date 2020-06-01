import React, { Component, useState,useEffect } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
const Cart = () => {
    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = SIOC(websocketUrl);
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }, []);
    return (
        <div style={{marginTop:"56px"}}>
          {response}
        </div>
    );
}
export default Cart;