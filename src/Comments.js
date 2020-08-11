import React from 'react';
import Comment from './Comment';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
require('bootstrap');

class Comments extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id,
          submitMouse : false,
          comments : null
      }
      this.ref = React.createRef();
      this.submit_btn = React.createRef();
      this.input_ref = React.createRef();
    }

    close = () => {
        // this.ref.current.style.display="none";
        this.props.closeLink();
        $(findDOMNode(this.ref.current)).modal("hide");
        $('html')[0].style.overflow="";
    }

    sortComments = (cmnts) => {
        var ordered = {};
        Object.keys(cmnts).sort().forEach(function(key) {
            ordered[key] = cmnts[key];
        });
        return ordered;
    }

    loadComments = () => {

        //Fetch here
        var demo = {
            1597095666 : "Yo this rocks!",
            1597095665 : "Ayy",
            1597095650 : "Bruh",
            1597095649 : "Bruh",
            1597095648 : "Bruh",
            1597095647 : "Bruh",
            1597095646 : "Bruh",
            1597095645 : "Bruh",
            1597095644 : "Bruh",
            1597095643 : "Bruh",
        };

        var sorted = this.sortComments(demo);

        this.setState({
            comments : sorted
        })

        console.log("Loaded.")
    }

    componentDidMount() {   
        // $('#modal').modal("show");
        $(findDOMNode(this.ref.current)).modal("show");
        this.loadComments();
        $('html')[0].style.overflow="hidden";
        
    }

    recordComment = (comment) => {
        // Post request
        console.log("Recorded.")
    }

    submit = (comment) => {

        this.recordComment(comment);

        // Clear 
        this.input_ref.current.value = ''

        // Reload
        this.loadComments();
    }
    
    render() {

        const cmnts = this.state.comments;

        const style = {
            "boxShadow" : "4px 4px 12px 0px rgba(0, 0, 0, 0.75)",
            "display" : "block",
            color : "black",
            borderRadius: '10px',
        }

        const title_style = {
            "font-size" : "2em",
            "padding" : "2vw 2vw 0 2vw",          
        }

        const feed_style = {
            'margin': 0,
            "padding" : "2vw",
            "overflow": "auto",
            maxHeight : "50vh"
        }
        const input_style = {
            margin : 0,
            padding: '20px',
            width: '100%',
        }

        return (
            // <div style={style} ref={this.ref}>
            <div class="modal fade" role="dialog" ref={this.ref} style={style}>
            <div class="modal-dialog">
            <div class="modal-content">
            {/* <div class="modal-body"> */}

                <div style={title_style}>
                    <p className="display-4" style={{"font-size":"inherit", alignContent:"center"}}>Leave feedback 
                    <span 
                    style={{float:"right", transform: 'translateY(35%)', cursor : "pointer"}} 
                    className="material-icons"
                    onClick={this.close}
                    >close</span>
                    </p>                    
                    <hr></hr>
                </div>

                <div style={feed_style}>
                    {cmnts ? Object.entries(cmnts).map((t) =>  <Comment time={t[0]} comment={t[1]} />) : ""}
                </div>
                <div class="modal-footer">
                <div className="row form-group" style={input_style}>
                    <input 
                    className="col form-control" 
                    type="text"
                    placeholder="Leave feedback for this project"
                    style={{margin: 'auto', marginRight : "20px", height : "45px" }}
                    ref = {this.input_ref}
                    ></input>
                    <button 
                    className="col btn btn-info"  
                    ref={this.submit_btn}
                    onMouseEnter={()=>this.setState({submitMouse : true})}
                    onMouseLeave={()=>this.setState({submitMouse : false})}
                    style={{maxWidth : "fit-content", padding:"10px", margin: 'auto', height : "45px", backgroundColor : this.state.submitMouse ? "#96FFF2" : "#5d9e96"}}
                    onClick={this.submit}
                    >Submit</button>

                </div>
                </div>

            </div></div></div>
        );
    }
  }
  
  export default Comments;