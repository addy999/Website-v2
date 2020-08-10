import React from 'react';
import moment from 'moment';

class Comment extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          time : props.time,
          comment : props.comment,
          mouseOver : false,
      }
    }

    render() {
        const cmnt_style = {
            "padding" : "20px 10px",
            "margin" : 0,
            border: '#00000075',
            borderStyle: 'solid',
            borderWidth: this.state.mouseOver ? '0.1px' : '0px'
        }

        return(
            <p style={cmnt_style} 
            onMouseEnter={()=>this.setState({mouseOver:true})}
            onMouseLeave={()=>this.setState({mouseOver:false})}
            ><span className="bold">{moment.unix(this.state.time).format("MM/DD/YY h:mm A")}:</span>   {this.state.comment}</p>
        );
    }
}

export default Comment;