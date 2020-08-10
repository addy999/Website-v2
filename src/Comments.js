import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id : props.id
      }
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
        console.log(cmnts);

        const style = {
            "position" : "relative",
            "left" : "50%",
            "top" : "50%",
            "transform" : "translate(-50%,50%)",
            "width" : "75vh",
            "height" : "50vh",
            "boxShadow" : "10px 10px 5px 0px rgba(0,0,0,0.75)",
            "border" : "#96FFF2",
            "borderStyle" : "solid",
            "display" : "table"
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
            'bottom': "15%",
            'margin': 0,
            "padding" : "2vw",
            "overflow": "auto"
        }

        return (
            <div style={style}>
                <div style={title_style}>
                    <p className="display-4" style={{"font-size":"inherit"}}>Leave feedback</p>
                    <hr></hr>
                </div>
                <div style={feed_style}>
                    {Object.entries(cmnts).map((t) =>  <Comment time={t[0]} comment={t[1]} />)}
                </div>
            </div>
        );
    }
  }
  
  export default Comments;