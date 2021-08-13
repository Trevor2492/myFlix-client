import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component{

	render() {
		const {movie} = this.props;

		return(
				<Card className="movie-card_card">
					<Card.Img variant="top" className="card-img" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title style={{ fontSize: 25, fontWeight: 'bold' }}>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description.slice(0,75)}...</Card.Text>
						<Link to={`/movies/${movie._id}`}>
							<Button className="card-button" variant="primary">Learn More</Button>
						</Link>
					</Card.Body>
				</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: propTypes.shape({
		Title: propTypes.string.isRequired,
		Description: propTypes.string.isRequired,
		ImagePath: propTypes.string.isRequired
	}).isRequired
};