import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './login-view.scss';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  }; /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */


  return (
    <Row className="login-form justify-content-md-center">
      <Col md={6}>
        <Form className="justify-content-md-center">
          <h1 className="text-primary">Welcome to MyFlix!</h1>
          <p className="text-secondary">Please Login to continue</p>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            <p className="text-secondary">Note: Do not share your password with anyone.</p>
          </Form.Group>
          <Button variant="primary" type="submit" block onClick={handleSubmit}>Submit</Button>
          <p>Don't have an account?<Button variant="link">Sign up</Button></p>
        </Form >
      </Col >
    </Row >
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
}