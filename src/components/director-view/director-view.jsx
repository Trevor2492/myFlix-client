import React from "react";
import propTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./director-view.scss";
import { connect } from "react-redux";

class DirectorView extends React.Component {
  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    const directorList = movies.filter(
      (m) => m.Director.Name === this.props.director.Name
    ); //This filters the list of movies by the director name and assigns them to "directorList"

    return (
      <div>
        <Card className="director_card">
          <Card.Img variant="top" className="card-img" src={director.Image} />
          <Card.Body>
            <Card.Title>
              <span className="section-header">{director.Name}</span>
            </Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <Card.Text>Birth: {director.Birth}</Card.Text>
            <Card.Text>
              <span className="section-header">Movies by this Director:</span>{" "}
              <br />
              <br />
              {directorList.map((m) => (
                <React.Fragment key={m._id}>
                  <Link to={`/movies/${m._id}`}>{m.Title}</Link>
                  <br />
                </React.Fragment>
              ))}
              <br />
            </Card.Text>
            <Link to={`/`}>
              <Button className="button" variant="outline-primary">
                Back
              </Button>
            </Link>

            <Link to={`/`}>
              <Button className="back-button" variant="outline-primary">
                &larr;
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect((state) => state)(DirectorView);

DirectorView.propTypes = {
    movie: propTypes.shape({
      Title: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
      ImagePath: propTypes.string.isRequired
    }),
    director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birth: propTypes.string.isRequired,
      Death: propTypes.string.isRequired
    })
};