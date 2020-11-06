import React, { useState } from 'react'; //This "useState" hook allows us to avoid the use of the component lifecycle methods
import { RegistrationView } from '../registration-view/registration-view';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
	const [ username, setUsername] = useState(''); //This assigns the current value to the "username" variable (in this case an empty string), AND assigns to the "setUsername" variable, a method to update the "username" variable
	const [ password, setPassword] = useState(''); //Same here but with the password

	const handleSubmit = (e) => {
		e.preventDefault(); // This prevents the default refresh of the page from the handleSubmit() method. Without it the page will refresh, which isn't the user experience we want
		console.log(username, password);
		// send a request here to the server for authentication
		props.onLoggedIn(username); // This is just a quick workaround for the authentication for the app. It allows you to input anything into the username and password and still works
	};

	const regView = () => {
		console.log('something');
		return <RegistrationView/>;
	}

	return(
		<div>
			<div className="login-view_header">Movie App</div>
			<Form className="login-form">
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Username</Form.Label>
					<Form.Control className="input" type="email" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
					<Form.Text className="text-muted">
						We'll never share your username with anyone else.
					</Form.Text>
				</Form.Group>
			
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
				</Form.Group>
				<Button className="form-button" variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);

}