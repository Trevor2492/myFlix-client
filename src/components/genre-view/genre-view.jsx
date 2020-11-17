import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './genre-view.scss';


export class GenreView extends React.Component{

	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {genre} = this.props;

		if (!genre) return null;
		
		return(
		<div>
			<Card className="genre_card">
				<Card.Body>
					<Card.Title>{genre.Name}</Card.Title>
					<Card.Text>{genre.Description}</Card.Text>
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