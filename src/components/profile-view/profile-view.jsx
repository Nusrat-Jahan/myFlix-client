import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import moment from 'moment';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      FavoriteMovies: [],
      UsernameError: "",
      EmailError: "",
      PasswordError: "",
      ConfirmPasswordError: ""
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    // console.log(localStorage.getItem("user"));
    const url = "https://myflix-movie-app.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // console.log(response);
        //assign the result to this state
        let formattedBirthdate = 'N/A';
        if (typeof response.data.Birthdate != "undefined" && response.data.Birthdate != null) {
          formattedBirthdate = moment(response.data.Birthdate).format("YYYY-MM-DD")
          console.log(formattedBirthdate);
        };
        console.log({ formattedBirthdate });
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: formattedBirthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://myflix-movie-app.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        // location.reload();
        alert(movie.Title + " has been removed from your Favorites.");
      });
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(
        `https://myflix-movie-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleUpdate() {
    let token = localStorage.getItem("token");
    console.log({ token });
    let user = localStorage.getItem("user");
    console.log({ user });
    console.log(this.state);
    let setisValid = this.formValidation();
    if (setisValid) {
      axios
        .put(
          `https://myflix-movie-app.herokuapp.com/users/${user}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthdate: this.state.Birthdate,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          // const data = response.data;
          // props.onLoggedIn(data);
          alert(user + " has been updated.");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  }

  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let ConfirmPasswordError = {};
    //const birthdayError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 3) {
      PasswordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    // if (this.state.Password !== this.state.ConfirmPassword) {
    //   ConfirmPasswordError.passwordMismatch = "Your passwords do not match.";
    //   isValid = false;
    // }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      ConfirmPasswordError: ConfirmPasswordError,
    })
    // setUsernameError(UsernameError);
    // setPasswordError(PasswordError);
    // setEmailError(EmailError);
    // setConfirmPasswordError(ConfirmPasswordError);
    return isValid;
  };

  handleChange(e) {
    let { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  render() {
    const { movies } = this.props;
    const { UsernameError, EmailError, PasswordError, ConfirmPasswordError } = this.state;
    // this.getUser(localStorage.getItem("token"));
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);

    // if (!movies) alert("Please sign in");
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Form style={{ width: "24rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username: </Form.Label>
                  <FormControl size="sm" type="text" name="Username" value={this.state.Username} onChange={(e) => this.handleChange(e)}
                    placeholder="Change username" />
                  {Object.keys(UsernameError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {UsernameError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Passowd: </Form.Label>
                  <FormControl size="sm" type="password" name="Password" value={this.state.Password} onChange={(e) => this.handleChange(e)}
                    placeholder="Change Password" />
                  {Object.keys(PasswordError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {PasswordError[key]}
                      </div>
                    );
                  })}

                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email: </Form.Label>
                  <FormControl size="sm" type="email" name="Email" value={this.state.Email} onChange={(e) => this.handleChange(e)}
                    placeholder="Change Email" />
                  {Object.keys(EmailError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {EmailError[key]}
                      </div>
                    );
                  })}

                </Form.Group>
                <Form.Group controlId="formBirthdate">
                  <Form.Label>Date of Birth: </Form.Label>
                  <FormControl size="sm" type="text" name="Birthdate" value={this.state.Birthdate} onChange={(e) => this.handleChange(e)}
                    placeholder="Change Birthdate" />

                </Form.Group>
                <Link to={`/users/${this.state.Username}`}>
                  <Button variant="outline-dark"
                    type="link"
                    size="sm"
                    block
                    onClick={() => this.handleUpdate()}
                  >
                    Save changes
                    </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="outline-dark"
                    type="submit"
                    size="sm"
                    block
                  >
                    Back to Main
                  </Button>
                </Link>
                <Button variant="outline-danger"
                  size="sm"
                  block
                  onClick={() => this.handleDelete()}
                >
                  Delete Account
                </Button>

              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "24rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {FavoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}
ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};





// import React from 'react';
// import { Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';

// export function ProfileView(match) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [bithdate, setBirthdate] = useState('');
//   axios.get('https://myflix-movie-app.herokuapp.com/users', {
//     Username: username,
//     Password: password,
//     Email: email,
//     Birthdate: birthdate 
//   })
//     .then(response => {
//       const data = response.data;
//       console.log(data);
//       window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
//     })
//     .catch(e => {
//       console.log('error showing the user')
//     });
//   // console.log(username, password, email, birthdate);
//   // props.onRegister(username);

//   render() {
//     const { profile, onBackClick } = this.props;

//     return (
//       <div className="profile-view">
//         <Card border="info" bg="dark" text="white" className="profile-card">

//           <Card.Body>
//             <Card.Title><span className='text-primary'>Username: </span> {profile.Username}</Card.Title>
//             <Card.Text><span className='text-primary'>Description: </span>{profile.Password}</Card.Text>
//             <Card.Text><span className='text-primary'>Genre: </span>{profile.Email}</Card.Text>
//             <Card.Text><span className='text-primary'>Director: </span>{profile.Birthdate}</Card.Text>
//             <Button block onClick={() => { onBackClick(); }}>Back</Button>
//           </Card.Body>
//         </Card>

//       </div>
//     );
//   };
// }
