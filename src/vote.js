import React from 'react';
import { findDOMNode } from 'react-dom';

class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id : this.props.id,
      clicked : false,
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
    }))
    .then(
      this.setState({
        clicked : true
      })
    );       
  }

  downVote = (event) => {
    event.preventDefault();
    fetch(`/api/downVote?id=${encodeURIComponent(this.state.id)}`)
    .then(res => res.json())
    .then(res => this.setState({
      score : res.score
    })).then(
      this.setState({
        clicked : false
      })
    );        
  }

  render() { 

    const mobile = window.innerWidth < 450;

    const thumb_style = {
      "font-size" :  mobile ? "1.75em" : "3em",
      color : this.state.clicked ? "#96FFF2" : "white"
    }

    const comment_button = this.props.comment_button ? this.props.comment_button() : "";
    // Fix for mobile
    if(comment_button) {
      comment_button.props.style.fontSize="1.75em";
      comment_button.props.style.padding="0";
      comment_button.props.style.flex = "0 0 50%";
    }

    return (
        <div className="vote row" style={{
            "position" : "relative",
            "top": "50%",
            "transform" : "translateY(-50%)",
            "alignItems" : "center",
            "z-index" : 5,
            "cursor" : "default",
            "padding" : "0 30%",
            "margin" : mobile ? "5vh 0" : "",
        }}>
            {comment_button}
            <span style={thumb_style} ref={this.thumbsUp} className={mobile ? "material-icons col-3" : "material-icons col"} 
            onMouseEnter={()=> this.thumbsUp.current.style.color="#96FFF2"}
            onMouseLeave={()=> !this.state.clicked ? this.thumbsUp.current.style.color="white" : ""}
            onClick={this.state.clicked ? this.downVote : this.upVote}>thumb_up</span>
            <span style={{"font-size" : "1.75em"}} className={mobile ? "col-3 display-4" : "col display-4"}>{this.state.score}</span>            
        </div>
    )
  }
}

export default Vote;