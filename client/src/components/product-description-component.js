import React , {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/stylesheets/product-description-style.css'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import productsdata from '../shared/data/products-data'
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
class ProductDetails extends Component
{
    constructor(props){
        super(props);
        this.state = {
            product : [],
            rating: 0,
            comments: [],
            sellers: [],
            avgrating: 0
        };
        this.changeRating = this.changeRating.bind(this);
    }
    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        });
    }
    componentDidMount(){
        Axios.get(`${serverUrl}item/`+this.props.match.params.id)
        .then(ans=>{
            ans = JSON.parse(ans.data)
            this.setState({
                product: ans[0][0],
                sellers: ans[1],
                comments: ans[3]
            })
        })
        .catch(err=>{
            console.log(err);
        });

        let asx = 0;
        this.state.comments.map(comm=>{
            asx+=comm.rating;
        })
        const average = asx / this.state.comments.length;
        console.log("AVG",average,asx)
        this.setState({
            avgrating: average
        })
    }
    render()
    {

        const getProductSellers = () => {
        
            return(
                <>
                <h6>Sellers</h6>
                {this.state.sellers.map((seller,index)=>
                    <div class="row sellerlist" style={{fontSize:"12px"}} key={index}>
                        <div class="col-lg-8 col-sm-12">
                            {seller.sellerName}
                            <br/>
                            {seller.pricePerItem} {seller.unit} {seller["quantity"]}
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="input-group mb-3">
                                <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <div class="input-group-append">
                                    <button class="btn btn-success btn-sm" type="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </>
            );
        }
        const RenderProductDetails= () => {
            return(
                <div class="card w-100 h-100">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-9 col-sm-12">
                                <small>{this.state.product.category} Department</small>
                                <h2>{this.state.product.name}</h2>
                            </div>
                            <div class="col-lg-3 col-sm-12" style={{textAlign:"right",color:"green"}}>
                                <small>Rs/Kg (Avg)</small>
                                <h3>{this.state.product.AvgPrice}/-</h3>
                            </div>
                        </div>
                        <p><strong>Rating :</strong> {this.state.avgrating} Out of 5 ({this.state.comments.length} reviews)</p>
                        <p>{this.state.product.description}</p>
                        <hr/>
                        {getProductSellers()}
                    </div>
                </div>
            );
        }
        const RenderProductImage = () =>{
            if(this.state.product.images)
            {
                return(
                    <div class="card">
                        <img className = "card-img-top" src = {this.state.product.images[0]} alt = {this.state.product.name}></img>
                    </div>
                );
           }
           else{
               return(
                <div class="card">
                    <img className = "card-img-top" src="/assets/images/rice.jpg" alt = {this.state.product.name}></img>
                </div>
               );
           }
        }
        const RenderComments = () =>{
            return(
                <div class="card w-100 snippets">
                    <div class="card-body">
                        <h5 class="card-title">Product Comments</h5>
                        <textarea className="form-control" placeholder="Write a comment!" rows="3"></textarea>
                        <br/>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="green"
                            starSpacing="5px"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            starDimension="30px"
                            name='rating'
                            />
                        <button type="button" className="btn btn-info pull-right">Post</button>
                        <br/><br/>
                        <hr/>
                        {
                            this.state.comments.map((comment,index)=>
                                <div class="container-fluid" key={index}>
                                    
                                    <div className="media-body">
                                        <span className="text-muted pull-right">
                                            <small className="text-muted">30 min ago</small>
                                        </span>
                                        <strong className="text-secondary">@{comment.buyerusername}</strong>
                                        <p>
                                            {comment.review}
                                        </p>
                                        <small className="text-muted">Rating: {comment.rating}/5. Seller- {comment.sellerfullname}</small>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            );
        }
        return(
            <div class="container">
                <div className = "desc-wrapper" style={{paddingTop:"70px"}}>
                    <div className = "row item-wrapper">
                        <div className = "col-lg-4 col-sm-12" > 
                            <RenderProductImage/>
                        </div>
                        <div className = "col-lg-8 col-sm-12" > 
                            <RenderProductDetails/>
                        </div>
                        <div className = "col-lg-12 col-sm-12" style={{marginTop:"2em"}}> 
                            <RenderComments/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductDetails;