import React, { Component } from "react";
import {Nav,Navbar, NavDropdown,Container} from "react-bootstrap";

class Header extends Component{
    // state = {}
    render() {
        return (
        <Container>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">RobotControl</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/About">About</Nav.Link>
              <Nav.Link href="/Contact">Contact Us</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Send nudes</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Fuck now</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Send Help</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar></Container>);
    }

}

export default Header;