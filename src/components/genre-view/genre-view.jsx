import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <Card border="info" bg="dark" text="white" className="genre-card">

          <Card.Body>
            <Card.Title><span className='text-primary'>Name: </span> {genre.Name}</Card.Title>
            <Card.Text><span className='text-primary'>Bio: </span>{genre.Description}</Card.Text>
            <Button block onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};