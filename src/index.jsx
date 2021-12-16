import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import Mainview from './components/main-view/main-view';

//Import statement to indicate that you need to bundle './index.scss
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)

class MyFlixApplication extends React.Component {
    render() {
        return (
          <Provider store={ store }>
            <Container>
              <Mainview />
            </Container>
          </Provider>
        );
    }
}

// Finds the root of your app
const container = document.getElementById('root')

// Tells React to render your app in the root DOM element

ReactDOM.render(React.createElement(MyFlixApplication), container);
