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
            Likes: this.props.question.likes
        })
    }

    render() {
        console.log(this.state.questionText);
        if (this.state.isClicked) {
            return(
                <button className="blue" onClick = {() => this.setState({isClicked: false})}>{this.state.questionText}  {this.state.Likes}</button>
            )
        } else {
            return (
                <button onClick ={() => {this.setState({isClicked: true}); this.props.updateList(this.state.id, this.state.isClicked)}}>{this.state.questionText}  {this.state.Likes}</button>
            )
        }
    }
}

export default Button;