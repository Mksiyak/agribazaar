import React, { Component } from 'react'

import "../shared/stylesheets/navbar-style.css"
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { serverUrl } from '../shared/baseUrl';
// import OrderHistory from './order-history-component';
class Navbar extends Component{
    constructor(props){
        super(props);
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
        Axios.get(`${serverUrl}search?squery=${this.state.search_query}`)
        .then(res=>{
            this.setState({
                suggestions: res.data
            })
        })
        .catch(err=>{
            console.log("ERR",err);
        })
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
        let mainNav = document.getElementById('navbar-nav');
        let navBarToggle = document.getElementById('navbar-toggler');

        navBarToggle.addEventListener('click', function () {
            mainNav.classList.toggle('hide');
        });
    }
    render(){
        const navbarHandler = (userdetails) =>{
            let searchBar = (userdetails) =>{
                if(userdetails.role === "farmer"){
                    return <div id="farmer"></div>
                }
                else{
                    return(
                        <>
                        <form method="GET" action="/search" id = "search-form">
                            <div className="input-group">
                                <input onChange={(ev) => this.handleChangeField('search_query', ev)}
                                onClick="this.setSelectionRange(0, this.value.length)"
                                className="form-control" type="text" name="search" id="searchBar" placeholder="Search Here" 
                                aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div className="input-group-append"><button className="btn btn-warning" type="button" id="button-addon2"><i className="fa fa-search"></i></button></div>
                            </div>
                        </form>
                        </>
                    );
                }
            }
            let navMenus = (userdetails) =>{
                if(userdetails.role === "shopper"){
                    return(
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                            <li className="nav-item dropdown">
                                <div className="dropdown-menu dropdown-menu-right hide" id="dropdownDetails" aria-labelledby="navbarDropdown">

                                </div>
                                <div className="agb-dropdown">
                                <button className="agb-dropbtn dropdown-menu-right dropdown-toggle">{userdetails.username}</button>
                                    <div className="agb-dropdown-content">
                                    <Link to={"/profiles/"+userdetails.id}>Profile</Link>
                                    <Link to="/prev">Previous Orders</Link>
                                    <Link to="/order-history">Previous Reviews</Link>
                                    <Link to="/" onClick={()=>this.props.handleAccount(undefined,undefined,undefined,undefined,undefined,this.props.history)}>Logout</Link>
                                    </div>
                                </div> 
                            </li>
                        </>
                    )
                }
                else if(userdetails.role === "farmer"){
                    return(
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/add-item">Add Items</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/all">Hosted Items</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/open-orders">Open Orders</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/analytics">Analytics</Link></li>
                            <li className="nav-item dropdown">
                                <div className="agb-dropdown">
                                <button className="agb-dropbtn dropdown-toggle">{userdetails.username}</button>
                                    <div className="agb-dropdown-content">
                                        <Link to={"/profiles/"+userdetails.id}>Profile</Link>
                                        <Link onClick={()=>this.props.handleAccount()}>Logout</Link>
                                    </div>
                                </div> 
                            </li>
                        </>
                    )
                }
                else{
                    return(
                        <li className="nav-item dropdown">
                            <div className="agb-dropdown">
                                <button className="agb-dropbtn dropdown-toggle">Login/Sign Up</button>
                                <div className="agb-dropdown-content">
                                <Link to="/sign-in">Login</Link>
                                <Link to="/sign-up">Sign Up</Link>
                                </div>
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
                <button className="navbar-toggler" id="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse hide" id="navbar-nav">

                    {navbarHandler(this.props.user)}
                </div>
            </nav>
            
            </div>
        );
    }
}
export default Navbar;