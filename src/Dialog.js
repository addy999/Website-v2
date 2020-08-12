import React from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
require('bootstrap');

class Dialog  extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id,
          closeMouse : false,
          data : props.data,
      }
      this.ref = React.createRef();
      this.learn_btn = React.createRef();
      this.visit_btn = React.createRef();
    }

    close = () => {
        this.props.closeLink();
        $(findDOMNode(this.ref.current)).modal("hide");
        $('html')[0].style.overflow="";
    }

    objEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    componentDidMount() {   
        $(findDOMNode(this.ref.current)).modal("show");
        $('html')[0].style.overflow="hidden";
        
    }

    render() {

        const data = this.props.data;

        const style = {
            "boxShadow" : "4px 4px 12px 0px rgba(0, 0, 0, 0.75)",
            "display" : "block",
            color : "black",
            borderRadius: '10px',            
        }
        const title_style = {
            // "font-size" : "2em",
            "padding" : "2vw 2vw 0 2vw",          
        }
        const feed_style = {
            'margin': 0,
            "padding" : "2vw",
            "overflow": "auto",
            maxHeight : "50vh",
            // paddingBottom : 0,
        }

        return (
            <div class="modal fade" role="dialog" ref={this.ref} style={style}>
            <div class="modal-dialog modal-dialog-centered" style={{
                maxWidth : '50vw',
                // minHeight : '20vh',
            }}>
            <div class="modal-content" style={{
                background: 'rgba(0,0,0,1)',
                color: 'white'
            }}>

                <div style={title_style}>
                    <p className="display-4" style={{"font-size":"2em", alignContent:"center"}}>{data.role}
                    <span 
                    style={{float:"right", transform: 'translateY(35%)', cursor : "pointer", color : this.state.closeMouse ? "#96FFF2" : "white"}} 
                    className="material-icons"
                    onClick={this.close}
                    onMouseEnter={()=>this.setState({closeMouse : true})}
                    onMouseLeave={()=>this.setState({closeMouse : false})}
                    >close</span>
                    </p>                
                    <p style={{
                        "font-size":"1em", 
                        alignContent:"center",
                        color :"grey"}}>{data.company}</p>    
                    <hr style={{backgroundColor : '#96FFF2'}}></hr>
                </div>

                <div style={feed_style} id="feed">

                </div>

                <div className="row" style={{
                    padding: '2vw',
                    margin : "auto"
                }}>
                    {data.info ? <button 
                    className="col btn btn-info"  
                    ref={this.learn_btn}
                    onMouseEnter={()=>this.setState({learnMouse : true})}
                    onMouseLeave={()=>this.setState({learnMouse : false})}
                    style={{maxWidth : "fit-content", padding:"10px 15px", margin: '0 2vw', fontSize:'1em', backgroundColor : this.state.learnMouse ? "rgb(58 94 89)" : "#5d9e96"}}
                    onClick={() => window.location.href=data.info}>Learn more</button> : ""}

                    {data.link ? <button 
                    className="col btn btn-light"  
                    ref={this.visit_btn}
                    onMouseEnter={()=>this.setState({submitMouse : true})}
                    onMouseLeave={()=>this.setState({submitMouse : false})}
                    style={{maxWidth : "fit-content", padding:"10px 15px", margin: '0 2vw', fontSize:'1em', 
                    // backgroundColor : this.state.submitMouse ? "rgb(58 94 89)" : "#5d9e96"
                }}
                    onClick={() => window.location.href=data.link}>Visit</button> : ""}
                </div>

            </div></div></div>
        );
    }
  }
  
  export default Dialog;