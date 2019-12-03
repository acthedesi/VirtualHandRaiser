import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import "./NavBar.css"
import {withRouter } from 'react-router-dom';

 class NavBar extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }


    render() {
            if (!this.props.isAuth) {
                return (
                <nav className ="navbar navbar-expand-md navbar-dark bg-primary">
                    <div className="mx-auto order-0">
                        <span className="navbar-brand mx-auto p-1">VirtualHandRaiser</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">               
                            <li className="nav-item">
                                <NavLink to= "/login" className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/register" className="nav-link">Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className ="navbar navbar-expand-md navbar-dark bg-primary">
                    <div className="mx-auto order-0">
                        <span className="navbar-brand mx-auto p-1">VirtualHandRaiser</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">                     
                            <li className="nav-item">
                                <NavLink to= "/" className="nav-link">Questions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/askquestion" className="nav-link">Ask a Question!</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/chat" className="nav-link">Chat</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/logout" className="nav-link">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                );      
            }
        }
 }

export default withRouter(NavBar);