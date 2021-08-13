import React, { useReducer } from 'react';
import propTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './movie-view.scss';


class MovieView extends React.Component{

	likeMovie(){
		const token = localStorage.token;
		axios.post(`https://trevors-movies-api.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {}, {
			headers: {Authorization: `Bearer ${token}`} //Passing this bearer authorization in the header of the http request allows me to make authenticated requests to the API
		})
		.then(()=> {
			this.props.getUser();
		})
		.catch((error) => {
			console.log(error);
		})
	}

	dislikeMovie(){
		const token = localStorage.token;
		axios.delete(`https://trevors-movies-api.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {
			headers: {Authorization: `Bearer ${token}`} //Passing this bearer authorization in the header of the http request allows me to make authenticated requests to the API
		})
		.then(()=> {
			this.props.getUser();
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
		const {movie, getUser} = this.props;

		const user = this.props.user;

		console.log(user.FavoriteMovies);

		if (!movie) return null;

		const liked = (user.FavoriteMovies || []).indexOf(movie._id) !== -1;

		const handleClick = () => {
			return liked ? this.dislikeMovie() : this.likeMovie()
		}
		const buttonClass = liked ? "liked_button" : "disliked_button";

		return(
		<div>
			<Link to={"/"}>
				<Button className="back-button" variant="outline-primary">&larr;</Button>
			</Link>
			<Card className="movie-view_card">
				<Card.Img className="movie-view_image" variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title style={{ fontSize: '25px', fontWeight: 'bold' }}>{movie.Title}</Card.Title>
					<Card.Text>
						{movie.Description}
					</Card.Text>
					<Card.Text>
						Genre: {movie.Genre.Name}
					</Card.Text>
					<Card.Text>
						Director: {movie.Director.Name}
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
						<Button className={buttonClass} variant="primary" onClick={handleClick}>&#9825;</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
		);
	}

}

const mapStateToProps = state => {
	return state
};

export default connect(mapStateToProps)(MovieView);

MovieView.propTypes = {
	movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired
	}),
	getUser: propTypes.func.isRequired
};