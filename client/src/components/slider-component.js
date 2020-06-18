import React , {Component} from 'react'

import "../shared/stylesheets/slider-style.css"
import slides from '../shared/data/slider-images'
import {Slide} from 'react-slideshow-image'



class Slider extends Component
{
    // constructor(props){
    //     super(props);
    // }
    render()
    {
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            pauseOnHover: true,
        }

        const Slideshow = () => {
            return (
            <div className="slider-wrapper">
              <div className="carousel slide" id="carouselExampleIndicators" data-ride="carousel">
                <Slide {...properties}>
                {this.props.images.map((img,key)=>
                    <div key={key} className="each-slide">
                        <div style={{'backgroundImage': `url(${img.image})`}}>
                        </div>
                    </div>
                )}
                </Slide>

              </div>
            </div>
            )
        }

        return(
            <div>
                {Slideshow()}
            </div>
        );
    }
}
export default Slider;