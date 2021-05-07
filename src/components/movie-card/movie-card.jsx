import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    // return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    return (
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`}>
            <Button className="mb-2" block variant="primary">Open</Button>
          </Link>
          <Link to={`/directors/${movieData.Director.Name}`}>
            <Button className="mb-2" block variant="primary">Director</Button>
          </Link>

          <Link to={`/genres/${movieData.Genre.Name}`}>
            <Button className="mb-2" block variant="primary">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired
    // ImagePath: PropTypes.arrayOf(PropTypes.string).isRequired,
    //   ImagePath: PropTypes.string.isRequired,
    //   Genre: PropTypes.shape({
    //     Name: PropTypes.string.isRequired,
    //     Description: PropTypes.string.isRequired
    //   }),
    //   Director: PropTypes.shape({
    //     Name: PropTypes.string.isRequired,
    //     Bio: PropTypes.string.isRequired,
    //     Birth: PropTypes.string.isRequired,
    //     Death: PropTypes.string,
    //   }),
  }).isRequired,
};