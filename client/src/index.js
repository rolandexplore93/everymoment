import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './services/reducers';
import App from './App';
import './index.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    // Initialize redux
    <Provider store={store}>  
        <App />
    </Provider>
);