import React, {Component, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { withRouter, Redirect, Link } from 'react-router-dom';
let socket;


class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: null
        }
    }

    handleChange = (e) => {
        this.setState({
            questionText : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("PROPS ROOM" + this.props.room);
        axios.post('/api/addquestion', {questionText : this.state.questionText, room : this.props.room}).then(res => {
            this.props.history.push('/');
        })
    }

    render() {
        if (this.props.isAuth) {
            return (    
            <div className="container">
                <h2>Ask a Question!</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <textarea type="text" id="question" placeholder="What is on your mind..." className="form-control" name = "question" onChange={this.handleChange} required/>
                    </div>
                </div>               
                <button type="submit" className="btn btn-primary btn-block">Next</button>
                </form> 
            </div>
            );
        } else {
            return(<Redirect to='/login' />);       
        }
    }
}
  
export default withRouter(Question);