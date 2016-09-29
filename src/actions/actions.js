import HTTPHelper from './../HTTPHelper';

export const ACTIONS = {
    REQUEST_POSTS: 'request-posts',
    RECEIVE_POSTS: 'receive-posts',

    POST_POST_START: 'post-post-start', // lol @ name
    POST_POST_COMPLETE: 'post-post-complete',

    REQUEST_USERS: 'request-users',
    RECEIVE_USERS: 'receive-users',

    SET_ACTIVE_USER: 'set-active-user'
};

const requestPosts = () => {
    return {
        type: ACTIONS.REQUEST_POSTS
    };
};

const receivePosts = (posts) => {
    return {
        type: ACTIONS.RECEIVE_POSTS,
        posts,
        receivedAt: Date.now()
    };
};

const requestUsers = () => {
    return {
        type: ACTIONS.REQUEST_USERS
    };
};

const receiveUsers = (users) => {
    return {
        type: ACTIONS.RECEIVE_USERS,
        users,
        receivedAt: Date.now()
    };
};

const postPostStarted = (postText) => {
    return {
        type: ACTIONS.POST_POST_START,
        postText: postText
    };
}

const postPostComplete = (postId) => {
    return {
        type: ACTIONS.POST_POST_COMPLETE,
        postId
    };
}

export const postPost = (postText) => {
    return (dispatch, getState) => {
        let author = getState().activeUserId;
        dispatch(postPostStarted(postText));

        return HTTPHelper.post('/messages', { author, message_text: postText })
            .then(() => {
                dispatch(postPostComplete());
            });
    };
}

export const setActiveUser = (activeUserId) => {
    return {
        type: ACTIONS.SET_ACTIVE_USER,
        activeUserId
    };
};

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(requestPosts());

        return HTTPHelper.get('/messages')
            .then(results => results.data)
            .then(posts => {
                dispatch(receivePosts(posts));
            });
    };
};

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(requestUsers());

        return HTTPHelper.get('/users')
            .then(results => results.data)
            .then(users => {
                dispatch(receiveUsers(users));
            });
    };
};