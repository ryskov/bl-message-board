import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

const ActiveUserName = ({ userName }) => {
    return (<span>{userName}</span>);
};

const ActiveUserNameContainer = connect(
    (state) => {
        return {
            userName: (_.findWhere(state.users.items, { id: state.activeUserId }) || { full_name: '' }).full_name
        };
    }
)(ActiveUserName);

export default ActiveUserNameContainer;