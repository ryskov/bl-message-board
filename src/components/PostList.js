import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import Post from './Post';

const PostList = ({ posts, authors }) => {
    return (
        <div>
            {posts.map((post) => { return <Post key={post.id} message={post} author={_.findWhere(authors, { id: post.author })} />; })}
        </div>
    );
}

const PostListContainer = connect(
    (state) => {
        return {
            posts: _.sortBy(_.values(state.posts.items), p => - (new Date(p.created).getTime())),
            authors: _.values(state.users.items)
        }
    }
)(PostList);

export default PostListContainer;