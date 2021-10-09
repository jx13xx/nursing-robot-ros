import React, { Component } from 'react'
import { Joystick } from 'react-joystick-component';
import config from "../scripts/config.js"
class TeleOperation extends Component{
    state = { 
        ros: null,
        connect: false,
    };


    constructor(){
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this)
    }

    init_connection(){
     this.state.ros = new window.ROSLIB.Ros();
    
     console.log(this.state.ros);
     this.state.ros.on("connection", () =>{
         console.log("connection established in the teleoperation");
         console.log(this.state.ros)
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
        },  config.RECONNECTION_TIMER)
     });

     try{
         console.log("ws://"+config.ROSBRIDGE_SERVER_IP+":"+config.ROSBRIDGE_SERVER_PORT + "");
        this.state.ros.connect("ws://"+config.ROSBRIDGE_SERVER_IP+":"+config.ROSBRIDGE_SERVER_PORT + "");
     } catch(error) {console.log("failed to connect to ros client")}
 }

    handleMove(event) {
       console.log("handle move");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });
        // we need to create a twist message to be published to rosbridge
        var twist = new window.ROSLIB.Message({
    
            linear:{
                x: event.y / 100,
                y:0,
                z:0,
            },
            angular:{   
                x:0,
                y:0,
                z: -event.x / 100,
            }
        });

        // we need to publish the message on the cmd_vel topic
        cmd_vel.publish(twist)
        
    }
    handleStop(event) {
        console.log("handle stop");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });
        // we need to create a twist message to be published to rosbridge
        var twist = new window.ROSLIB.Message({
    
            linear:{
                x:0,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:0,
            }
        });

        // we need to publish the message on the cmd_vel topic
        cmd_vel.publish(twist)
    }
    render(){

        return ( 
        
        <div>
            <Joystick 
            size={100} 
            baseColor="grey" 
            stickColor="black" 
            move={this.handleMove} 
            stop={this.handleStop}>

            </Joystick>
        </div>
        
        )
    }

}

export default TeleOperation;
