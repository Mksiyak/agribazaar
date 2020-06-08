import React,{Component} from "react";
import Slider from './slider-component';
import Products from './products-component';
import "../shared/stylesheets/index-style.css"
import slides from '../shared/data/slider-images'
import offerdata  from '../shared/data/offer-data'
import Axios from "axios";
import { serverUrl } from "../shared/baseUrl";

const Offers = () => {
    return (
      <div className="containers-fluid">
      <div className="section-heading" >Affiliates and Sponsorors</div>
      <hr/>
      <div className="row">
      {
          offerdata.offers.map( offer=>
            <div key={offer.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="card" ><img className="card-img-top" src={offer.image} alt="" /></div>
            </div>
            )
      }
      </div>
      <div className="section-heading">Offers and Discounts</div>
      <hr/>
      </div>
    );
}


class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        Axios.get(serverUrl+`item?count=4`)
        .then(res=>{
            this.setState({
                items: res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        return (
            <div>
                <div className='slider'><Slider images = {slides.images}/></div>
                <div className="offer"><Offers/></div>
                <div className="containers-fluid">
                    <div className='products'>
                        <Products items={this.state.items}/>
                    </div>
                </div>  
            </div>
        );
    }
}
export default Index