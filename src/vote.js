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
        }}>
            <span style={thumb_style} ref={this.thumbsUp} className="material-icons col" 
            onMouseEnter={()=>this.thumbsUp.current.style.color="#96FFF2"}
            onMouseLeave={()=>this.thumbsUp.current.style.color="white"}>thumb_up</span>
            <span style={{"font-size" : "2em"}} className="col display-4">5</span>
            <span style={thumb_style} ref={this.thumbsDown} className="material-icons col"
            onMouseEnter={()=>this.thumbsDown.current.style.color="#96FFF2"}
            onMouseLeave={()=>this.thumbsDown.current.style.color="white"}>thumb_down</span>
        </div>
    )
  }
}

export default Vote;