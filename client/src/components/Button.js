import React, {Component} from 'react';
import "./Button.css"

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: null,
            Likes: null,
            isClicked: [],
            id: null
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.question.question,
            questionText: this.props.question.question,
            Likes: this.props.question.likes,
            isClicked: this.props.question.isClicked
        })
    }
//this.setState({isClicked: false});
//this.setState({isClicked: true});
    render() {
        console.log(this.props.question.isClicked);
        if (this.props.question.isClicked.indexOf(this.props.username) != -1) {
            console.log("this is run");
            return(
                <div class = "row">

                        <button className="list-group-item list-group-item-action blue" onClick = {() => { this.props.updateList(this.state.id, false) }}>{this.state.questionText}  Likes: {this.state.Likes}</button>
                        
                </div>
            )
        } else {
            return (
                 <div class = "row">
                <button  className="list-group-item list-group-item-action default" onClick ={() => { this.props.updateList(this.state.id, true)}}>{this.state.questionText}  Likes: {this.state.Likes}</button>
               
                </div>
            )
        }
    }
}
//<button className="btn btn-danger">Delete</button>
// <button className="btn btn-danger" onClick={}>Delete</button>
export default Button;