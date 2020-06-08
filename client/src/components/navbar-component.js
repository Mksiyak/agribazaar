import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../shared/stylesheets/navbar-style.css"
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
// import OrderHistory from './order-history-component';
class Navbar extends Component{
    constructor(props){
        super(props);
        this.items = [
            'David',
            'Danien',
            'Sara',
            'Jane'
        ];
        this.state = {
            suggestions: [],
            text: '',
        };
    }
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return(
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    } 

    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value
        }, () => {
            if (this.state.search_query && this.state.search_query.length > 1) {
                if (this.state.search_query.length % 2 === 0) {
                    this.renderSuggestions()
                }
            } 
        })
    }
    componentDidMount(){
        if(document.getElementById("searchBar"))
        {
            document.getElementById("searchBar").value=this.props.location.search.split('=').slice(1).join('=')
        }
    }
    render(){
        const  { text } = this.state;
        const navbarHandler = (userdetails) =>{
            let searchBar = (userdetails) =>{
                if(userdetails.role === "farmer"){
                    return <div id="farmer"></div>
                }
                else{
                    return(
                        <form role="form" method="GET" action="/search" id = "search-form">
                            <div className="input-group">
                                <input onChange={(ev) => this.handleChangeField('search_query', ev)}
                                onClick="this.setSelectionRange(0, this.value.length)"
                                className="form-control" type="text" name="search" id="searchBar" placeholder="Search Here" 
                                aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div className="input-group-append"><button className="btn btn-warning" type="button" id="button-addon2"><i className="fa fa-search"></i></button></div>
                            </div>
                        </form>
                    );
                }
            }
            let navMenus = (userdetails) =>{
                if(userdetails.role === "shopper"){
                    return(
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userdetails.username}
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={"/profiles/"+userdetails.id}>Profile</Link>
                                    <Link className="dropdown-item" to="/order-history">Previous Orders</Link>
                                    <Link className="dropdown-item" to="/order-history">Previous Reviews</Link>
                                    <Link className="dropdown-item" to="/" onClick={()=>this.props.handleAccount()}>Logout</Link>
                                </div>
                            </li>
                        </>
                    )
                }
                else if(userdetails.role === "farmer"){
                    return(
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/cart">Add Items</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/cart">Analytics</Link></li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userdetails.username}
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={"/profiles/"+userdetails.id}>Profile</Link>
                                    <Link className="dropdown-item" onClick={()=>this.props.handleAccount()}>Logout</Link>
                                </div>
                            </li>
                        </>
                    )
                }
                else{
                    return(
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login/Signup
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/sign-in">Login</Link>
                                <Link className="dropdown-item" to="/sign-up">Sign Up</Link>
                            </div>
                        </li>
                    )
                }
            }
            return (
                <>
                    {searchBar(userdetails)}
                    <ul className="navbar-nav ml-auto">
                        {navMenus(userdetails)}
                    </ul>
                </>
            )
        }

        return(
            <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"> 
                <b>Agri</b>Bazaar
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {navbarHandler(this.props.user)}
                </div>
            </nav>
            
            </div>
        );
    }
}
export default Navbar;