import React, {Component} from 'react';

class Footer extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {

        const style = {
            "padding-top": "5vh",
            "color": "white",
            "position": "absolute",
            "left": 0,
            "bottom": 0,
            "width": "100%"
        }

        return (
            <div className="Footer text-center" style={style}>
                <p>Developed with <svg class="bi bi-heart-fill" width="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
                </svg> in Toronto.</p>
            </div>
        );
    }
  }
  
  export default Footer;