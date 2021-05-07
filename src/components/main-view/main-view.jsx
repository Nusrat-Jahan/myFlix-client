import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup'

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      // register: null
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
  setSelectedMovie(movieData) { // custom component method—setSelectedMovie
    this.setState({
      selectedMovie: movieData
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    console.log("logout successfully");
  }

  getMovies(token) {
    axios.get('https://myflix-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getUsers(token) {
    axios.get('https://myflix-movie-app.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // onRegister(register) {
  //   this.setState({
  //     register
  //   });
  // }

  backToHome() {
    this.setState({
      selectedMovie: null
    });
  }

  render() { //predefined component method render
    const { movies, user, register } = this.state;
    // const movies=this.state.movies
    // const user =this.state.user
    // const register = this.state.register
    //this is the short version of this.state

    // let { } = this.props;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    //Register
    // if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />

    // Before the movies have been loaded
    // if (movies.length === 0)
    //   return <div className="main-view" />;
    // <button onClick={() => { this.onLoggedOut() }}>Logout</button>


    return (
      <Router>
        <div className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Row>{movies.map(m => (
              <Col xs={6} md={3} key={m._id}>
                <MovieCard movieData={m} />
              </Col>
            ))}
            </Row>
          }} />

          <Route path="/register" render={() => {
            // if (user) return <Redirect to="/" />
            if (!register)
              return <Col>
                <RegistrationView />
              </Col>
          }} />

          {/* <Link to={`/users/${user}`}>
            <Button variant="link" className="navbar-link">
              My Account
            </Button>
          </Link> */}
          <Route exact path="/users/:username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            return <Col md={6}>
              {/* if (users.length === 0) return <div className="main-view" />; */}
              {/* <ProfileView profile={users.find(m => m.Username === match.params.username).Users} onBackClick={() => history.goBack()} /> */}
              <ProfileView
                movies={movies}
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
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          {/* <Route exact path="username/movies/:movieID/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <ProfileView />
            </Col>
          }
          } /> */}
        </div>
      </Router >
    );
  }
}

// return (
//   <Row className="main-view justify-content-md-center">
//     {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
//     {selectedMovie
//       ?
//       (
//         <Col md={3}>
//           <MovieView movieData={selectedMovie} onBackClick={() => { this.backToHome() }} />
//         </Col>
//       )

//       : (
//         < CardGroup >
//           {movies.map(movie => (
//             <Col xs={6} md={3} key={movie._id}>
//               <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
//             </Col>
//           ))}
//         </CardGroup>
//       )
//     }
//   </Row> // movieData is reffered as props
// );
export default MainView;
