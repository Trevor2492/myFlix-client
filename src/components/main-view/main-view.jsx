import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		super(); // This calls the superclass constructor so React can initialize it

		this.state = {
			movies: [],
			selectedMovie: null
		}; // Initializes the state to an empty object so we can destructure it later
	}

	// One of the "hooks" available in a React component
	componentDidMount(){
		axios.get('<https://trevors-movies-api.herokuapp.com/movies>')
			.then (response => {
				this.setState({ //Assign the result to the state
					movies: response.data
				});
			})
			.catch(function(error){
				console.log(error);
			});
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	render() { 
		const {movies, selectedMovie} = this.state; //If the state isn't initialized, this will throw on runtime before the data is initially loaded
		 
		if (!movies) return <div className="main-view"/>; //Before the movies have been loaded

		return ( 
			<div className="main-view">
				{selectedMovie
					? <MovieView movie={selectedMovie}/>
					:	movies.map(movie => (
						<MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
					))
				}
			</div>
		);
	}
}