import React, { useState } from 'react'; //This "useState" hook allows us to avoid the use of the component lifecycle methods
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
	const [ username, setUsername] = useState(''); //This assigns the current value to the "username" variable (in this case an empty string), AND assigns to the "setUsername" variable, a method to update the "username" variable
	const [ password, setPassword] = useState(''); //Same here but with the password
	const [ isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault(); // This prevents the default refresh of the page from the handleSubmit() method. Without it the page will refresh, which isn't the user experience we want
		setIsLoading(true);
		axios.post('https://trevors-movies-api.herokuapp.com/login', {
			Username: username, 
			Password: password
		})
		.then(response => {
			const data = response.data;
			props.onLoggedIn(data);
		})
		.catch(e => {
			console.log('no such user');
			alert('Invalid username or password');
		});
		setIsLoading(false);
	};

	return(
		<div>
			{ isLoading ? <Loading/> : 
			<div>
				<div className="login-view_header">MyFlix</div>
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
						Login
					</Button>
					<div className="new-user">
						New User?
					</div>
						<Link to={`/register`}>
							<Button className="register-button" variant="link">Register Here</Button>
						</Link>
					
				</Form>
				
			</div>
			}
		</div>
	);

}