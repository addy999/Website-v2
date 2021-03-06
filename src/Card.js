import React from 'react';
import { Button, Badge, Icon } from '@material-ui/core';
import './css/card.css';
import placeholder from './assests/placeholder.png';
import moment from 'moment/moment';
import Vote from './vote';
import Comments from './Comments';
import Dialog from './Dialog';
import utils from './utils';

class Card extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showComments : false,
        showDialog : false,
        id : this.props.data.id,
      }
      this.card_id = React.createRef();
      this.comments_ref = React.createRef();
    }

    closeComments = () => {
      this.setState({
        showComments : false
      })
    }

    closeDialog = () => {
      this.setState({
        showDialog : false
      })
    }

    getCommentButton = (mobile = false) => {
      return (
          // <Badge  
          // className="footer-link"
          // anchorOrigin={{
          //   vertical: 'top',
          //   horizontal: mobile ? 'left' : "right",
          // }}
          // badgeContent={this.state.comments ? Object.keys(this.state.comments).length : 0}
          // // showZero
          // color="primary"
          // onClick={() => {this.setState({showComments : true})}} 
          // style={{
          //   "cursor" : "pointer",
          //   transform: mobile ? "" : "translateY(50%)"}}>
          //   <Icon>mode_comment</Icon>
          // </Badge >
      <span className="footer-link material-icons" 
      onClick={() => {this.setState({showComments : true})}} 
      style={{"color":"white", "cursor" : "pointer"}}>mode_comment</span>
      )
    }

    render() {

      const {data} = this.props;
      const dialog_link = data.link;
      const mobile_2 = window.innerWidth < 641;
      let desc = data.description; 
      
      // Parse date string
      if (!data.end){
        var date = moment(data.start).format("MMM YYYY") + "- Present";
      }
      else {
        var date = moment(data.start).format("MMM YYYY") + "-" + moment(data.end).format("MMM YYYY");
      }

      return (
        <>
        <div 
          className="card" 
          onMouseEnter={()=>this.card_id.current.style.opacity=0.8}
          onMouseLeave={()=>this.card_id.current.style.opacity=0}>

          {/* Overlay only for desktop */}
          <div className="overlay" ref={this.card_id} style={{"display" : window.innerWidth > 481 ? "block" : "none"}}>
            {/* <p className="tag">{data.tag}</p> */}
            <Vote id={data.id} />
          </div>

          {/* Image is just image, no clicking. Unless on mobile, then click like body. */}
          <img className="card-img-top" 
          src={data.img ? data.img : placeholder} 
          alt="Card image"
          onClick={() => window.location.href = dialog_link && window.innerWidth<481 ? dialog_link : "javascript:void(0);"}
          style={{cursor :  window.innerWidth<481 ? "pointer" : "default"}}></img>

          {/* Only click on body to open dialog. Cursor : pointer */}
          <div className="card-body" onClick={() => 
            this.setState({showDialog : true})
            // window.location.href = dialog_link ? dialog_link : "javascript:void(0);"
            } >
            <h5 className="card-title">{data.role}</h5>
            <p className="card-text" id="company">{data.company}<span style={{"float":"right"}}>{date}</span></p>
            <p className="card-text">{desc}</p>
          </div>

          {/* 
          No click on footer.
          Footer contains comment button (desktop only) and tech tags.
           */}
          <div className="card-footer">

              {window.innerWidth > 481 ? this.getCommentButton() : ""}

              {
                data.tag.split(",").map( t=> <p className="footer-link tech">#{t.replace(/\s/g, '')}</p>)
              }

            </div>
        
        </div>
        
        {/* Mobile only : render vote under card and add comment beside it  */}
        {window.innerWidth < 481 ? <Vote id={data.id} 
        comment_button={this.getCommentButton(true)}
        /> : ""}

        {/* Render comment dialog on top of everything - only shows up if clicked on comment button*/}
        {this.state.showComments ? <Comments id={this.state.id} closeLink={this.closeComments}/> : "" }

        {/* Render dialog on top of everything - only shows up if clicked on card body*/}
        {this.state.showDialog ? <Dialog dateStr = {date} data={data} closeLink={this.closeDialog} /> : "" }

        </>
      )
    }
}

export default Card;