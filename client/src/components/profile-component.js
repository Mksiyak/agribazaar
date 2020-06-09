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
            hasChanged: false
        }
        this.handleChangeField=this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        Axios.get(serverUrl+`users/${this.props.user.id}`)
        .then(res=>{
            this.setState({
                username: res.data[0]["username"],
                fullname: res.data[0]["fullname"],
                email: res.data[0]["email"],
                role: res.data[0]["role"],
                address: res.data[0]["address"],
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
                        <label for="ag_fullname" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="ag_fullname" value={this.state.fullname} onChange={(ev) => this.handleChangeField('fullname', ev)}/>
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
                    <div className="form-group row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" value={this.state.address} onChange={(ev) => this.handleChangeField('address', ev)}/>
                        </div>
                    </div>
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