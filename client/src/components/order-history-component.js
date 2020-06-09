import React, { Component } from "react";
import Axios from "axios"; 
import { serverUrl } from "../shared/baseUrl";

export default class OrderHistory extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            prev: []
        }
    }
    componentDidMount(){
        Axios.get(serverUrl+"prev?username="+this.props.user.username)
        .then(ans=>{
            this.setState({
                prev: ans.data
            })
        })
    }
    render(){
        return(
            <table style={{marginTop:"4em"}}>
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
            </table>
        )
    }

}