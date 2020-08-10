import React from 'react';

class Footer extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {

        const style = {
            "paddingTop": "7vh",
            "color": "white",
            "position": "absolute",
            "left": 0,
            "bottom": 0,
            "width": "100%",
            "marginBottom": "10px",
        }

        return (
            <div className="Footer text-center" style={style}>
                <p>Developed with <svg className="bi bi-heart-fill" style={{"color":"#ff7089"}} width="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clipRule="evenodd"/></svg> in Toronto. <br></br>(and React + Node.JS)</p>
            </div>
        );
    }
  }
  
  export default Footer;