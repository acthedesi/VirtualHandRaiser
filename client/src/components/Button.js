import React, {Component} from 'react';
import "./Button.css"

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: null,
            Likes: null,
            isClicked: false,
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

    render() {
        if (this.state.isClicked) {
            return(
                <button className="list-group-item list-group-item-action blue" onClick = {() => {this.setState({isClicked: false}); this.props.updateList(this.state.id, false) }}>{this.state.questionText}  {this.state.Likes}</button>
            )
        } else {
            return (
                <button  className="list-group-item list-group-item-action" onClick ={() => {this.setState({isClicked: true}); this.props.updateList(this.state.id, true)}}>{this.state.questionText}  {this.state.Likes}</button>
            )
        }
    }
}

export default Button;