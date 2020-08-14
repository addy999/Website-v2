import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';
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

        return (
            <div id="dialog" class="modal fade" role="dialog" ref={this.ref}>
                <div class="modal-dialog modal-dialog-centered" style={{maxWidth : '50vw'}}>
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
                                 <h4 className="info-head display-4 col">TL;DR</h4>
                                 <ul>{data.tldr.split(",").map(e => <li className="text display-4">{e}</li>)}</ul>
                                 </>:""
                            }   
                            
                            {this.renderSlide("The Challenge", data.p1, data.img1, data.img1Caption)}
                            {this.renderSlide("The Process", data.p2, data.img2, data.img2Caption)}
                            {this.renderSlide("The Solution", data.p3, data.img3, data.img3Caption)}

                        </div>

                        <div className="row" style={{padding: '2vw', margin : "auto"}}>
                            <ButtonGroup variant="contained"aria-label="contained primary button group">
                                {data.info ? 
                                <Button 
                                variant="contained"
                                className="dialog-btns" 
                                onClick={() => window.location.href=data.info}
                                endIcon={<Icon>link</Icon>}>Learn more</Button>: ""}

                                {data.link ? 
                                <Button 
                                variant="contained"
                                className="dialog-btns"  
                                onClick={() => window.location.href=data.link}
                                endIcon={<Icon>link</Icon>}>Visit</Button>: ""}
                            </ButtonGroup>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
  }
  
  export default Dialog;