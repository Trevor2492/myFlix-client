import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './director-view.scss';


export class DirectorView extends React.Component{

	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {director, movie} = this.props;

		if (!director) return null;

		return(
		<div>
			<Card className="director_card">
				<Card.Img variant="top" className="card-img" src={director.Image} />
				<Card.Body>
					<Card.Title>{director.Name}</Card.Title>
					<Card.Text>{director.Bio}</Card.Text>
					<Card.Text>Birth: {director.Birth}</Card.Text>

					<Link to={`/`}>
						<Button className="back-button" variant="outline-primary">&larr;</Button>
					</Link>
				</Card.Body>
			</Card>
		</div>
		);
	}

}