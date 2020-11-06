import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';


export class MovieView extends React.Component{

	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {movie, onClick} = this.props;

		if (!movie) return null;

		return(
		<div>
			<Button className="back-button" variant="outline-primary" onClick={() => onClick(!movie)}>&larr;</Button>
			<Card className="movie-view_card">
				<Card.Img className="movie-view_image" variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>
						{movie.Description}
					</Card.Text>
					<Card.Text>
						{movie.Genre.Name}
					</Card.Text>
					<Card.Text>
						{movie.Director.Name}
					</Card.Text>
					<Button className="movie-view_button" variant="primary" onClick={() => onClick(!movie)}>Back</Button>
				</Card.Body>
			</Card>
		</div>
		);
	}

}