import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import "./update-profile.scss";

export function UpdateProfile(props) {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthday, updateDob] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log();
    axios
      .put(
        `https://trevors-movies-api.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        const data = res.data;
        console.log(data);
        alert("Profile updated");
        localStorage.removeItem('token'); // removes the user's credentials from the browser
        localStorage.removeItem('user');
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(username);
        alert("Error updating user. Please make sure to fill each section.");
      });
  };

  return (
    <Container className="UpdateContainer">
			<h1>Update Profile</h1><br/>
			<div className="note">Please fill each section</div><br/>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        />
      </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="01/01/1985"
            value={birthday}
            onChange={(e) => updateDob(e.target.value)}
          />
        </Form.Group>
        <Button
          className="update-button"
          variant="primary"
          type="submit"
          onClick={handleUpdate}
        >
          Update profile
        </Button>
        <br />
        <br />
        <Link to={`/users/:Username`}>
          <Button variant="link">
            Back
          </Button>
        </Link>
    </Container>
  );
}