import React, { Component } from "react";
import Footer from "./footer-component";
import Navbar from './navbar-component';
import Slider from './slider-component';
export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    handleChangeField(key, event) {

    }
    handleSubmit(){

    }
    render() {
        return (
        <div>
            <div className='navbar'><Navbar/></div>
            <div className='slider'><Slider/></div>
            <div className='slider'><Slider/></div>
            <div className='slider'><Slider/></div>
            <div className="footer"><Footer/></div>
        </div>
        );
    }
}