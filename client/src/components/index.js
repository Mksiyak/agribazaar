import React from "react";
import Slider from './slider-component';
import Products from './products-component';
import Offer from "./offer-component";
import "../shared/stylesheets/index-style.css"
import slides from '../shared/data/slider-images'


const Index = () => {
    return (
        <div>
            <div className='slider'><Slider images = {slides.images}/></div>
            <div className="offer"><Offer/></div>
            <div className="containers-fluid">
                <div className='products'>
                    <Products/>
                </div>
            </div>
            
        </div>
    );
}
export default Index