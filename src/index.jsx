import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement to indicate that you need to bundle "./index.scss"
import './index.scss';

//Imports the "MainView" component from the "components" folder
import MainView from './components/main-view/main-view';

const store = createStore(moviesApp, devToolsEnhancer());

// This is the Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
	render() {
		return(
			<Provider store={store}>
				<MainView/>
			</Provider>
		);
	}
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
