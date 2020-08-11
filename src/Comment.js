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
      this.ref = React.createRef();
    }

    componentDidMount = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        if(this.props.last_comment && this.props.scroll_to) {
            if(this.ref.current) this.ref.current.scrollIntoView({ behavior: 'smooth', block: "end"});
            // if(this.ref.current) console.log("scrolling!")
        }
    }


    render() {
        const cmnt_style = {
            "padding" : "20px 10px",
            "margin" : 0,
            border: 'white',
            borderStyle: 'solid',
            borderWidth: this.state.mouseOver ? '0.1px' : '0px'
        }

        // this.scrollToBottom();

        return(
            <p style={cmnt_style} 
            onMouseEnter={()=>this.setState({mouseOver:true})}
            onMouseLeave={()=>this.setState({mouseOver:false})}
            parent_ref={this.props.parent_ref}
            ref={this.ref}
            ><span className="bold blue">{moment.unix(this.state.time).format("MM/DD/YY h:mm A")}:</span>   {this.state.comment}</p>
        );
    }
}

export default Comment;