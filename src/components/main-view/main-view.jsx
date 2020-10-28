import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
	constructor() {
		super(); // This calls the superclass constructor so React can initialize it

		this.state = {}; // Initializes the state to an empty object so we can destructure it later
	}

	componentDidMount(){
		
	}

	render() {
		return (
			<div className="main-view"></div>
		);
	}
}