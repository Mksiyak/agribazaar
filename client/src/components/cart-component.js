import React, { Component ,useEffect} from "react";
import '../App.css';
import SIOC from 'socket.io-client'
import { websocketUrl, serverUrl } from './../shared/baseUrl';
import '../shared/stylesheets/cart-style.css'
import { Link } from "react-router-dom";
import { getDropdown } from "./product-description-component";
import { createNotification } from "../App";
import Axios from "axios";

const socket = SIOC(websocketUrl);

export const getCartItemImage = (imgx) => {
  if(imgx)
  {
    return <img src={imgx} className="img-fluid img-thumbnail" alt=""/>
  }
  else{
    return <img src="/assets/images/rice.jpg" className="img-fluid img-thumbnail" alt=""/>
  }
}
class Cart extends Component{
    constructor(props){
      super(props);
      this.state = {
        cart: [],
        buying_count: 0,
        buying_total: 0,
        suggestions: []
      }
      this.handleBuyCart=this.handleBuyCart.bind(this);
    }
    
    ajaxGoBrr = ans =>{
      console.log("ANSWER",JSON.parse(ans)[0],JSON.parse(ans)[2])
      let cartval = JSON.parse(ans)[0].filter((d)=>{return d.itemStatus === "buying"});
      this.setState({
        cart: cartval,
        buying_count: cartval.reduce((sum,d)=>{return sum+d.BuyerQty;},0),
        buying_total: cartval.reduce((sum,d)=>{return sum+d.pricePerItem*d.BuyerQty;},0),
        suggestions: JSON.parse(ans)[2]
      }); 
    }
    componentDidMount(){
      socket.emit('send userid', { username: this.props.user.username });
      socket.on('get cart',this.ajaxGoBrr);
      let count = 0;
      for(let i=0;i<document.getElementsByClassName("fsx").length;++i)
      {
        count += document.getElementsByClassName("fsx")[i].value;
      }
      this.setState({
        buying_count: count
      })
    }
    componentWillReceiveProps = (nextProps) =>
    {
      if(nextProps.cart!==this.props.cart)
      {
        console.log("something changed",nextProps.cart);
      }
    }
    handleBuyCart(event){
      event.preventDefault();
      let userid = this.props.user.id;
      Axios.post(`${serverUrl}cart`,{
        userid
      }).then(res=>{
        createNotification('warning',`You have bought ${this.state.buying_count} items!`);
      })
      .catch(err=>{
        createNotification(`error`,err);
      })

    }
    render(){

      const getCartItemImage = (item) => {
          return <img src={`/assets/uploads/${item.itemImage}`} className="img-fluid img-thumbnail" alt="Image not provided by seller"/>
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
                    <h6><Link to={`/product/${item.itemId}`}>{item.name}</Link></h6>
                    <small>{item.category} sold by {item.fullname}</small>

                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    {item.pricePerItem}&nbsp;{item.unit === "Rupees/Kg" ? "Rs/Kg": ""}
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
                          {getCartItemImage(item)}
                        </div>
                        <div className="col-lg-10 col-sm-12">
                          <div className="row">
                            <div className="col-lg-10 col-sm-12">
                              <small>{item.category} Department</small>
                              <h4><Link to={`/product/${item.itemid}`}>{item.name}</Link></h4>
                              Seller: <Link to="/">{item.fullname}</Link>
                              <p>{item.description}</p>
                            </div>
                            <div className="col-lg-2 col-sm-12" style={{textAlign:"right",color:"green"}}>
                              <small>{item.pricePerItem} {item.unit === "Rupees/Kg" ? "Rs/Kg": ""}</small>
                              <h5>{item.pricePerItem*item.BuyerQty} Rs</h5>
                              {getDropdown(item.SellerQty,index)}
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