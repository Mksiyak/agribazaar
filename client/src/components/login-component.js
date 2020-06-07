import React, { Component } from "react";
import axios from "axios"; 
import  "../shared/stylesheets/login-style.css";
import { serverUrl } from "../shared/baseUrl";
import { withRouter } from "react-router-dom";
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
     //   console.log(key,event.target.value)
        this.setState({
          [key]: event.target.value,
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const { user_email,user_password } = this.state;
        axios.post(serverUrl+"auth/login", {
            user_email,
            user_password
        }).then(res => {

            this.props.handleAccount(res.data[0]["id"],res.data[0]["email"],res.data[0]["username"],res.data[0]["role"],document.getElementById("customCheck1").checked);  
        })        
        .then(()=>{
            this.props.history.push('/')
        })
        .catch(err=>{
            console.log("Error ",err)
        });
        

    }
    render() {
        const { user_email,user_password } = this.state;
        return (
        <div className="wrapper">
        <div className="inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input required onChange={(ev) => this.handleChangeField('user_email', ev)} value={user_email} type="text" className="form-control" placeholder="email / username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input required onChange={(ev) => this.handleChangeField('user_password', ev)} type="password" value={user_password} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
      </div>
        );
    }
}
export default withRouter(Login);