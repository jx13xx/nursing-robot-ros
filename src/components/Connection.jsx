import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';

class Connection extends Component {
 state = {
     connect: false,
     ros: null
 }

 constructor(){
     super();
     this.init_connection();
 }

 init_connection(){
     this.state.ros = new window.ROSLIB.Ros();
    
     console.log(this.state.ros);
     this.state.ros.on("connection", () =>{
         console.log("connection established");
         this.setState({ connect: true});
     });

     this.state.ros.on("close", () =>{
        console.log("connection established");
        this.setState({ connect: false});
     });

    var ipAddress = "192.168.1.120";
    console.log("ws://" + ipAddress)
    // this.state.ros.connect("ws://"+ ipAddress +"9090");
     try{
        this.state.ros.connect("ws://192.168.1.120:9090");
     } catch(error) {console.log("failed to connect to ros client")}
 }

 render() {
     return (
         <div>
             <Alert className="text-center m-3" 
             variant={this.state.connect? "success" : "danger"}>{this.state.connect? "ROS Client Established" : "ROS Client not Established"}</Alert>
         </div>
     )
 }


}

export default Connection;