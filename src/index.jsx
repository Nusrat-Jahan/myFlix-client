import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';
// import { MovieCard } from '../movie-card/movie-card';

// Import statement to indicate that I need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of my app which is index.html class app-container
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);