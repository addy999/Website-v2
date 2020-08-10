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

  testSend = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.id)}`)
    .then(res => res.json())
    .then(console.log);
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
            onClick={this.testSend}>thumb_up</span>
            <span style={{"font-size" : "2em"}} className="col display-4">5</span>
            <span style={thumb_style} ref={this.thumbsDown} className="material-icons col"
            onMouseEnter={()=>this.thumbsDown.current.style.color="#96FFF2"}
            onMouseLeave={()=>this.thumbsDown.current.style.color="white"}>thumb_down</span>
        </div>
    )
  }
}

export default Vote;