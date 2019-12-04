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
            this.setState ({
                questions: questions
            })
        })
    }

    
    updateList(id, isClicked) {
        let currQ = this.state.questions[0];
        for (let i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].question == id) {
                currQ = this.state.questions[i];
            }
        }
        console.log("currQ: " +  currQ.question);
        if (isClicked) {
            axios.post('/api/update', {question: currQ.question, likes : currQ.likes + 1, clicked: isClicked, username: this.props.username}).then(res => {
                window.location.reload();
            })      
        } else {
            axios.post('/api/update', {question: currQ.question, likes : currQ.likes - 1, clicked: isClicked, username: this.props.username}).then(res => {
                window.location.reload();
            })   
        }
    }

    updateList2(currQ) {
        axios.post('/api/update', {question: currQ.question, likes : currQ.likes + 1}).then(res => {
            window.location.reload();
        })     
    }

    render() {
        if (this.props.isAuth) {
            return (    
            <div className="container">
                <h2>Question List</h2>
                <ScrollToBottom className="list-group">     
                   
                {this.state.questions.map((question, index)=>
                   // <button key={question.question} className="list-group-item list-group-item-action" onClick={() => this.updateList2(question)}><span id="left">{question.question}</span>  <span id="right">Likes: {question.likes}</span></button>
                    <Button {...this.state} question = {question} updateList = {this.updateList.bind(this)}/>
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