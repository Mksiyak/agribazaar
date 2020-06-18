import React, { Component } from "react";
import '../App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverUrl } from "../shared/baseUrl";

export default class OpenOrders extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
    }
    componentDidMount(){
        Axios.get(`${serverUrl}farmers/open?userid=${this.props.user.id}`)
        .then(res=>{
            this.setState({
                orders: res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        return(
            <div className="container" style={{paddingTop:"2em",paddingBottom:"2em"}}>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Shipment List</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Your Quick Review</h6>
                                <p className="card-text" style={{paddingTop:"1em"}}>
                                    {this.state.orders.map((item,index)=>
                                        <div className="row" key={index} style={{marginLeft:"5px"}}>
                                            <div className="col-lg-9 col-md-6 col-sm-12">
                                                <b>{item.name} for {item.username}</b>
                                                <br/>
                                                <small>{item.category} Department</small>
                                                <br/>
                                                Address: {item.address}
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12" style={{textAlign:"right"}}>
                                                <h6>{item.pricePerItem*item.BuyerQty} Rs</h6>
                                            </div>
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}