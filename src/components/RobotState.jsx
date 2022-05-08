import React, { Component } from "react";
import Connection from "./Connection";
import config from "../scripts/config.js";
import { Row, Col, Container, Button } from "react-bootstrap";
import * as Three from "three";
class RobotState extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    orientation: 0,
    linear_velocity: 0,
    angular_velocity: 0,
  };

  constructor() {
    super();
    this.init_connection();
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();

    console.log(this.state.ros);
    this.state.ros.on("connection", () => {
      console.log("connection established in the teleoperation");
      console.log(this.state.ros);
      this.setState({ connect: true });
    });

    this.state.ros.on("close", () => {
      console.log("connection is closed");
      this.setState({ connect: false });

      // try to reconnect every 3 seconds
      setTimeout(() => {
        try {
          this.state.ros.connect(
            "ws://" +
              config.ROSBRIDGE_SERVER_IP +
              ":" +
              config.ROSBRIDGE_SERVER_PORT +
              ""
          );
        } catch (error) {
          console.log("failed to connect to ros client");
        }
      }, config.RECONNECTION_TIMER);
    });

    try {
      console.log(
        "ws://" +
          config.ROSBRIDGE_SERVER_IP +
          ":" +
          config.ROSBRIDGE_SERVER_PORT +
          ""
      );
      this.state.ros.connect(
        "ws://" +
          config.ROSBRIDGE_SERVER_IP +
          ":" +
          config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log("failed to connect to ros client");
    }
  }
  componentDidMount() {
    this.getRobotState();
  }

  getRobotState() {
    // creating a new pose subscriber
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/amcl_pose",
      messageType: "geometry_msgs/PoseWithCovarianceStamped",
    });

    // create a callback method for pose_subscriber
    pose_subscriber.subscribe((message) => {
      this.setState({ x: message.pose.pose.position.x.toFixed(2) });
      this.setState({ y: message.pose.pose.position.y.toFixed(2) });
      this.setState({
        orientation: this.getOrientationFromQuaternion(
          message.pose.pose.orientation
        ).toFixed(4),
      });
    });
  }

  getOrientationFromQuaternion(ros_orientation_quaternion) {
    var q = new Three.Quaternion(
      ros_orientation_quaternion.x,
      ros_orientation_quaternion.y,
      ros_orientation_quaternion.z,
      ros_orientation_quaternion.w
    );
    // conver this value to 2dimensional space

    var RPY = new Three.Euler().setFromQuaternion(q);

    return RPY["_z"] * (180 / Math.PI).toFixed(3);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <h4 className="mt-4">Position: </h4>
            <p className="mt-0">x:{this.state.x} </p>
            <p className="mt-0">y: {this.state.y}</p>
            <p className="mt-0">Orientation: {this.state.orientation} </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="mt-4">Velocities: </h4>
            <p className="mt-0">
              Linear Velocity: {this.state.linear_velocity}
            </p>
            <p className="mt-0">
              Angular Velocity: {this.state.angular_velocity}{" "}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RobotState;
