import React , {Component} from 'react'

import "../shared/stylesheets/slider-style.css"
import slides from '../shared/data/slider-images'
class Slider extends Component
{
    // constructor(props){
    //     super(props);
    // }
    render()
    {
        const Slideshow = () => {
            return (
              <div className="slider-wrapper">
              <div className="carousel slide" id="carouselExampleIndicators" data-ride="carousel">
                <ol className="carousel-indicators">
                    {
                        slides.images.map((slide,key) =>
                        <li key={key} className="active" data-target="#carouselExampleIndicators" data-slide-to="0"></li>
                    )
                    }
                </ol>
                <div className="carousel-inner">
                {
                        this.props.images.map((slide,key) =>
                            {
                                return slide.id === 0 ?
                                <div key={key} className="carousel-item active"><img className="d-block w-100" src={slide.image} alt="Carousel 1" /></div>
                                :
                                <div key={key} className="carousel-item"><img className="d-block w-100" src={slide.image} alt="Carousel 2" /></div>            
                            }
                    )
                }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                   <span className="carousel-control-next-icon" aria-hidden="true"></span>
                   <span className="sr-only">Next</span>
                </a>
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