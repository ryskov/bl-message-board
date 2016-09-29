import { connect } from 'react-redux';

import { postPost, fetchPosts } from './../actions/actions';

import TextInput from './TextInput';

const PostInput = connect(
    (state, ownProps) => {
        return {
            placeholder: ownProps.placeholder
        };
    },
    (dispatch) => {
        return {
            onSubmit: (input) => {
                dispatch(postPost(input))
                    .then(() => {
                        dispatch(fetchPosts());
                    });
            }
        }
    }
)(TextInput);

export default PostInput;