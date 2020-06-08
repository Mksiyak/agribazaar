import React, { Component } from "react";
import Axios from "axios";
import { serverUrl } from "../shared/baseUrl";
import Products from "./products-component";

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }
    componentDidMount(){
        Axios.get(serverUrl+`search?squery=${this.props.location.search.split('=').slice(1).join('=')}`)
        .then(res =>{
            this.setState({
                data: res.data
            })
        })
        .catch(err=>{
            console.log("Error ",err)
        });
    }
    render(){
        return (
            <p style={{paddingTop:"50px"}}>
            <div class="container">
                <div className='products'>
                    <Products items={this.state.data}/>
                </div>
            </div>
            </p>
        );
    }
}
