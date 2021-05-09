import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';
import './login-view.scss';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    /* Send a request to the server for authentication */
    if (setisValid) {
      //  console.log(username, password);
      // props.onLoggedIn(username);
      axios.post('https://myflix-movie-app.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user');
          alert("Please enter a valid username or password");
        });
    }; /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }
    if (password.trim().length < 4) {
      passwordError.passwordMissing = "You must enter a password.(minimum 4 characters)";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  return (
    <Row className="login-form justify-content-md-center">
      <Col md={6}>
        <Form className="justify-content-md-center">
          <h1 className="text-primary">Welcome to MyFlix!</h1>
          <p className="text-secondary">Please Login to continue</p>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
            {Object.keys(usernameError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {usernameError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            {Object.keys(passwordError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordError[key]}
                </div>
              );
            })}
            <p className="text-secondary">Note: Do not share your password with anyone.</p>
          </Form.Group>
          <Button variant="primary" type="submit" block onClick={handleSubmit}>Submit</Button>
          {/* <Button block onClick={() => !this.state.username && <RegistrationView />}>Register</Button> */}
          {/* <Router>
            <Link to={`/register`}>
              <Button className="mb-2" block variant="primary">Sign up</Button>
            </Link>
          </Router> */}
          {/* <Card.Body>
            <Link to={`/register`}>
              <Card.Title>{movie.Title}</Card.Title>
            </Link>
          </Card.Body> */}

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
