import React, { useState } from 'react'; //This "useState" hook allows us to avoid the use of the component lifecycle methods

export function RegistrationView(props) {
	const [ username, setUsername] = useState(''); //This assigns the current value to the "username" variable (in this case an empty string), AND assigns to the "setUsername" variable, a method to update the "username" variable
	const [ password, setPassword] = useState(''); //Same here but with the password
	const [ email, setEmail] = useState(''); //Same here but with the email
	const [ birthday, setBirthday] = useState(''); //Same here but with the birthday

	return(
		<form>
			<label>
				Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
			</label>
			<label>
				Password: <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
			</label>
			<label>
				Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
			</label>
			<label>
				Date of Birth: <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
			</label>
			<button type="button">Submit</button>
		</form>
	);

}