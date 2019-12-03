import React, {Component, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { withRouter, Redirect, Link } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { randomBytes } from 'crypto';
import Button from './Button';


class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            questions: [],
        }
        this.updateList.bind(this);
    }

    componentDidMount () {
        axios.post('/api/getquestions', {room : this.props.room}).then(res => {
            let questions = res.data.sort(function(a, b) {return b.likes - a.likes});
            questions.forEach(function(question) {
            
            })
            this.setState ({
                questions: res.data.sort(function(a, b) {return b.likes - a.likes})
            })
            console.log("YESSSSs", this.state.questions);
        })
    }

    updateList(id, isClicked) {
        if (isClicked) {
            let currQ = this.state.questions[0];
            for (let i = 0; i < this.state.questions; i++) {
                if (this.state.questions[i].question == id) {
                    currQ = this.state.questions[i];
                }
            }
            axios.post('/api/update', {question: currQ.question, likes : currQ.likes + 1}).then(res => {
                window.location.reload();
            })      
        } else {z
            axios.post('/api/update', {question: this.state.questions[id].question, likes : this.state.questions[id].likes - 1}).then(res => {
                window.location.reload();
            })   
        }
    }

    render() {
        if (this.props.isAuth) {
            return (    
            <div className="container">
                <h2>Question List</h2>
                <ScrollToBottom className="list-group">     
                   
                {this.state.questions.map((question, irndex)=>
                    //<button key={question.question} className="list-group-item list-group-item-action" onClick={() => this.updateList(question)}><span id="left">{question.question}</span>  <span id="right">Likes: {question.likes}</span></button>
                    <Button {...this.state} id = {index} question = {question} updateList = {this.updateList.bind(this)}/>
                )}
                </ScrollToBottom>
            </div>
            );
        } else {
            return(<Redirect to='/login' />);       
        }
    }
}
  
export default withRouter(Questions);