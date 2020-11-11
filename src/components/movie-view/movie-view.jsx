import React, { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';


export class MovieView extends React.Component{

	constructor() {
		super();

		this.state = {};
	}

	favMovie(){
		user.FavoriteMovies.push(movie); // This is where the issue is happening. 'user' is defined as a string='trevortest', which is the username for this user. It needs to be the whole user object.
		console.log('You liked that movie'); 
	}

	render() {
		const {movie, user} = this.props;

		if (!movie) return null;

		return(
		<div>
			<Link to={"/"}>
				<Button className="back-button" variant="outline-primary">&larr;</Button>
			</Link>
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

					<div className="movie-view_buttons">
						<Link to={`/`}>
							<Button className="movie-view_button" variant="primary">Back</Button>
						</Link>
						<Link to={`/directors/${movie.Director.Name}`}>
							<Button className="movie-view_button" variant="primary">Director</Button>
						</Link>
						<Link to={`/genres/${movie.Genre.Name}`}>
							<Button className="movie-view_button" variant="primary">Genre</Button>
						</Link>
						<Button className="movie-view_button" variant="primary" onClick={() => this.favMovie()}>&#9825;</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
		);
	}

}