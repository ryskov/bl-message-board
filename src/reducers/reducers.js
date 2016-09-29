import { combineReducers } from 'redux';

import { ACTIONS } from './../actions/actions';

const currentTab = (state = 'posts', action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const tabs = (state = {
    'posts': {
        name: 'posts',
        label: 'Opslagstavle'
    },
    'tasks': {
        name: 'tasks',
        label: 'Opgaver'
    }
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const posts = (state = {
    isFetching: false,
    items: {}
}, action) => {
    switch (action.type) {
        case ACTIONS.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ACTIONS.RECEIVE_POSTS:
            let items = {};
            action.posts.forEach((post) => { items[post.id] = post; });

            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                items
            });
        default:
            return state;
    }
};

const users = (state = {
    isFetching: false,
    items: {}
}, action) => {
    switch (action.type) {
        case ACTIONS.REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ACTIONS.RECEIVE_USERS:
            let items = {};
            action.users.forEach((user) => { items[user.id] = user; });

            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                items
            });
        default:
            return state;
    }
}

const activeUserId = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.SET_ACTIVE_USER:
            return action.activeUserId;
        default:
            return state;
    }
};

export default combineReducers({
    activeUserId,
    currentTab,
    tabs,
    posts,
    users
});