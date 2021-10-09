import React, {Component } from "react";
import {Container} from "react-bootstrap";


var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

class Footer extends Component{

    render(){
        
        return (
            <Container className="text-center" >
                 <div style={phantom} />
                    <div style={style}>
                    <p>UOW&copy; 2021</p>
                    </div>
                
            </Container>
        );
    }

}

export default Footer;