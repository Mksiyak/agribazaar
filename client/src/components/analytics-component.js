import React, { Component } from "react";
import '../App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverUrl } from "../shared/baseUrl";

export default class Analytics extends Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            hosted_ct: 532,
            sold_ct: 532,
            sold_amt: 532,
            uploaded_ct: 523,
            cart_ct: 532,
            cart_amt: 532,
            avg_rt: 5
        }
    }
    componentDidMount(){
        Axios.get(`${serverUrl}farmers/analytics?userid=${this.props.user.id}`)
        .then(res=>{
            console.log("RESULT",res,res.data[0],res.data[2])
            this.setState({
                reviews: res.data[0],
                hosted_ct: res.data[4][0]["hosted_ct"],
                sold_ct: res.data[2][0]["bought_ct"],
                sold_amt: res.data[2][0]["bought_amt"],
                cart_ct: res.data[1][0]["buy_ct"],
                cart_amt: res.data[1][0]["buy_amt"],
                avg_rt: res.data[3][0]["avgr"]
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
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Analytics</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Your Quick Review</h6>
                                <p className="card-text">
                                    <ul>
                                        <li><b>Items on Platform (currently):</b> {this.state.hosted_ct}</li>
                                        <li><b>Items Sold on Platform:</b> {this.state.sold_ct} (Worth {this.state.sold_amt}/-)</li>
                                        <li><b>Total Items You've Uploaded:</b> {this.state.uploaded_ct}</li>
                                        <li> <b>Items in shopper's Cart:</b> {this.state.cart_ct} (Worth {this.state.cart_amt}/-)</li>
                                        <li><b>Your Average Rating:</b> {this.state.avg_rt}/5</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Your Item Reviews</h5>
                                <p className="card-text">
                                    {this.state.reviews.map((item,index)=>
                                        <div class="row" key="index" style={{marginLeft:"0px",marginRight:"0px"}}>
                                            <div class="col-lg-8 col-md-6 col-sm-12">
                                                <small>{item.username} ({item.email}) on {item.name}</small>
                                                <br/>
                                                <p>{item.review}</p>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12">
                                                <small>{item.timestampUpdated}</small>
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