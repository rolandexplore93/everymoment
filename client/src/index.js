import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './services/reducers';
import App from './App';
import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}>
        {/* // Initialize redux */}
        <Provider store={store}>  
            <App />
        </Provider>
    </GoogleOAuthProvider>
);