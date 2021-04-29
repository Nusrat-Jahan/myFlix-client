import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix-movie-app.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movieData) {
    this.setState({
      selectedMovie: movieData
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  backToHome() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    //Register
    if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />

    // Before the movies have been loaded
    if (movies.length === 0)
      return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ?
          (
            <Col md={3}>
              <MovieView movieData={selectedMovie} onBackClick={() => { this.backToHome() }} />
            </Col>
          )
          : movies.map(movie => (
            <Col xs={6} md={3} key={movie._id}>
              <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row> // movieData is reffered as props
    );
  }
}
export default MainView;
