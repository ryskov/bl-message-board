import React from 'react';
import './App.css';

import PostList from './components/PostList';
import ActiveUserName from './components/ActiveUserName';
import UserSelector from './components/UserSelector';
import PostInput from './components/PostInput';

const App = () => {
    return (
        <div className="app">
            <div className="app-header">
                <h2>Lystens Blomme</h2>
                <h3>Opslagstavle</h3>
            </div>
            <div className="app-body">
                <UserSelector />

                <div className="posting-as italic">
                    Kommenterer som <ActiveUserName />
                </div>

                <div className="message-input-container">
                    <PostInput placeholder={'Skriv besked\n...'} />
                </div>

                <PostList />
            </div>
        </div>
    );
};

export default App;