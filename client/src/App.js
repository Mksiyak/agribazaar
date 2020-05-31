import React,{Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import  Index from "./components/index"
import Login from "./components/login-component";
import SignUp from "./components/signup-component";
import Cart from "./components/cart-component";
import Navbar from "./components/navbar-component";
import Footer from "./components/footer-component";
import Error from "./components/error-component"
import Cookies from "js-cookie";
import Product from "./components/product-description-component"
import Search from './components/search-component';
import SIOC from 'socket.io-client'
import { websocketUrl } from './shared/baseUrl';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: Cookies.get('user_email'),
      username: Cookies.get('user_username'),
      role: Cookies.get('user_role'),
      remember: false
    }

    this.handleAccount=this.handleAccount.bind(this)
  }
  handleAccount = (user_email,user_name,user_role,user_remember) =>{
    this.setState({
      email: user_email,
      username: user_name,
      role: user_role,
      remember: user_remember
    });
    if(user_remember){
      //Cache data
      Cookies.set('user_email', this.state.email, { expires: 7 })
      Cookies.set('user_role', this.state.role, { expires: 7 })
      Cookies.set('user_username', this.state.username, { expires: 7 })
    }
    else{
      Cookies.remove('user_email');
      Cookies.remove('user_role');
      Cookies.remove('user_username');

    }
  }
  componentDidMount(){
    const socket = SIOC(websocketUrl)
    socket.emit('get cart',2)
  }
  render(){
      const DefaultContainer = ({match,location}) =>(
        <>
        <div className='navbar'><Navbar location={location} user={this.state} handleAccount={this.handleAccount}/></div>
        <Route exact path="/cart" component={Cart} />
        <Route path="/product/:id" component={Product}/>
        <Route path="/search" component={Search}/>
        <Route exact path='/' component={() => <Index user={this.state} handleAccount={this.handleAccount} />} />
        <div className="footer"><Footer/></div>
        </>
      )
      return (
      <BrowserRouter>

          <Switch>
            <div className="App">
              
              <Route exact path="/sign-in" component={() => <Login handleAccount={this.handleAccount}/>} />
              <Route exact path="/sign-up" component={SignUp} />
              {/* <Route strict component={Error} /> */}
              <Route component={DefaultContainer}/>
            </div>
          </Switch>
      </BrowserRouter>
    );
  }
}
