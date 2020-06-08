import React , {Component} from 'react'
import "../shared/stylesheets/footer-style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../App.css";

class Footer extends Component
{
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     };
    // }
    render()
    {
        return(
            <footer className="container-fliud">
                <div style={{textAlign:'center'}}><i className="fa fa-facebook social"></i><i className="fa fa-twitter social"></i><i className="fa fa-instagram social"></i><i className="fa fa-envelope social"></i></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                            <ul>
                                <li>call - 1234567890</li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                            <ul>
                                
                            </ul>
                        </div>
                        <div className="div col-lg-6 col-md-4 col-sm-12 col-xs-12" id = "special">Project <br/>by Nirmal Khedkar (181IT230),<br/>Mukesh Kumar (181IT228) and<br/>Yash Parakh (181IT253)</div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;