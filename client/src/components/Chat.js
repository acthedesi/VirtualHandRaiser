import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from './InfoBar/InfoBar'
import Input from './Input/Input'
import Messages from './Messages/Messages'
import { withRouter, Redirect} from 'react-router-dom';

let socket;
const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const data = props;
        socket = io('localhost:5000');
        socket.emit('join', {room: props.room, username: props.username}, () => {

        })
        return () => {
            socket.emit('disconnect', {room: props.room, username: props.username});
            socket.off();
        }
    }, [props.username])

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message ]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', {room: props.room, username: props.username, message: message}, () => setMessage(''));
        }
    }

    console.log(message, messages);
    if (props.isAuth) {
        return (
            <div className="outerContainer">
            <div className="container">
                <InfoBar room = {props.room}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <Messages messages={messages} name={props.username} />
            </div>
            </div>
        )
    } else {
        return(<Redirect to='/login'/>);       
    }
}

export default Chat;