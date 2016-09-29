import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { fetchPosts, fetchUsers, setActiveUser } from './actions/actions';
import rootReducer from './reducers/reducers';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.subscribe(() => {
    const state = store.getState();

    if (state.activeUserId)
        localStorage.setItem('activeUserId', state.activeUserId);
});

Promise.all([store.dispatch(fetchUsers()), store.dispatch(fetchPosts())])
    .then(() => {
        let savedUserId = localStorage.getItem('activeUserId');
        if (savedUserId)
            store.dispatch(setActiveUser(parseInt(savedUserId, 10)));
        
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );

        const postPollingLoop = () => {
            store.dispatch(fetchPosts())
                .then(() => {
                    setTimeout(postPollingLoop, 5 * 1000);
                });
        }

        setTimeout(postPollingLoop, 5 * 1000);
    });

