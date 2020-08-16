import React from 'react';
import Comment from './Comment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
require('bootstrap');


class Comments extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id,
          submitMouse : false,
          comments : null,
          closeMouse : false,
          scroll_to_bottom : true,
      }
      this.ref = React.createRef();
      this.submit_btn = React.createRef();
      this.input_ref = React.createRef();
      this.lastComment = React.createRef();
    }

    close = () => {
        // this.ref.current.style.display="none";
        this.props.closeLink();
        $(findDOMNode(this.ref.current)).modal("hide");
        $('html')[0].style.overflow="";
    }

    objEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    sortComments = (cmnts) => {
        
        var ordered = {};
        if (this.objEmpty(cmnts)) return null

        Object.keys(cmnts).sort().forEach(function(key) {
            ordered[key] = cmnts[key];
        });
        return ordered;
    }

    loadComments = () => {

        fetch(`/api/getComments?id=${encodeURIComponent(this.state.id)}`)
        .then(res => res.json())
        // .then(console.log)
        .then(res => this.setState({
            comments : this.objEmpty(res) ? null : this.sortComments(res)
        }))
        // .then(
        //     // console.log("done"),
        //     this.scrollToBottom()
        // );

        // console.log("Loaded.")
    }

    componentDidMount() {   
        $(findDOMNode(this.ref.current)).modal("show");
        this.loadComments();        
        $('html')[0].style.overflow="hidden";
        
    }

    recordComment = (comment) => {
        // Post request
        axios.post('/api/submitComment', {
            id : this.state.id,
            comment : comment
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)

            // Reload comments 
            this.setState({
                comments : this.objEmpty(res.data) ? null : this.sortComments(res.data)
            })
        })
        .catch(error => {
            console.error(error)
        })
        
    }

    submit = (event) => {

        event.preventDefault();

        if(this.input_ref.current.value.length==0) return null;

        this.recordComment(this.input_ref.current.value);

        // Clear 
        this.input_ref.current.value = ''

        // Scroll to bottom
        // this.scrollToBottom();
    }
    
    render() {

        const cmnts = this.state.comments;

        const title_style = {
            "font-size" : "2em",
            "padding" : "2vw 2vw 0 2vw",          
        }
        const feed_style = {
            'margin': 0,
            "padding" : "2vw",
            "overflow": "auto",
            maxHeight : "50vh",
            // paddingBottom : 0,
        }
        const input_style = {
            margin : 0,
            padding: '20px',
            width: '100%',
        }

        return (
            <div class="modal fade" role="dialog" ref={this.ref} style={{"display" : "block"}}>
            <div class="modal-dialog modal-dialog-centered" style={{
                maxWidth : '50vw',
                // minHeight : '20vh',
            }}>
            <div class="modal-content">

                <div style={title_style}>
                    <p className="display-4" style={{"font-size":"inherit", alignContent:"center"}}>Leave feedback 
                    <span 
                    style={{float:"right", transform: 'translateY(35%)', cursor : "pointer", color : this.state.closeMouse ? "#96FFF2" : "white"}} 
                    className="material-icons"
                    onClick={this.close}
                    onMouseEnter={()=>this.setState({closeMouse : true})}
                    onMouseLeave={()=>this.setState({closeMouse : false})}
                    >close</span>
                    </p>                    
                    <hr style={{backgroundColor : '#96FFF2'}}></hr>
                </div>

                <div style={feed_style} id="feed">
                    {cmnts ? Object.entries(cmnts).map((t, i) => <Comment 
                    time={t[0]} 
                    comment={t[1]} 
                    last_comment={i == Object.keys(cmnts).length-1 ? true : false}
                    scroll_to = {this.state.scroll_to_bottom}/>) : ""}
                    <p style={{color: 'grey', "display" : cmnts ? this.objEmpty(cmnts) ? "block" : "none" : "block"}}>Be the first comment!</p>

                </div>
                <div class="modal-footer" style={{padding : 0, borderColor : '#96FFF2'}}>
                <div className="row form-group" style={input_style}>

                    <input 
                    className="col form-control" 
                    type="text"
                    placeholder="Leave feedback for this project"
                    style={{margin: 'auto', marginRight : "20px", height : "45px" }}
                    ref = {this.input_ref}
                    onKeyDown={(e) => {if(e.keyCode === 13) this.submit(e)}}
                    ></input>

                    {/* <TextField 
                    id="standard-basic" 
                    className="col" 
                    label="Leave feedback for this project"  
                    style={{margin: 'auto', marginRight : "20px", height : "45px" }}
                    ref = {this.input_ref}
                    onKeyDown={(e) => {if(e.keyCode === 13) this.submit(e)}} /> */}


                    <Button 
                    // variant="contained"
                    className="col"  
                    ref={this.submit_btn}
                    style={{maxWidth : "fit-content", padding:"10px", margin: 'auto', height : "45px", color:"white" }}
                    onClick={this.submit}
                    endIcon={<Icon>send</Icon>}>Submit</Button>

                </div>
                </div>

            </div></div></div>
        );
    }
  }
  
  export default Comments;