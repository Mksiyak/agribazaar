import React, { Component } from "react";
import '../App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverUrl } from "../shared/baseUrl";

export default class HostedItems extends Component{
    constructor(props){
        super(props);
        this.state = {
            hosted: []
        }
    }
    componentDidMount(){
        Axios.get(`${serverUrl}farmers/all?userid=${this.props.user.id}`)
        .then(res=>{
            this.setState({
                hosted: res.data
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
                                <h3 className="card-title">Hosted Items List</h3>
                                <h6 className="card-subtitle mb-2 text-muted">These are the items you've uploaded for sale at AgriBazaar</h6>
                                <p className="card-text" style={{paddingTop:"1em"}}>
                                    {this.state.hosted.map((item,index)=>
                                        <div className="row" key={index} style={{marginLeft:"5px"}}>
                                            <div className="col-lg-2 col-md-2 col-sm-0" style={{textAlign:"right"}}>
                                                <img className = "img-thumbnail img-fluid" src={item.itemImage ? `/assets/uploads/${item.itemImage}`: "/assets/images/Rice.jpg"}></img>
                                            </div>
                                            <div className="col-lg-6 col-md-4 col-sm-12">
                                                <b>{item.itemName}</b>
                                                <br/>
                                                <small>{item.category} Department</small>
                                                <br/>
                                                {item.itemDescription}
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12" style={{textAlign:"right"}}>
                                                <h6>{item.pricePerItem} {item.unit}</h6>
                                                Quantity: {item.quantity}
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