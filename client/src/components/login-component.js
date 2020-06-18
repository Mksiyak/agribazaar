import React, { Component } from "react";
import axios from "axios"; 
import  "../shared/stylesheets/login-style.css";
import { serverUrl } from "../shared/baseUrl";
import { withRouter, Link } from "react-router-dom";
import { createNotification } from "../App";
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          user_email:'',
          user_password:'',
          user_remember: true
        }
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeField(key, event) {
        this.setState({
          [key]: event.target.value,
        });
    }
    getCookie = (name)=>{
        const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(';').shift();
    }
    handleSubmit(event){
        event.preventDefault();
        const { user_email,user_password } = this.state;
        axios.post(serverUrl+"auth/login", {
            user_email,
            user_password
        }).then(res => {

            this.props.handleAccount(res.data[0]["id"],res.data[0]["email"],res.data[0]["username"],res.data[0]["role"],document.getElementById("customCheck1").checked);
            createNotification("success",`Welcome ${res.data[0]["username"]}`);  
        })        
        .then(()=>{
            console.log(this.getCookie('user_role'));
            if(this.getCookie('user_role')==="shopper")
                this.props.history.push('/');
            else{
                this.props.history.push('/analytics');
            }
        })
        .catch(err=>{
            createNotification("error",`Incorrect username or password`);
        });
        

    }
    render() {
        const { user_email,user_password } = this.state;
        return (
        <div className="login-wrapper" style={{}}>
        <div className="inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <input required onChange={(ev) => this.handleChangeField('user_email', ev)} value={user_email} type="text" className="form-control" placeholder="email / username" />
                </div>

                <div className="form-group">
                    <input required onChange={(ev) => this.handleChangeField('user_password', ev)} type="password" value={user_password} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="#">password?</Link>
                </p>
            </form>
            </div>
      </div>
        );
    }
}
export default withRouter(Login);