import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../shared/stylesheets/navbar-style.css"
import { Link } from 'react-router-dom';
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            search_query: ""
        }
        this.handleChangeField=this.handleChangeField.bind(this)
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    render(){

        const navbarHandler = (userdetails) =>{
            let searchBar = (userdetails) =>{
                if(userdetails.role == "farmer"){
                    return <div id="farmer"></div>
                }
                else{
                    return(
                        <form role="form" method="GET" action="/search" id = "search-form">
                            <div className="input-group">
                                <input onChange={(ev) => this.handleChangeField('search_query', ev)}
                                className="form-control" type="text" name="search" placeholder="Search Here" aria-label="Recipient's username" aria-describedby="button-addon2" />
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
                            <li className="nav-item"><a className="nav-link" href="/cart">Cart</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userdetails.username}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" onClick={()=>this.props.handleAccount()}>Logout</Link>
                                </div>
                            </li>
                        </>
                    )
                }
                else if(userdetails.role === "farmer"){
                    return(
                        <>
                            <li className="nav-item"><a className="nav-link" href="/cart">Add Items</a></li>
                            <li className="nav-item"><a className="nav-link" href="/cart">Analytics</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userdetails.username}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" onClick={()=>this.props.handleAccount()}>Logout</Link>
                                </div>
                            </li>
                        </>
                    )
                }
                else{
                    return(
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login/Signup
                            </a>
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
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"> 
                    <b>Agri</b>Bazaar
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {navbarHandler(this.props.user)}
                </div>
            </nav>
        );
    }
}
export default Navbar;