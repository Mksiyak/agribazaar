import React,{Component} from 'react';
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
export default class UserReviews extends Component{
    constructor(props){
        super(props);
        this.state={
            reviews: []
        }
    }
    componentDidMount(){
        Axios.get(`${serverUrl}users/user/comments?userid=${this.props.user.id}`)
        .then(ans=>{
            this.setState({
                reviews: ans.data
            })
        })
    }
    render(){
        return(
            <div className="container">
                <div class="card">
                    <div class="card-body">
                        <h4>Your Reviews</h4>
                        <hr/>
                        {this.state.reviews.map((rev,index)=>
                            <div class="row" key={index}>
                                <div class="col-lg-9 col-md-6 col-sm-12">
                                    <h6>{rev.itemName} sold by {rev.sellerDetails}</h6>
                                    <p>{rev.review}</p>
                                    <p>{rev.rating}/5</p>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-12">
                                    {rev.timestampUpdated}
                                </div>
                            </div>    
                        )}
                    </div>
                </div>
            </div>
        )
    }
}