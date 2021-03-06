import React from 'react';
import PropTypes from 'prop-types';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import moment from 'moment';
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setProfile } from '../../actions/actions';

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
      BirthdateError: "",
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
          // console.log(formattedBirthdate);
        };
        console.log({ formattedBirthdate });
        this.setState({
          Username: response.data.Username,
          // Password: response.data.Password,
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
  handleUpdate(e) {
    let token = localStorage.getItem("token");
    // console.log({ token });
    let user = localStorage.getItem("user");
    console.log(this.state);
    let setisValid = this.formValidation();
    if (setisValid) {
      console.log(this.props.setProfile(this.state));
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
          const data = response.data;
          localStorage.setItem("user", data.Username);
          console.log(data);
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
    let BirthdateError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 3) {
      PasswordError.passwordMissing = "You must enter a current or new password.(minimum 4 characters) ";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (this.state.birthdate === '') {
      BirthdateError.birthdateEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdateError: BirthdateError,
    })
    return isValid;
  };

  handleChange(e) {
    let { name, value } = e.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  render() {
    const { movies, user } = this.props;
    const { UsernameError, EmailError, PasswordError, BirthdateError } = this.state;
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12}>
              <Form className="justify-content-md-center mb-30">
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>

                <Form.Group controlId="formUsername">
                  <Form.Label>Username: </Form.Label>
                  <FormControl size="sm"
                    type="text"
                    name="Username"
                    value={this.state.Username}
                    onChange={(e) => this.handleChange(e)}
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
                  <Form.Label>Password: </Form.Label>
                  <FormControl size="sm"
                    type="password"
                    name="Password"
                    value={this.state.Password}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Enter your password or Change password" />
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
                  <FormControl
                    size="sm"
                    type="email"
                    name="Email"
                    value={this.state.Email}
                    onChange={(e) => this.handleChange(e)}
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
                  <FormControl
                    size="sm"
                    type="date"
                    name="Birthdate"
                    value={this.state.Birthdate}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Change Birthdate" />
                  {Object.keys(BirthdateError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {BirthdateError[key]}
                      </div>
                    );
                  })}

                </Form.Group>

                <Link to={`/users/${this.state.Username}`}>
                  <Button className="mb-2" variant="dark"
                    type="link"
                    size="md"
                    block
                    onClick={(e) => this.handleUpdate(e)}
                  >
                    Save changes
                    </Button>
                </Link>

                <Link to={`/`}>
                  <Button className="mb-2"
                    variant="primary"
                    type="submit"
                    size="md"
                    block
                  >
                    Back to Main
                  </Button>
                </Link>

                <Button className="mb-2" variant="danger"
                  size="md"
                  block
                  onClick={() => this.handleDelete()}
                >
                  Delete Account
                </Button>
              </Form>

              <div
                className="favoriteMovies"
                style={{
                  float: "center",
                  textAlign: "center",
                }}
              >
                <Card.Text className="mt-200" as='h3'>Your Favorite Movies:</Card.Text>
                <Row className='mb-20'>
                  {FavoriteMovieList.map((movie) => {
                    return (
                      <Col md={3} key={movie._id}>
                        <div key={movie._id}>
                          <Card className='mb-20'>
                            <Card.Img variant="top" src={movie.ImagePath} />
                            <Card.Body>
                              <Link to={`/movies/${movie._id}`}>
                                <Card.Title as='h6'>{movie.Title}</Card.Title>
                              </Link>
                            </Card.Body>
                          </Card>
                          <Button className='mb-30' onClick={() => this.removeFavorite(movie)}>
                            Remove
                      </Button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    favoriteMovies: state.favoriteMovies,
  }
}

export default connect(mapStateToProps, { setProfile })(ProfileView);

