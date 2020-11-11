import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import Button from 'react-bootstrap/Button';

import './main-view.scss';


export class MainView extends React.Component {
	constructor() {
		super(); // This calls the superclass constructor so React can initialize it

		this.state = {
			movies: [],
			user: null
		}; // Initializes the state to an empty object so we can destructure it later
	}

	// One of the "hooks" available in a React component
	componentDidMount(){
		let	accessToken = localStorage.getItem('token'); //This gets the value of the token from localStorage in the clients browser

		if (accessToken !== null){
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	
	}

	onLoggedIn(authData) { // This method gets triggered when the user logs in the LoginView
		console.log(authData);
		this.setState({
			user: authData.user.Username //the users username is saved in the user state
		});

		localStorage.setItem('token', authData.token); //localStorage is a way to store data in the client's browser. the "setItem" method accepts a key and a value
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	getMovies(token) {
		axios.get('https://trevors-movies-api.herokuapp.com/movies', {
			headers: {Authorization: `Bearer ${token}`} //Passing this bearer authorization in the header of the http request allows me to make authenticated requests to the API
		})
		.then(response => {
			this.setState({
				movies: response.data,
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	logOut () { //this method is called when the user clicks the "logout" button in the main view
		localStorage.removeItem('token'); // removes the user's credentials from the browser
		localStorage.removeItem('user');

		this.setState({ // resets the user state to null, thus logging them out. Also sets the selectedMovie to null which resets the movie view on login
			user: null,
		});
		console.log('you were logged out');
	}

	render() { 
		const {movies, user} = this.state; //If the state isn't initialized, this will throw on runtime before the data is initially loaded

		return ( 
			<div>
				<nav className="nav">
					<Button className="nav-item" variant="link">My Account</Button>
					<Button className="nav-item" variant="link" onClick={() => this.logOut()}>Logout</Button>
				</nav>

				<Router>
					<div className="main-view">
						<Route exact path="/" render={() => {
							if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
							return movies.map(m => <MovieCard key={m._id} movie={m} />)
							}
						}/>
						<Route path="/register" render={() => <RegistrationView/>} />

						<Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user}/>}/>

						<Route exact path="/genres/:name" render={({match}) => {if (!movies) return <div className="main-view"/>;
							return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}}/>

						<Route exact path="/directors/:name" render={({match}) => {if (!movies) return <div className="main-view"/>;
							return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}}/>

						<Route exact path="/users" render={() => <RegistrationView/>}/>
					</div>
				</Router>
			</div>
		);
	}
}