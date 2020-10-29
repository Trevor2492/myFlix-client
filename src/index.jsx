import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that you need to bundle "./index.scss"
import './index.scss';

//Imports the "MainView" component from the "components" folder
import {MainView} from './components/main-view/main-view';

// This is the Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
	render() {
		return <MainView/>;
	}
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
