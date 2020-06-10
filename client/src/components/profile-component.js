import React, { Component } from "react";
import Axios from "axios"; 
import { serverUrl } from "../shared/baseUrl";

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            fullname: '',
            email: '',
            role: '',
            address: '',
            password: '',
            hasChanged: false,
            pin_code: '000',
            house_no: '',
            street: '',
            city: '',
            state: '',
            country: ''
        }
        this.handleChangeField=this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        Axios.get(serverUrl+`users/${this.props.user.id}`)
        .then(res=>{
            this.setState({
                username: res.data[0]["username"],
                firstname: res.data[0]["first_name"],
                lastname: res.data[0]["last_name"],
                email: res.data[0]["email"],
                role: res.data[0]["role"],
                pin_code: res.data[0]["pin_code"],
                house_no: res.data[0]["house_no"],
                street: res.data[0]["street"],
                city: res.data[0]["city"],
                state: res.data[0]["state"],
                country: res.data[0]["country"]
            });
        })
        .catch(err=>{
            console.log("Error",err);
        })
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value
        });
        this.setState({hasChanged:true});
        document.getElementById("button-submit").classList.remove('btn-primary');
        document.getElementById("button-submit").classList.add('btn-success');
        document.getElementById("button-submit").innerHTML="Save";
    }
    handleSubmit(event){
        event.preventDefault();
        const {username,fullname,email,role,address,password,hasChanged} = this.state;
        if(hasChanged)
        {
            if(!password)
            {
                alert(username+" "+fullname);
            }
            Axios.post(serverUrl+`users/${this.props.user.id}`,{
                username,
                password,
                email,
                fullname,
                address
            })
            .then(res=>{
                alert("Submitted!");
            })
            .catch(err=>{
                alert("Error",err);
            })
        }
    }
    render(){
        return(
                <div className="container"  style={{marginTop:"2em",marginBottom:"2em"}}>
                    <h2 style={{marginTop:"2em",marginBottom:"1em"}}>My Profile</h2>
                    
                    <form>
                    <div className="form-group row">
                        <label for="ag_username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" readonly className="form-control-plaintext" id="ag_username" value={this.state.username}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="ag_fullname" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="ag_fullname" value={this.state.firstname} onChange={(ev) => this.handleChangeField('fullname', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="ag_email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" className="form-control" id="ag_email" value={this.state.email} onChange={(ev) => this.handleChangeField('email',ev)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="ag_role" className="col-sm-2 col-form-label">Account Role</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" id="ag_role" value={this.state.role.toUpperCase()}/>
                        </div>
                    </div>
                    <hr/>
                    <h6>Address</h6>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Pin Code</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" id="staticEmail" value={this.state.pin_code} onChange={(ev) => this.handleChangeField('pin_code', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">House No.</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.house_no} onChange={(ev) => this.handleChangeField('house_no', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Street</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.street} onChange={(ev) => this.handleChangeField('street', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.city} onChange={(ev) => this.handleChangeField('city', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Pin Code</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.state} onChange={(ev) => this.handleChangeField('state', ev)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Country</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.country} onChange={(ev) => this.handleChangeField('country', ev)}/>
                        </div>
                    </div>
                    <hr/>
                    <h5>Password Settings</h5>
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input required type="password" className="form-control" id="staticEmail" onChange={(ev) => this.handleChangeField('password', ev)}/>
                        </div>
                    </div>
                    <button type="submit" id="button-submit" className="btn btn-primary" style={{marginTop:"1.5em"}} onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>

        )
    }
}