import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUsers } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();
    this.state = {
      selectedMovie: null,
      user: null,
    };
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movieData) { // custom component method—setSelectedMovie
    this.setState({
      selectedMovie: movieData
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUsers(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUsers(null);
    console.log("logout successfully");
  }
  //  get movies method to get movies data from api
  getMovies(token) {
    axios.get('https://myflix-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token, user) {
    axios.get('https://myflix-movie-app.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // To persist login data
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUsers(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  backToHome() {
    this.setState({
      selectedMovie: null
    });
  }

  render() { //predefined component method render
    let { movies, user } = this.props;
    // const { user } = this.state;

    return (
      <Router>
        <div className="main-view justify-content-md-center">
          <Navbar
            bg="primary"
            expand="lg"
            sticky="top"
            variant="dark"
            expand="lg"
            className="navbar shadow-sm mb-5"
          >
            <Navbar.Brand href="http://localhost:1234" className="navbar-brand">
              myFlix
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link text-light">
                      Login
                  </Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="navbar-link text-light">
                      Register
                  </Button>
                  </Link>
                </ul >
              ) : (
                <ul>
                  <Link to={`/users/${user}`}>
                    <Button variant="link" className="navbar-link text-light">
                      My Account
                  </Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link text-light">
                      Movies
                  </Button>
                  </Link >
                  <Link to={`/`}>
                    <Button
                      variant="link"
                      className="navbar-link text-light"
                      onClick={() => this.onLoggedOut()}
                    >
                      Logout
                  </Button>
                  </Link >
                </ul >
              )
              }
            </Navbar.Collapse>
          </Navbar >

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/users/:username" render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            return <Col md={12}>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            return <Col md={6}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          {/* Footer for all view  */}
          <div className='footer bg-primary p-3 mt-5 mb-3' sticky="bottom" >
            <h6 className='text-center text-light my-0'>
              Copyright &copy; 2021 | Nusrat Jahan</h6>
            <div className='text-center my-0'>
              <h6 className='text-light'>
                jahannusrat735@gmail.com
              </h6>
            </div>
          </div>
        </div >
      </Router >
    );
  }
}

// mapStateToProps to subscribe to the store update
let mapStateToProps = state => {
  return {
    //mapping movies, user prop to the state
    movies: state.movies,
    user: state.user,
  }
}

// MainView no longer carries its own state -> movies from the store
// MovieCard components -> MoviesList component
export default connect(mapStateToProps, { setMovies, setUsers })(MainView);
