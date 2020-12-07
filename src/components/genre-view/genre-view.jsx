import React from "react";
import propTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./genre-view.scss";
import { connect } from "react-redux";

class GenreView extends React.Component {
  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    const genreList = movies.filter((m) => m.Genre.Name === this.props.genre.Name); //This filters the list of movies by the "comedy" genre and assigns them to "genreList"

    return (
      <div>
        <Card className="genre_card">
          <Card.Body>
            <Card.Title>
              <span className="section-header">{genre.Name}</span>
            </Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <br />
            <Card.Text>
              <span className="section-header">Movies in this genre:</span>{" "}
              <br />
              <br />
              {genreList.map((m) => (
                <React.Fragment key={m._id}>
                  <Link to={`/movies/${m._id}`}>{m.Title}</Link>
                  <br />
                </React.Fragment>
              ))}
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

export default connect((state) => state)(GenreView);

GenreView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired
  }),
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired
  }) 
};