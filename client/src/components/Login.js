import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';



const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');
   
    let handleSubmit = (e) => { 
        e.preventDefault();
        axios.post('/api/checkuser', {formData : {username: username, password: password, room:room}})
        .then(res => {
            if (res.err) {
              alert ('ERROR: ' + res.err);
            } else if (res.data.success) {
                console.log("this is room", room);
                props.changeState(true, room, username);
                console.log("isAuth",  props.isAuth);
            } else {
                alert("username or password is incorrect");
                props.changeState(false, null, null);
            }
        });   
    }
    
    if (props.isAuth) {
        console.log("YES");
        return <Redirect to='/' />
    } 
    console.log("this is run");
    return (       
       <div>
          <div className="container">
              <form className="form-horizontal" onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <div className="form-group row">
                      <label htmlFor="username" className="col-sm-3 control-label">Username</label>
                      <div className="col-sm-9">
                          <input type="text" id="username" placeholder="username" className="form-control" name= "username" onChange={(event) => setUsername(event.target.value)}/>
                      </div>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="password" className="col-sm-3 control-label">Password</label>
                      <div className="col-sm-9">
                          <input type="password" id="password" placeholder="password" className="form-control" name = "password" onChange={(event) => setPassword(event.target.value)}/>
                      </div>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="room" className="col-sm-3 control-label">Room</label>
                      <div className="col-sm-9">
                          <input type="room" id="room" placeholder="room" className="form-control" name = "room" onChange={(event) => setRoom(event.target.value)}/>
                      </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form> 
          </div>
        </div>
    )
}

export default Login;