import React , {Component} from 'react'
import '../shared/stylesheets/product-description-style.css'
import StarRatings from 'react-star-ratings';
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { createNotification } from '../App';
import { withRouter } from 'react-router-dom';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
const getItems = (num) =>{
    let items = [];
    items.push(<option key={0} value="0">--</option>)      
    for (let i = 1; i <= num; i++) {             
        items.push(<option key={i} value={i}>{i}</option>);   
    }
    return items;
}
export const getDropdown = (num,index,fun,id,val) => {
    let items = [];
    items.push(<option key={0} value="0">--</option>)      
    for (let i = 1; i <= num; i++) {             
        items.push(<option key={i} value={i}>{i}</option>);   
    }
    return(
        <select value={val} className="form-control form-control-sm fsx" id={"exampleSelect"+index} onChange = {(ev) => {fun && fun(ev.target.value,id)}}>
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
            avgrating: 0,
            sellerId: null,
            seller:null,
            noOfItems: 0,
            ItemHaving:0,
            comment : "",
            ratingGiven : null,
        };
        this.changeRating = this.changeRating.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);
        
    }
    handleChangeField(key, event) {
        console.log(key,event.target.value);
        this.setState({
          [key]: event.target.value,
        });
    }
    changeRating( newRating ) {
        console.log('rating',newRating);
        this.setState({
            rating: newRating
        });
    }
    commentHandler = () =>{
        console.log('commenthandler');
        if(this.state.sellerId == null)
        {
            createNotification('warning','select seller to write review');
        }
        else{
            const user_id = this.getCookie('user_id');
            const role = this.getCookie('user_role');
            console.log(`${serverUrl}item/comments`);
            Axios.post(`${serverUrl}item/comments`,{
                rating : this.state.rating,
                review : this.state.comment,
                itemsellerid : this.state.sellerId,
                userid : user_id,
                role : role,
            })
            .then(res=>{
                console.log('result',res);
                createNotification('success','comment Posted');
                this.setState({rating : 0});
                this.setState({comment : ""});
            })
            .catch(err=>{
                console.log('error',err);
            })
        }
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
                avgrating: ans[5][0]["avg"],
            })
        })
        .catch(err=>{
            console.log(err);
        });
        this.state.sellers.map((seller,index)=>{
            document.getElementById(`exampleSelect${index}`).innerHTML="";
        });
    }
    getCookie = (name)=>{
        const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(';').shift();
    }

    submitHandler = ()=>{
        console.log('submit handler');
        if(!this.state.seller){
            createNotification('warning',"please select seller");
        }
        else if(this.state.noOfItems<=0)
        {
            createNotification("warning","choose positive number of products");
        }
        else{
            const user_id = this.getCookie('user_id');
            Axios.post(`${serverUrl}cart/${this.props.match.params.id}`,{
                sellerId:this.state.sellerId,
                quantity:this.state.noOfItems,
                userId: user_id,
            })
            .then(res=>{
                console.log("RESULT",res);
                this.props.history.push('/cart');
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    render()
    {
        
        const filterProduct = (sellerid) =>{
            var ret = null;
            this.state.sellers.map((seller)=>{
                // console.log(sellerid,seller.sellerId,seller);
                if(seller.sellerId==sellerid)ret = seller;
            })
            return ret;
        }
        const sellerChangeHandler = (ev) =>{
            const sellerId = ev.target.value;
            const seller = filterProduct(sellerId);
            console.log('seller',seller);
            const item = seller && seller.quantity;
            this.setState({sellerId:sellerId});
            this.setState({ItemHaving:item});
            this.setState({seller,seller});
        }

        const onChangeQuantity = (quantity) =>{
            this.setState({noOfItems:quantity});
            console.log("quantity" , quantity);
        }
        const getProductSellers = () => {
            return(
                <>
                <h6>Sellers</h6>
                <select value={this.state.sellerId} style={{width:'100%'}} onChange = {(ev) => {sellerChangeHandler(ev)}}> 
                    <option value = {null}>
                        -------
                    </option>
                {this.state.sellers.map((seller,index)=>
                    <option value = {seller.sellerId}>
                            {seller.sellerName}
                            {` `+seller.pricePerItem} {seller.unit}
                    </option>
                )}
                </select>
                        <div className="">
                            <div className="input-group mb-3" >
                            <select value={this.state.noOfItems} style={{width:'100%'}} onChange = {(ev) => {onChangeQuantity(ev.target.value)}}> 
                                {getItems(this.state.ItemHaving)}
                            </select>
                                <div className="input-group-append">
                                    <button onClick = {this.submitHandler.bind(this)} className={ this.props.user.id ? "btn btn-success btn-sm":"btn btn-secondary btn-sm disabled"} type="button">{this.props.user.id ? `Add to Cart` : `Log In to Add to Cart`}</button>
                                </div>
                            </div>
                    </div>
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
            console.log(this.state.seller)
            return this.state.seller?
                    <div className="card">
                        <img className = "card-img-top" src = {`/assets/uploads/${this.state.seller.itemImage}`} alt = "image not provided by seller"></img>
                    </div>
                    :
                    <div className="card">
                        <img className = "card-img-top" src = {`/assets/uploads/select.png`} alt = "image not provided by seller"></img>
                    </div>
        }
        
        const RenderComments = () =>{
            return(
                <div className="card w-100 snippets">
                    <div className="card-body">
                        <h5 className="card-title">Product Comments</h5>
                        <textarea value = {this.state.comment} onChange = {(ev)=> {this.handleChangeField('comment',ev);}} className="form-control" placeholder="Write a comment!" rows="3"></textarea>
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
                        <div class="pull-right">
                            <button onClick = {this.commentHandler.bind(this)} className={ this.props.user.id ? "btn btn-info btn-sm":"btn btn-info pull-right btn-sm disabled"} type="button">{this.props.user.id ? `submit` : `Log In to Add to Cart`}</button>
                        </div>
                        
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
export default withRouter(ProductDetails);