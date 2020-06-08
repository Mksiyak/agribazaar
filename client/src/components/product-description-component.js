import React , {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/stylesheets/product-description-style.css'
import { Link } from 'react-router-dom';
import productsdata from '../shared/data/products-data'
class ProductDetails extends Component
{
    constructor(props){
        super(props);
        this.state = {
            product : productsdata.products.find(x=> x._id=== this.props.match.params.id ),
        };
        console.log(this.state.product.comments);
    }
    componentDidMount(){

    }
    render()
    {
        const Products = () => {
            return (
            <div className = "desc-wrapper">
                <Link to="/"  >Back to home</Link>
                <div className = "row item-wrapper">
                <div className = "col-lg-6 col-sm-12" >
                    <img className = "desc-img" src = {this.state.product.images[0]} alt = {this.state.product.name}></img>
                </div>
                <div className = "col-lg-6 col-sm-12 content-desc">
                    <h3>{this.state.product.name.toUpperCase()}</h3>
                    <p>catageory : {this.state.product.tags}</p>
                    <p>price : {this.state.product.price} Rs/Kg</p>
                    <p>seller : {this.state.product.seller}</p>
                    <p>Rating : {this.state.product.rating} Out of 5 ({this.state.product.numOfreviews} reviews)</p>
                </div>
                </div>
                 <div className="row bootstrap snippets">
                    <div className="col-md-12 col-md-offset-12 col-sm-12">
                        <div className="comment-wrapper">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h4>Comment panel</h4>
                                </div>
                                <div className="panel-body">
                                    <textarea className="form-control" placeholder="write a comment..." rows="3"></textarea>
                                    <br/>
                                    <button type="button" className="btn btn-info pull-right">Post</button>
                                    <div className="clearfix"></div>
                                    <hr/>
                                    <ul className="media-list">
                                    {
                                        this.state.product.comments.map(comment=>
                                            <div>
                                                <li className="media">
                                                <Link to={'/'}>
                                                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle"/>
                                                </Link>
                                                <div className="media-body">
                                                    <span className="text-muted pull-right">
                                                        <small className="text-muted">30 min ago</small>
                                                    </span>
                                                    <strong className="text-success">@{comment.person}</strong>
                                                    <p>
                                                        {comment.comment}, <Link to="#">#consecteturadipiscing </Link>.
                                                    </p>
                                                </div>
                                                </li>
                                            </div>
                                        )
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            )
        }

        return(
            <div>
                {Products()}
            </div>
        );
    }
}
export default ProductDetails;