import React,{Component} from 'react';
import './agribazaar.css'     
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import  Index from "./components/index"
import Login from "./components/login-component";
import SignUp from "./components/signup-component";
import Cart from "./components/cart-component";
import Navbar from "./components/navbar-component";
import Footer from "./components/footer-component";
import Cookies from "js-cookie";
import Product from "./components/product-description-component"
import Search from './components/search-component';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Profile from './components/profile-component';
import Addproduct from './components/add-product-component';
import OrderHistory from './components/order-history-component';
import Analytics from './components/analytics-component';
import OpenOrders from './components/orders-component';
// import OrderHistory from './components/order-history-component';
import HostedItems from './components/hosted-items-component';
import UserReviews from './components/review-component';

export const createNotification = (type,title,body,delay) => {
  console.log("NOTIF",type,body,title)
  if(!delay)
  {
    delay=1000
  }
  switch (type) {
    case 'info':
      NotificationManager.info(title);
      break;
    case 'success':
      NotificationManager.success(body,title,delay);
      break;
    case 'warning':
      NotificationManager.warning(title,body, delay);
      break;
    case 'error':
      NotificationManager.error(title, body, delay, () => {
        console.log(title,body)
      });
      break;
    default :
      NotificationManager.warning('invalid notification type',body, delay);
      break;
  }
}
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: Cookies.get('user_id'),
      email: Cookies.get('user_email'),
      username: Cookies.get('user_username'),
      role: Cookies.get('user_role'),
      remember: false,
    }
    this.handleAccount=this.handleAccount.bind(this);
  }
  handleAccount = (user_id,user_email,user_name,user_role,user_remember,his) =>{
    if(!user_email && user_email!==this.state.email)
    {
      createNotification(`success`,`Successful Logout!`,`Sorry to see you go!`);
    }
    this.setState({
      id: user_id,
      email: user_email,
      username: user_name,
      role: user_role,
      remember: user_remember
    });
    if(user_remember){
      //Cache data
      Cookies.set('user_email', this.state.email, { expires: 7 })
      Cookies.set('user_role', this.state.role, { expires: 7 })
      Cookies.set('user_id',this.state.id,{expires: 7})
      Cookies.set('user_username', this.state.username, { expires: 7 })
    }
    else{
      Cookies.remove('user_email');
      Cookies.remove('user_role');
      Cookies.remove('user_id');
      Cookies.remove('user_username');
      return <Redirect to="/"/>
    }
    if(!user_id)
    {
      his.push("/");
    }
  }
  render(){
      const DefaultContainer = ({location,history}) =>(
        <>
          <Navbar history={history} location={location} user={this.state} handleAccount={this.handleAccount}/>
            <div id="content-wrap" style={{marginTop:"40px"}}>
              <Route exact path="/cart" component={()=><Cart user={this.state}/>} />
              <Route exact path="/product/:id" component={()=><Product user={this.state}/>}/>
              <Route path="/search" component={Search}/>
              <Route exact path='/' component={() => <Index user={this.state} handleAccount={this.handleAccount} />} />
              <Route path="/profiles/:id" component={()=><Profile user={this.state}/>}/>
              <Route path="/add-item" component = {Addproduct}/>
              <Route path="/prev" component={()=><OrderHistory history={history} user={this.state}/>}/>
              <Route path="/all" component={()=><HostedItems user={this.state}/>}/>
              <Route path="/comments" component={()=><UserReviews user={this.state}/>}/>
              <Route path="/analytics" component={()=><Analytics history={history} user={this.state}/>}/>
              <Route path="/open-orders" component={()=><OpenOrders user={this.state}/>}/>
            </div>
          <Footer/>
          {/* <Route path="/order-history" component={()=><OrderHistory user={this.state}/>}/> */}
        </>
      )
      return (

            <div className="App">
              <div id="page-container">
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/sign-in" component={() => <Login user={this.state} handleAccount={this.handleAccount}/>} />
                    <Route exact path="/sign-up" component={() => <SignUp user={this.state} handleAccount={this.handleAccount}/>} />
                    <Route component={DefaultContainer}/>
                  </Switch>
                </BrowserRouter>
                <NotificationContainer/>
              </div>
            </div>
    );
  }
}
