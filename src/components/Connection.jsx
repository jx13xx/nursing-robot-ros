import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import config from "../scripts/config.js"

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
        console.log("connection is closed");
        this.setState({ connect: false});

        // try to reconnect every 3 seconds
        setTimeout( () =>{
            try{
                this.state.ros.connect("ws://"+config.ROSBRIDGE_SERVER_IP+":"+config.ROSBRIDGE_SERVER_PORT + "");
             } catch(error) {
                 console.log("failed to connect to ros client")
                }
        },  3000)
     });

     try{
         console.log("ws://"+config.ROSBRIDGE_SERVER_IP+":"+config.ROSBRIDGE_SERVER_PORT + "");
        this.state.ros.connect("ws://"+config.ROSBRIDGE_SERVER_IP+":"+config.ROSBRIDGE_SERVER_PORT + "");
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