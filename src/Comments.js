import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id,
          submitMouse : false
      }
      this.ref = React.createRef();
      this.submit_btn = React.createRef();
    }

    close = () => {
        this.ref.current.style.display="none";
    }

    sortComments = (cmnts) => {
        var ordered = {};
        Object.keys(cmnts).sort().forEach(function(key) {
            ordered[key] = cmnts[key];
        });
        return ordered;
    }

    loadComments= () => {
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
        // console.log(JSON.stringify(sorted));
        return sorted;
    }
    
    render() {

        var cmnts = this.loadComments();

        const style = {
            "position" : "relative",
            "left" : "50%",
            "top" : "50%",
            "transform" : "translate(-50%,50%)",
            "width" : "75vh",
            "height" : "50vh",
            "boxShadow" : "4px 4px 12px 0px rgba(0, 0, 0, 0.75)",
            // "border" : "#96FFF2",
            // "borderStyle" : "solid",
            "display" : this.props.display ? "table" : "none",
        }

        const title_style = {
            "font-size" : "2em",
            "padding" : "2vw 2vw 0 2vw",    
            "display" : "table-cell"             
        }

        const feed_style = {
            // "backgroundColor" : "grey",
            "width": '100%',
            'position': 'absolute',
            'left': 0,
            'top': '25%',
            'bottom': "10vh",
            'margin': 0,
            "padding" : "2vw",
            "overflow": "auto"
        }
        const input_style = {
            position : "absolute",
            left : "2vw",
            bottom : "2vh",
            margin : 0,
            right:"2vw"
        }

        return (
            <div style={style} ref={this.ref}>
                <div style={title_style}>
                    <p className="display-4" style={{"font-size":"inherit", alignContent:"center"}}>Leave feedback 
                    <span 
                    style={{float:"right", transform: 'translateY(35%)', pointer : "pointer!important"}} 
                    className="material-icons"
                    onClick={this.close}
                    >close</span>
                    </p>                    
                    <hr></hr>
                </div>
                <div style={feed_style}>
                    {Object.entries(cmnts).map((t) =>  <Comment time={t[0]} comment={t[1]} />)}
                </div>
                <div className="row form-group" style={input_style}>
                    <input 
                    className="col form-control" 
                    type="text"
                    placeholder="Leave feedback for this project"
                    style={{margin: 'auto', marginRight : "20px", height : "45px" }}></input>
                    <button className="col btn btn-info"  ref={this.submit_btn}
                    onMouseEnter={()=>this.setState({submitMouse : true})}
                    onMouseLeave={()=>this.setState({submitMouse : false})}
                    style={{maxWidth : "fit-content", padding:"10px", margin: 'auto', height : "45px", backgroundColor : this.state.submitMouse ? "#96FFF2" : "#5d9e96"}}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
  }
  
  export default Comments;