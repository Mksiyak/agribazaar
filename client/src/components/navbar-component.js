import React, { Component } from 'react'

import "../shared/stylesheets/navbar-style.css"
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import AsyncSelect from 'react-select/async';
import { serverUrl } from '../shared/baseUrl';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
        }
    }

    renderSuggestions () {
        Axios.get(`${serverUrl}search?squery=${this.state.search_query}`)
        .then(res=>{
            console.log("AUTO",res);
            var reformatted = []
            res.data.map(objx=>{
                reformatted.push({value: objx.name, label:objx.name, description:objx.description })
            })
            this.setState({
                suggestions: reformatted
            })
        })
        .catch(err=>{
            console.log("ERR",err);
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
    handleInputChange = (newValue) => {
        this.setState({ search_query: newValue }, () => {
            if (this.state.search_query && this.state.search_query.length > 1) {
                if (this.state.search_query.length % 2 === 0) {
                    this.renderSuggestions()
                }
            } 
        });
        return newValue;
    };
    render(){
        const renderSuggestions = () => {
            return this.state.suggestions;
        };
        const navbarHandler = (userdetails) =>{
            let searchBar = (userdetails) =>{
                if(userdetails.role === "farmer"){
                    return <div id="farmer"></div>
                }
                else{
                    return(
                        <>
                        <form class="input-group w-100 d-inline" method="GET" action="/search" id = "search-form">
                                <AsyncSelect
                                    placeholder="Search on India's Biggest Farmer to Consumer Platform ..."
                                    onInputChange={this.handleInputChange}
                                    id="searchBar"
                                    handleChange={(selectedOption)=>{{alert(selectedOption)}}}
                                    loadOptions={(inputValue,callback)=>{
                                        callback(renderSuggestions(inputValue));
                                    }}
                                    name="search"
                                    styles={{
                                        indicatorSeparator: () => {},
                                        dropdownIndicator: () => {},
                                        control: styles => ({ ...styles, backgroundColor: 'white' }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                            return {
                                                ...styles,
                                                color: isSelected ? 'white':'black'
                                            }
                                        }
                                    }}
                                    formatCreateLabel={(value)=>{return "Searching '"+value+"'"}}
                                />
                                <div type="submit" className="input-group-append"><button className="btn btn-warning" type="button" id="button-addon2"><i className="fa fa-search"></i></button></div>
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
export default withRouter(Navbar);