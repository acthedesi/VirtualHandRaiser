import React, {Component} from 'react'
import axios from 'axios';
import { withRouter, Redirect} from 'react-router-dom';

class Register extends Component {
    state = {
        firstName : null,
        lastName : null,
        username: null,
        password: null,
        email: null,
        classID : null, 
        loading: false,
        redirect: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    componentDidMount() {
        axios.get('/checkLoggedIn') 
        .then (res => {
            if (res.data) {
                this.setState({ loading: false, redirect: true});
            } else {
                this.setState({ loading: false, redirect: false });
            }
        })
    }

    //axios and redirect
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('/api/adduser', {formData : this.state})
        .then (res => {
            if (res.data.err) {
                alert ('ERROR: ' + res.data.err);
            } else if (!res.data.success) { 
                this.props.changeState(false, null, null);
                alert ('that username has already been taken, please choose another username');
            } else {
                this.props.changeState(true, this.state.room, this.state.username);
                this.props.history.push('/');
            }
        })
    }

    
    render() {  
        if (this.props.isAuth) {
            return <Redirect to='/' />
        } 
        return(   
            <div className="container">
                <h2>Sign Up</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-3 control-label">First Name</label>
                        <div className="col-sm-9">
                            <input type="firstName" id="firstName" placeholder="Bob" className="form-control" name = "firstName" onChange={this.handleChange} required/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-3 control-label">Last Name</label>
                    <div className="col-sm-9">
                        <input type="lastName" id="lastName" placeholder="Builder" className="form-control" name = "lastName" onChange={this.handleChange} required/>
                    </div>
                </div>
                <div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 control-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password" id="password" placeholder="password" className="form-control" name = "password" onChange={this.handleChange} required/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" id="username" placeholder="username" className="form-control" name= "username" onChange={this.handleChange} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input type="text" id="email" placeholder="asd@seas.edu" className="form-control" name = "email" onChange={this.handleChange} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="room" className="col-sm-3 control-label">Room</label>
                    <div className="col-sm-9">
                        <input type="number" id="room" className="form-control" name = "room" onChange={this.handleChange} required/>
                    </div>
                </div>                   
                <button type="submit" className="btn btn-primary btn-block">Next</button>
                </form> 
            </div>
            )  
    }
}

export default withRouter(Register);