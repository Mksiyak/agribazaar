import React, { Component, useState,useEffect } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from '../shared/baseUrl';
import '../shared/stylesheets/cart-style.css'
import productsdata from "../shared/data/products-data";
import { Link } from "react-router-dom";
import { getDropdown } from "./product-description-component";
const socket = SIOC(websocketUrl);

class Cart extends Component{
    constructor(props){
      super(props);
      this.state = {
        cart: [],
        buying_count: 0,
        buying_total: 0
      }
    }
    ajaxGoBrr = ans =>{
      let cartval = JSON.parse(ans).filter((d)=>{return d.itemStatus == "buying"});
      this.setState({
        cart: cartval,
        buying_count: cartval.length,
        buying_total: cartval.reduce((sum,d)=>{return sum+d.pricePerItem;},0)
      });
    }
    componentDidMount(){
      socket.emit('send userid', { username: this.props.user.username });
      socket.on('get cart',this.ajaxGoBrr);

    }

    render(){
      const getCartItemImage = () => {
        if(this.state.cart.image)
        {
          return <img src={this.state.cart.image} className="img-fluid img-thumbnail"/>
        }
        else{
          return <img src="/assets/images/rice.jpg" className="img-fluid img-thumbnail"/>
        }
      }


      return (
        <div className="container-fluid" style={{paddingTop:"2em",paddingBottom:"2em"}}>
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div  className="card-header">
                  <h3>Add Item</h3>
              </div>
              <h5 className="card-title">Add your crops here</h5>
              <form>
                <div className="form-group">
                    <label>Crop Type</label>
                    <input type="text" className="form-control"/>
                    <small id="emailHelp" className="form-text text-muted">Grains, Cereals, Lentils, Vegetables, Fruits, etc.</small>
                </div>
                <div className="form-group">
                    <label>Crop</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" className="form-control" min="1"/>
                </div>
                <label>Add Description</label><br/>
                <textarea class="form-control" rows="3"></textarea>Upload Pictures
                <br/>
                <input type="file" id="img" accept="image/*"/><br/>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
            <br/>
          </div>
        </div>
      );
    }

}
export default Additem;