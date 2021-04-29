import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  };

  return (
    <Row className="login-form justify-content-md-center">
      <Col md={6}>
        <Form>
          <h1 className="text-primary">Welcome to MyFlix!</h1>
          <p className="text-secondary">Please Register to continue</p>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            <p className="text-secondary">Note: Do not share your password with anyone.</p>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder='Enter your Email' onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control type="text" placeholder='Enter your Birthday' onChange={e => setBirthdate(e.target.value)} />
          </Form.Group>
          <Button type='submit' onClick={handleSubmit} block>Submit</Button>
        </Form>
      </Col>
    </Row>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};