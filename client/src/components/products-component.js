import React , {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import productsdata from "../shared/data/products-data";
import { Link } from 'react-router-dom';
class Products extends Component
{
    render()
    {
        const Products = () => {
            return (
                    <div className="row">
                    {
                        productsdata.products.map(product=>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="card crop" >
                                    <Link to = {'/product/'+product._id}>
                                        <img className="card-img-top" src={product.images[0]} alt = {product.name}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                        </div>
                                    </Link>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Enjoy from across the country </li>
                                        <li className="list-group-item">Cereals</li>
                                        <li className="list-group-item">{product.price} Rs/Kg</li>
                                        <li className="list-group-item"><a className="btn btn-primary" href="http://localhost:3000">Vendors</a></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
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
export default Products;