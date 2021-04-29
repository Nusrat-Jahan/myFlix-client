import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Card border="info" bg="dark" text="white" className="movie-card">
          <Card.Img variant='top' src={movieData.ImagePath} />

          <Card.Body>
            <Card.Title><span className='text-primary'>Title: </span> {movieData.Title}</Card.Title>
            <Card.Text><span className='text-primary'>Description: </span>{movieData.Description}</Card.Text>
            <Card.Text><span className='text-primary'>Genre: </span>{movieData.Genre.Name}</Card.Text>
            <Card.Text><span className='text-primary'>ReleaseYear: </span>{movieData.ReleaseYear}</Card.Text>
            <Card.Text><span className='text-primary'>ImdbRating: </span>{movieData.ImdbRating}</Card.Text>
            <Button block onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>

      </div>
    );
  }
}
MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Birth: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};