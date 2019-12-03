import React, {Component} from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './components/Login';
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Questions from './components/Questions';
import QForm from './components/QForm';

class Logout extends Component{
    state = {
      redirect: false
    }
    
    componentDidMount() {
      axios.get('/logout') 
      .then (res => {
          if (res.data.success) {
              this.setState({redirect: true});
              this.props.changeState(false);
          } else {
              this.setState({redirect: false });
          }
      })     
    }
    
    render() {
        return (<Redirect to="/login"/>);
    }     
}


const Loading = () => {
        return(
             <div>
                Loading
            </div>
        )
  }

class App extends Component {
    constructor(props) {
  
      super(props)
      this.state = {
        isAuthenticated: false,
        isAuthenticating: false,
        username: null,
        room: null
      }
    }
  
    changeState = (val, room, name) => {
      this.setState({ isAuthenticated : val, room: room, username: name});
    }
  


    componentWillMount() {
      this.setState({ isAuthenticating: true});
      axios.get('/checkLoggedIn') 
      .then (res => {
          if (res.data.user) {
              this.setState({ isAuthenticated: true});
              this.setState({username: res.data.user});
              console.log("RESDAta: " + res.data);
              this.setState({room: res.data.room});
          } else {
              this.setState({ isAuthenticated: false });
          }
          this.setState({ isAuthenticating: false });
      })
  } 
  
    render() {
        
      if (this.state.isAuthenticating) {
        return <Loading />
      } else {
        return (  
            <div className="App">
            <Router>
                <NavBar isAuth = {this.state.isAuthenticated}/>
                <Route exact path='/' render={(props) => <Questions {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
                <Route path='/login' render={(props) => <Login {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
                <Route path='/chat' render={(props) => <Chat {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
                <Route path='/register' render={(props) => <Register {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
                <Route path='/askquestion' render={(props) => <QForm {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
                <Route path='/logout' render={(props) => <Logout {...props} {...this.state} isAuth={this.state.isAuthenticated} isLoading= {this.state.isAuthenticating} changeState={this.changeState} />}/>
            </Router>
            </div>  
        );   
      }
    }  
  }
export default App;