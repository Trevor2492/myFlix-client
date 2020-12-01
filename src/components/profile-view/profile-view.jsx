import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";


//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import './profile-view.scss';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://trevors-movies-api.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteFavoriteMovie(movieId) {
    console.log(this.props.movies);
    axios
      .delete(
        `https://trevors-movies-api.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert("Removed movie from favorites");
      })
      .catch((e) => {
        alert("error removing movie" + e);
      });
  }

  deleteUser(e) {
    axios
      .delete(
        `https://trevors-movies-api.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        alert("Your account was successfully deleted");
        localStorage.removeItem('token'); // removes the user's credentials from the browser
        localStorage.removeItem('user');    
        window.open("/", "_self");
      })
      .catch((event) => {
        alert("failed to delete user");
      });
  }

  render() {
    const favoriteMovieList = this.props.movies.filter((m) =>
      this.state.FavoriteMovies.includes(m._id)
    );

    return (
      <div>
        <Container>
          <Col>
            

            <Card className="profile-view_card">
            <h1>My Profile</h1>
            <br />
              <Card.Body>
                <Card.Text><span className="card-text">Username:</span> {this.state.Username}</Card.Text>
                <Card.Text><span className="card-text">Password:</span> xxxxxx</Card.Text>
                <Card.Text><span className="card-text">Email:</span> {this.state.Email}</Card.Text>
                <Card.Text><span className="card-text">Birthday:</span> {this.state.Birthday}</Card.Text>
                <br/>
                <br/>
                <span className="card-text">Favorite Movies:</span>
                {favoriteMovieList.map((m) => (
                  <div key={m._id} className="fav-movies-button">
                    <Link to={`/movies/${m._id}`}>
                      <Button variant="link">{m.Title}</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="profile-button"
                      onClick={(e) => this.deleteFavoriteMovie(m._id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <br />
                <br />
                <Link to={"/users/update"}>
                  <Button variant="primary" className="profile-button">Update Profile</Button>
                </Link>
                <br />
                <br />
                <Button className="delete-button" onClick={() => this.deleteUser()}>Delete My Account</Button>
                <br />
                <br />
                <Link to={`/`}>
                   <Button variant="link">Back</Button>
                </Link>
              </Card.Body>
            </Card>
            <Link to={"/"}>
				      <Button className="back-button" variant="outline-primary">&larr;</Button>
			      </Link>
          </Col>
        </Container>
      </div>
    );
  }
}

export default connect((state) => state)(ProfileView);
