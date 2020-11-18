import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './genre-view.scss';


export class GenreView extends React.Component{

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const {movies, genre} = this.props;

		if (!genre) return null;

		const genreList = movies.filter(m => m.Genre.Name === this.props.genre.Name); //This filters the list of movies by the "comedy" genre and assigns them to "genreList"
		
		return(
		<div>
			<Card className="genre_card">
				<Card.Body>
					<Card.Title><span className="section-header">{genre.Name}</span></Card.Title>
					<Card.Text>{genre.Description}</Card.Text><br/>
					<Card.Text>
							<span className="section-header">Movies in this genre:</span> <br/><br/>
							{genreList.map(m => (
								<div>
									<Link to={`/movies/${m._id}`}>
										{m.Title}
									</Link>
								</div>
								))}
								<br/>
					</Card.Text>
					<Link to={`/`}>
						<Button className="button" variant="outline-primary">Back</Button>
					</Link>

					<Link to={`/`}>
						<Button className="back-button" variant="outline-primary">&larr;</Button>
					</Link>
				</Card.Body>
			</Card>
		</div>
		);
	}

}