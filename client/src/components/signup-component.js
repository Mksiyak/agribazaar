import React, { Component } from "react";
import  "../shared/stylesheets/signup-style.css";
import Axios from "axios";
import { serverUrl } from "../shared/baseUrl";
import { withRouter, Link } from "react-router-dom";

class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user_mail : '',
            user_pass : '',
            user_username : '',
            user_first_name: '',
            user_last_name: '',
            user_role : 'farmer',
            user_pin_code : '',
            user_house_no : '',
            user_street : '',
            user_city : '',
            user_state : '',
            user_country : '',
        }
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeField(key, event) {
        this.setState({
          [key]: event.target.value,
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const { user_mail,user_pass,user_username,user_first_name,user_last_name,user_role,user_pin_code,user_house_no,user_street,user_city,user_state,user_country} = this.state;
        console.log(user_mail,user_pass,user_username,user_first_name,user_last_name,user_role,user_pin_code,user_house_no,user_street,user_city,user_state,user_country);
        Axios.post(serverUrl+"auth/signup", {
            user_mail,
            user_pass,
            user_username,
            user_first_name,
            user_last_name,
            user_role,
            user_pin_code,
            user_house_no,
            user_street,
            user_city,
            user_state,
            user_country
        }).then(res => {
            this.props.handleAccount(res.data[0]["id"],res.data[0]["email"],res.data[0]["username"],res.data[0]["role"],false);  
        })        
        .then(()=>{
            this.props.history.push('/');
            console.log("user created successfully");
        })
        .catch(err=>{
            console.log("Error ",err)
        });
        

    }
    render() {
        const { user_mail,user_pass,user_username,user_first_name,user_last_name,user_role,user_pin_code,user_house_no,user_street,user_city,user_state,user_country} = this.state;
        return (
        <div className="wrapper">
        <div className="inner">
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input required onChange={(ev) => this.handleChangeField('user_username', ev)} value={user_username} type="text" className="form-control" placeholder="username" />
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input required onChange={(ev) => this.handleChangeField('user_first_name', ev)} value={user_first_name} type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input required onChange={(ev) => this.handleChangeField('user_last_name', ev)} value={user_last_name} type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input required onChange={(ev) => this.handleChangeField('user_mail', ev)} value={user_mail} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input required onChange={(ev) => this.handleChangeField('user_pass', ev)} value={user_pass} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select className = "form-control" onChange={(ev) => this.handleChangeField('user_role', ev)} value={user_role} >
                        <option value = "farmer">Farmer</option>
                        <option value = "shopper">shopper</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Pin code</label>
                    <input required onChange={(ev) => this.handleChangeField('user_pin_code', ev)} value={user_pin_code} type="text" className="form-control" placeholder="123456" />
                </div>

                <div className="form-group">
                    <label>Flat, House no., Building, Company, Apartment</label>
                    <input required onChange={(ev) => this.handleChangeField('user_house_no', ev)} value={user_house_no}  type="text" className="form-control" placeholder="" />
                </div>
                
                <div className="form-group">
                    <label>Area, Colony, Street, Sector, Village</label>
                    <input required onChange={(ev) => this.handleChangeField('user_street', ev)} value={user_street} type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Town, City</label>
                    <input required onChange={(ev) => this.handleChangeField('user_city', ev)} value={user_city} type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input required onChange={(ev) => this.handleChangeField('user_state', ev)} value={user_state} type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Country</label>
                    <input required onChange={(ev) => this.handleChangeField('user_country', ev)} value={user_country} type="text" className="form-control" placeholder="" />
                </div>

                <button type="submit" onClick = {this.handleSubmit} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/sign-in">sign in?</Link>
                </p>
            </form>
            </div>
        </div>
        );
    }
}
export default withRouter(SignUp);