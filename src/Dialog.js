import React from 'react';
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

    renderSlide = (header, text, img, imgCaption) => {
        return (
            <div className="row slide">   
            {text ?
                <div className="col">
                <h4 className="info-head display-4">{header}</h4>                       
                <p className="text">{text}</p>
                </div>: ""}
            {img ? 
            <div class="col">
                <img src={img} className="dialog-img"></img>
                {imgCaption ? <p className="text-center" style={{padding: '10px'}}>{imgCaption}</p> : ""}
            </div> : ""}
            </div>
        );
    }

    render() {

        const data = this.props.data;
        const buttonIcon = <span className="material-icons leave-btn">south_east</span>

        return (
            <div id="dialog" class="modal fade" role="dialog" ref={this.ref}>
                <div class="modal-dialog modal-dialog-centered" style={{maxWidth : '50vw'}}>
                    <div id="dialog-content" class="modal-content">

                        <div id="dialog-title">
                            <p className="display-4" style={{"font-size":"2em", alignContent:"center", color:"#96FFF2"}}>{data.role}
                                <span style={{float:"right", transform: 'translateY(35%)', cursor : "pointer", color : this.state.closeMouse ? "#96FFF2" : "white"}} 
                                className="material-icons"
                                onClick={this.close}
                                onMouseEnter={()=>this.setState({closeMouse : true})}
                                onMouseLeave={()=>this.setState({closeMouse : false})}
                                >close</span>
                            </p>                
                            <p style={{
                                "font-size":"1em", 
                                alignContent:"center",
                                color :"grey"}}>{data.company}
                                <span style={{float:"right"}}>
                                    {this.props.dateStr}
                                </span>
                            </p>    
                            <hr style={{backgroundColor : '#96FFF2'}}></hr>
                        </div>

                        <div id="feed">

                            {data.tldr ? 
                                 <>
                                 <h4 className="info-head display-4 col">TL;DR</h4>
                                 <ul>{data.tldr.split(",").map(e => <li className="text display-4">{e}</li>)}</ul>
                                 </>:""
                            }   
                            
                            {this.renderSlide("The Challenge", data.p1, data.img1, "Rad ayy bitch")}
                            {this.renderSlide("The Process", data.p2, data.img2)}
                            {this.renderSlide("The Solution", data.p3, data.img3)}

                        </div>

                        <div className="row" style={{padding: '2vw', margin : "auto"}}>
                            {data.info ? 
                            <button 
                            className="col btn btn-light dialog-btns"  
                            ref={this.learn_btn}
                            onClick={() => window.location.href=data.info}>
                                Learn more {buttonIcon}
                            </button> : ""}

                            {data.link ? 
                            <button 
                            className="col btn btn-light dialog-btns"   
                            ref={this.visit_btn}
                            onClick={() => window.location.href=data.link}>
                                Visit {buttonIcon}
                            </button> : ""}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
  }
  
  export default Dialog;