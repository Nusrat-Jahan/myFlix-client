import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <Card border="info" bg="dark" text="white" className="director-card">

          <Card.Body>
            <Card.Title><span className='text-primary'>Name: </span> {director.Director.Name}</Card.Title>
            <Card.Text><span className='text-primary'>Bio: </span>{director.Director.Bio}</Card.Text>
            <Card.Text><span className='text-primary'>Birth: </span>{director.Director.Birth}</Card.Text>
            <Card.Text><span className='text-primary'>Death: </span>{director.Director.Death}</Card.Text>
            <Button block onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>

      </div>
    );
  }
}