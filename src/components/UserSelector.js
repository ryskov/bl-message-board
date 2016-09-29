import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { setActiveUser } from './../actions/actions';

const UserSelector = ({ users, currentUserId, onUserSelect }) => {
    return (
        <div>
            {users.map((user) => { 
                if (user.id === currentUserId)
                    return <img key={user.id} className="user-select-thumbnail current-user" alt="Thumbnail" src={user.thumbnail_url} />
                else
                    return <img key={user.id} className="user-select-thumbnail" alt="Thumbnail" src={user.thumbnail_url} onClick={() => { onUserSelect(user.id); }} />
            })}
        </div>
    );
};

const UserSelectorContainer = connect(
    (state) => {
        return {
            users: _.values(state.users.items),
            currentUserId: state.activeUserId
        }
    },
    (dispatch) => {
        return {
            onUserSelect: (userId) => {
                dispatch(setActiveUser(userId));
            }
        };    
    }
)(UserSelector);

export default UserSelectorContainer;

