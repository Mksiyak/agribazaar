import React , {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/stylesheets/product-description-style.css'
import StarRatings from 'react-star-ratings';
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const getDropdown = (num,index,fun,id) => {
    let items = [];
    items.push(<option key={0} value="0">--</option>)      
    for (let i = 1; i <= num; i++) {             
        items.push(<option key={i} value={i}>{i}</option>);   
    }
    return(
        <select className="form-control form-control-sm fsx" id={"exampleSelect"+index} onChange = {(ev) => {fun(ev.target.value,id)}}>
            {items}
        </select>
    );
}
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
    changeRating( newRating ) {
        this.setState({
            rating: newRating
        });
    }
    componentDidMount(){
        Axios.get(`${serverUrl}item/`+this.props.match.params.id)
        .then(ans=>{
            ans = JSON.parse(ans.data)
            console.log("RESPONSE",ans,ans[5])
            this.setState({
                product: ans[0][0],
                sellers: ans[1],
                comments: ans[3],
                avgrating: ans[5][0]["avg"]
            })
        })
        .catch(err=>{
            console.log(err);
        });
        this.state.sellers.map((seller,index)=>{
            document.getElementById(`exampleSelect${index}`).innerHTML="";
        });
    }
    render()
    {
        const getProductSellers = () => {
            return(
                <>
                <h6>Sellers</h6>
                {this.state.sellers.map((seller,index)=>
                    <div className="row sellerlist" style={{fontSize:"12px"}} key={index}>
                        <div className="col-lg-9 col-lg-9 col-sm-12">
                            {seller.sellerName}
                            <br/>
                            {seller.pricePerItem} {seller.unit}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="input-group mb-3">
                                {getDropdown(seller.quantity,index,()=>{},0)}
                                <div className="input-group-append">
                                    <button className="btn btn-success btn-sm" type="button">Add to Cart</button>
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
                <div className="card w-100 h-100">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-9 col-sm-12">
                                <small>{this.state.product.category} Department</small>
                                <h2>{this.state.product.name}</h2>
                            </div>
                            <div className="col-lg-3 col-sm-12" style={{textAlign:"right",color:"green"}}>
                                <small>Rs/Kg (Avg)</small>
                                <h3>{this.state.product.AvgPrice}/-</h3>
                            </div>
                        </div>
                        <p><strong>Rating :</strong> {this.state.avgrating}/5 ({this.state.comments.length} reviews)</p>
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
                    <div className="card">
                        <img className = "card-img-top" src = {this.state.product.images[0]} alt = {this.state.product.name}></img>
                    </div>
                );
           }
           else{
               return(
                <div className="card">
                    <img className = "card-img-top" src="/assets/images/Rice.jpg" alt = {this.state.product.name}></img>
                </div>
               );
           }
        }
        const RenderComments = () =>{
            return(
                <div className="card w-100 snippets">
                    <div className="card-body">
                        <h5 className="card-title">Product Comments</h5>
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
                                <div className="container-fluid" key={index}>
                                    
                                    <div className="media-body">
                                        <span className="text-muted pull-right">
                                            <small className="text-muted">{comment.timestampUpdated}</small>
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
            <div className="container">
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