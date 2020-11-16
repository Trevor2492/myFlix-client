import React, { useState } from 'react'; //This "useState" hook allows us to avoid the use of the component lifecycle methods
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './registration-view.scss'


export function RegistrationView(props) {
	const [ username, setUsername] = useState(''); //This assigns the current value to the "username" variable (in this case an empty string), AND assigns to the "setUsername" variable, a method to update the "username" variable
	const [ password, setPassword] = useState(''); //Same here but with the password
	const [ email, setEmail] = useState(''); //Same here but with the email
	const [ birthday, setBirthday] = useState(''); //Same here but with the birthday

	const handleRegister = (e) => {
		e.preventDefault(); // This prevents the default refresh of the page from the handleSubmit() method. Without it the page will refresh, which isn't the user experience we want
		axios.post('https://trevors-movies-api.herokuapp.com/users', {
			Username: username, 
			Password: password,
			Email: email,
			Birthday: birthday
		})
		.then(response => {
			const data = response.data;
			console.log(data);
			window.open('/', '_self'); //_self is necessary so that the page will open in the current tab
		})
		.catch(e => {
			console.log('error registering the user')
		});
	};

	return(
		<div>
			<div className="registration-view_header">Register</div>
			<Form className="register-form">
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control className="input" type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
					<Form.Text className="text-muted">
						We'll never share your username with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
				</Form.Group>

				<Form.Group controlId="formBasicBirthday">
					<Form.Label>Birthday</Form.Label>
					<Form.Control className="input" type="date" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>
				</Form.Group>

				<Button className="form-button" variant="primary" type="submit" onClick={handleRegister}>
					Register
				</Button>

				<div className="new-user">
					Already have an account?
				</div>
				<Link to={`/`}>
					<Button className="login-button" variant="link">Login Here</Button>
				</Link>
			</Form>
		</div>
	);

}