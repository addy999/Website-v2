import React from 'react';
import { ClickAwayListener , Button, ButtonGroup, Icon } from '@material-ui/core';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import './css/dialog.css';
require('bootstrap');

class Dialog  extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id,
      }
      this.ref = React.createRef();
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

    renderSlide = (header, text, img, imgCaption, tldr, mobile_2) => {

        const embed_style = {
            transform : mobile_2 ? text ? "" : "" : text ? imgCaption ? "" : "translateY(-50%)" : "",
            maxWidth : mobile_2 ? "70vw" : ""
        }
        const vid_style = {...embed_style, ...{
            width: !mobile_2 ? "40vw" : "", 
            height: !mobile_2 ? "50vh" : "",
        }}

        if(text) vid_style.transform = "";

        return (
            <div className="row slide" style={{
                marginLeft: tldr ? "auto" : 0,
                marginRight: tldr ? "auto" : 0,
                display : (text || img) ? "" : "none"
            }}>   
            {text ?
                <div className="col">
                    <h4 className="info-head display-4">{header}</h4>                       
                    <p className="text">{text}</p>
                </div>: ""}
            {img ? 
            <div class="col">
                {img.includes("drive.google.com") ? 
                <iframe src={img} style={vid_style} allowFullScreen></iframe> 
                : <img src={img} className="dialog-img" style={embed_style}></img>}
                {imgCaption ? <p className="text-center" style={{padding: '10px'}}>{imgCaption}</p> : ""}
            </div> : ""}
            </div>
        );
    }

    render() {

        const data = this.props.data;
        const mobile_1 = window.innerWidth < 1025;
        const mobile_2 = window.innerWidth < 641;
        const mobile_3 = window.innerWidth < 481;

        return (
            <div id="dialog" class="modal fade" role="dialog" ref={this.ref}>
                <ClickAwayListener onClickAway={this.close}>
                <div class="modal-dialog modal-dialog-centered" 
                style={{maxWidth : mobile_1 ? mobile_2 ? mobile_3 ? '100vw' : '75vw' : '60vw' : '50vw'}}
                >
                    <div class="modal-content">

                        <div id="dialog-title">
                            <p className="display-4" style={{"font-size":"2em", alignContent:"center", color:"#96FFF2"}}>{data.role}
                                <span style={{float:"right", transform: 'translateY(35%)', cursor : "pointer", color : this.state.closeMouse ? "#96FFF2" : "white"}} 
                                className="material-icons"
                                onClick={this.close}
                                onMouseEnter={()=>this.setState({closeMouse : true})}
                                onMouseLeave={()=>this.setState({closeMouse : false})}
                                >close</span>
                            </p>   
                            <div className="row" style={{color :"grey"}}>         
                                <p className="col" style={{
                                    "font-size":"1em", 
                                    alignContent:"center",
                                    }}>{data.company}
                                </p>
                                <span className="col" style={{maxWidth:"fit-content"}}>
                                    {this.props.dateStr}
                                </span>                                    
                            </div>    

                            <div className="row" id="skills-row">
                                {data.tech.split(",").map( t=> <span class="tech col skill">+ {t} 
                                </span>)}
                            </div>

                            <hr style={{backgroundColor : '#96FFF2'}}></hr>
                        </div>

                        <div id="feed">

                            {data.tldr ? 
                                 <>
                                 {/* <h4 className="info-head display-4 col">TL;DR</h4> */}
                                 <ul>{data.tldr.split(",").map(e => <li className="text display-4">{e}</li>)}</ul>
                                 </>:""
                            }   
                            
                            {this.renderSlide("The Challenge", data.p1, data.img1, data.img1Caption, data.tldr, mobile_2)}
                            {this.renderSlide("The Process", data.p2, data.img2, data.img2Caption, data.tldr, mobile_2)}
                            {this.renderSlide("The Solution", data.p3, data.img3, data.img3Caption, data.tldr, mobile_2)}

                        </div>

                        <div className="row" style={{padding: '2vw', margin : "auto"}}>
                            {/* <ButtonGroup aria-label="primary button group"> */}
                                {data.info ? 
                                <Button 
                                // variant="contained"
                                className="dialog-btns" 
                                onClick={() => window.location.href=data.info}
                                style={{color:"white", marginRight: '5vw'}}
                                endIcon={<Icon>link</Icon>}>Learn more</Button>: ""}

                                {data.link ? 
                                <Button 
                                // variant="contained"
                                className="dialog-btns"  
                                onClick={() => window.location.href=data.link}
                                style={{color:"white"}}
                                endIcon={<Icon>link</Icon>}>Visit</Button>: ""}
                            {/* </ButtonGroup> */}
                        </div>

                    </div>
                </div>
                </ClickAwayListener>
            </div>
        );
    }
  }
  
  export default Dialog;