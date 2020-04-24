import React , {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../shared/stylesheets/navbar-style.css"
class Navbar extends Component
{
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     };
    // }
    render()
    {
        return(
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"><a className="navbar-brand" href="/"> <b>Agri</b>Bazaar</a><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form role="form" method="GET" action="/search" id = "search-form">
                        <div className="input-group">
                            <input className="form-control" type="text" name="search" placeholder="Search Here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <div className="input-group-append"><button className="btn btn-warning" type="button" id="button-addon2"><i className="fa fa-search"></i></button></div>
                        </div>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link" href="/profile/undefined"></a></li>
                        <li className="nav-item"><a className="nav-link" href="/cart">Cart</a></li>
                        {/* <li className="nav-item"><a className="nav-link" href="/addItems/undefined">Add Products</a></li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login/Signup
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/sign-in">Login</a>
                                <a className="dropdown-item" href="/sign-up">Sign Up</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;