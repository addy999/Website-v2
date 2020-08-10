import React from 'react';
import { findDOMNode } from 'react-dom';

class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id : this.props.id
    };
    this.thumbsUp = React.createRef();
    this.thumbsDown = React.createRef();
  }

  componentDidMount() {
    this.getVote();
  }

  getVote = () => {
    fetch(`/api/getVote?id=${encodeURIComponent(this.state.id)}`)
    .then(res => res.json())
    .then(res => this.setState({
      score : res.score
    }));
  }

  upVote = (event) => {
    event.preventDefault();
    fetch(`/api/upVote?id=${encodeURIComponent(this.state.id)}`)
    .then(res => res.json())
    .then(res => this.setState({
      score : res.score
    }));       
  }

  downVote = (event) => {
    event.preventDefault();
    fetch(`/api/downVote?id=${encodeURIComponent(this.state.id)}`)
    .then(res => res.json())
    .then(res => this.setState({
      score : res.score
    }));       
  }

  render() { 

    const thumb_style = {
      "font-size" : "3em",
    }

    return (
        <div className="vote row" style={{
            "position" : "relative",
            "top": "50%",
            "transform" : "translateY(-50%)",
            "alignItems" : "center",
            "z-index" : 5,
            "cursor" : "default"
        }}>
            <span style={thumb_style} ref={this.thumbsUp} className="material-icons col" 
            onMouseEnter={()=>this.thumbsUp.current.style.color="#96FFF2"}
            onMouseLeave={()=>this.thumbsUp.current.style.color="white"}
            onClick={this.upVote}>thumb_up</span>
            <span style={{"font-size" : "2em"}} className="col display-4">{this.state.score}</span>
            <span style={thumb_style} ref={this.thumbsDown} className="material-icons col"
            onMouseEnter={()=>this.thumbsDown.current.style.color="#96FFF2"}
            onMouseLeave={()=>this.thumbsDown.current.style.color="white"}onClick={this.downVote}>thumb_down</span>
        </div>
    )
  }
}

export default Vote;