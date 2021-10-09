import React, { Component } from 'react';
import { Container, Form , Button} from 'react-bootstrap';

class ContactUsPage extends Component {

    render() {
        return (
            <Container>
                <div>
                    <br />
                    <h2>Contact Me</h2>
                    <p>
                        If you would like to contact me to freelance your project or ask me inquires. You may please do by filling out the
                        following details
                    </p>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }


}

export default ContactUsPage;