import React, { Component } from "react";
import Axios from "axios"; 
import { Link } from "react-router-dom";
import { serverUrl } from "../shared/baseUrl";
import { getCartItemImage } from "./cart-component";

export default class OrderHistory extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            prev: []
        }
    }
    componentDidMount(){
        Axios.get(serverUrl+"cart?username="+this.props.user.username)
        .then(ans=>{
            this.setState({
                prev: ans.data[0].filter((d)=>{return d.itemStatus === "bought"})
            })
        })
    }
    render(){
        return(
            <>
            <div class="container-fluid" style={{paddingTop:"2em",paddingBottom:"2em"}}>
                <div className="card w-100">
                    <div className="card-body">
                        <h3 className="card-title">Your Previous Orders</h3>
                        <p className="card-text" style={{paddingTop:"1em"}}>
                            {this.state.prev.map((item,index)=>
                            <div class="row" key={index}>
                                <div className="col-lg-1 col-md-0 col-sm-0">
                                {getCartItemImage(this.state.prev.image)}
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-12">
                                    {item.category}
                                    <h4><Link to="/">{item.name}</Link></h4>
                                    {item.description}
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-12" style={{textAlign:"right"}}>
                                    <small>Rs/Kg</small>
                                    <h6 class="text-success">{item.pricePerItem*item.BuyerQty}/-</h6>
                                    Quantity- {item.BuyerQty}
                                </div>
                            </div>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            {/* <table style={{marginTop:"4em"}}>
                <tr>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Item Category</th>
                    <th>Item Quantity</th>
                    <th>Item Price</th>
                    <th>Item Seller</th>
                </tr>
                {this.state.prev.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>{item.pricePerItem} {item.unit}</td>
                        <td>{item.fullname}</td>
                    </tr>
                ))}
            </table> */}
            </>
        )
    }

}