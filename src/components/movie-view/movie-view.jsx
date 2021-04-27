import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movieData.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movieData.Director.Name}</span>
        </div>
        <button onClick={() => { onBackClick(); }}>Back</button>
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