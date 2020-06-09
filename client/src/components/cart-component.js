import React, { Component } from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl } from './../shared/baseUrl';
import '../shared/stylesheets/cart-style.css'
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
      let cartval = JSON.parse(ans).filter((d)=>{return d.itemStatus === "buying"});
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
          return <img src={this.state.cart.image} className="img-fluid img-thumbnail" alt=""/>
        }
        else{
          return <img src="/assets/images/rice.jpg" className="img-fluid img-thumbnail" alt=""/>
        }
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
                              <small>{item.category} Department</small>
                              <h4><Link to="/">{item.name}</Link></h4>
                              Seller: <Link to="/">{item.fullname}</Link>
                              <p>{item.description}</p>
                            </div>
                            <div className="col-lg-2 col-sm-12" style={{textAlign:"right",color:"green"}}>
                              <small>{item.pricePerItem} {item.unit}</small>
                              <h5>{item.pricePerItem*item.quantity} Rs</h5>
                              {getDropdown(item.quantity,index)}
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
                  <Link to="#" className="btn btn-warning btn-md w-100">Proceed to Buy</Link>
                </div>
              </div>
              <div className="card w-100" style={{marginTop:"2em"}}>
                <div className="card-body">
                  <h5 className="card-title">Suggestions</h5>
                  <p className="card-text">
                    Display suggestions here.
                  </p>
                </div>
              </div>
            </div>
            <br/>
          </div>
        </div>
      );
    }

}
export default Cart;