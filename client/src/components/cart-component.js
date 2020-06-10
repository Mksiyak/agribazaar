import React, { Component } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
import '../shared/stylesheets/cart-style.css'
import { Link } from "react-router-dom";
import { getDropdown } from "./product-description-component";
import { createNotification } from "../App";
const socket = SIOC(websocketUrl);

class Cart extends Component{
    constructor(props){
      super(props);
      this.state = {
        cart: [],
        buying_count: 0,
        buying_total: 0,
        buying_quantity: [],
        suggestions: []
      }
      this.handleBuyCart=this.handleBuyCart.bind(this);
      this.handleQtyChange=this.handleQtyChange(this);
    }
    ajaxGoBrr = ans =>{
      console.log("ANSWER",JSON.parse(ans)[0],JSON.parse(ans)[2],JSON.parse(ans)[1])
      let cartval = JSON.parse(ans)[0].filter((d)=>{return d.itemStatus === "buying"});
      this.setState({
        cart: cartval,
        buying_total: cartval.reduce((sum,d)=>{return sum+d.pricePerItem*d.BuyerQty;},0),
        suggestions: JSON.parse(ans)[1],
        buying_count: cartval.reduce((sum,d)=>{return sum+d.BuyerQty;},0),
        buying_quantity: cartval.map(value=>value.BuyerQty),
        max_quantity: cartval.map(value=>value.SellerMaxQty) 

      },()=>{
        for(let i=0;i<document.getElementsByClassName("fsx").length;++i)
        {
          if(this.state.cart[i]["BuyerQty"]<=this.state.cart[i]["SellerMaxQty"])
            document.getElementsByClassName("fsx")[i].value=this.state.cart[i]["BuyerQty"]
        }
      }); 
    }
    componentDidMount(){
      socket.emit('send userid', { username: this.props.user.username });
      socket.on('get cart',this.ajaxGoBrr);

    }
    handleBuyCart(event){
      event.preventDefault();
      createNotification('warning',`You have bought ${this.state.buying_count} items for ${this.state.buying_total}!`)
    }

    render(){

      const getCartItemImage = () => {
        if(this.state.cart.image)
        {
          return <img src={this.state.cart.image} className="img-fluid img-thumbnail" alt=""/>
        }
        else{
          return <img src="/assets/images/rice.jpg" className="img-fluid img-thumbnail" alt=""/>
        }
      }

      const renderSuggestions = () => {
        return(
          <div className="card w-100" style={{marginTop:"2em"}}>
            <div className="card-body">
              <h5 className="card-title">Recommended Products</h5>
              <p className="card-text">
                {this.state.suggestions.map((item,index)=>
                <div class="row" style={{paddingTop:"1em"}} key={index}>
                  <div class="col-lg-9 col-md-6 col-sm-12">
                    <h6><Link to={`/product/${item.id}`}>{item.name}</Link></h6>
                    <small>{item.category} sold by {item.fullname}</small>

                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    {item.pricePerItem}&nbsp;{item.unit == "Rupees/Kg" ? "Rs/Kg": ""}
                  </div>
                </div>
                )}
              </p>
            </div>
          </div>
        );
      }
      return (
        <div className="container-fluid" style={{paddingTop:"2em",paddingBottom:"2em"}}>
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="card w-100">
                <div className="card-body">
                  <h3 style={{margin:"0px"}}>Your Cart</h3>
                  <hr/>
                  {this.state.cart.map((item,index)=>
                        <div className="row" style={{paddingBottom:"1em"}} key={index}>
                        <div className="col-lg-2 col-md-0 col-sm-0">
                          {getCartItemImage()}
                        </div>
                        <div className="col-lg-10 col-sm-12">
                          <div className="row">
                            <div className="col-lg-10 col-sm-12">
                              <small>{item.category}</small>
                              <h4><Link to="/">{item.name}</Link></h4>
                              Seller: <Link to="/">{item.fullname}</Link>
                              <p>{item.description}</p>
                            </div>
                            <div className="col-lg-2 col-sm-12" style={{textAlign:"right",color:"green"}}>
                              <small>{item.pricePerItem} {item.unit == "Rupees/Kg" ? "Rs/Kg": ""}</small>
                              <h5>{item.pricePerItem*item.BuyerQty} Rs</h5>
                              <div className="input-group mb-3">
                                <input class="form-control fsx" type="number" onChange={this.handleQtyChange}/>
                                <div className="input-group-append">
                                  <button className="btn btn-dark btn-sm" type="button"><i class="fa fa-trash"></i></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}
                </div>
              </div>

            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card w-100">
                <div className="card-body">
                  <h5 className="card-title text-danger">Subtotal ({this.state.buying_count} Items): {this.state.buying_total}/-</h5>
                  <p className="card-text"></p>
                  <Link onClick={this.handleBuyCart} className="btn btn-warning btn-md w-100">Proceed to Buy</Link>
                </div>
              </div>
              {renderSuggestions()}
            </div>
            <br/>
          </div>
        </div>
      );
    }

}
export default Cart;