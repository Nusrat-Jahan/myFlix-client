import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'


export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    // return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    return (
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={movieData.ImagePath} />
          <Card.Body>
            <Card.Title>{movieData.Title}</Card.Title>
            <Card.Text>{movieData.Description}</Card.Text>
            <Button block onClick={() => onMovieClick(movieData)} variant="primary">Open</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    )
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    // ImagePath: PropTypes.arrayOf(PropTypes.string).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};