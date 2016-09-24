import React, { Component } from 'react';
import './App.css';
import HTTPHelper from './HTTPHelper';
import moment from 'moment-timezone';

class App extends Component {
    constructor(props) {
        super(props);

        this.messagePollInterval = null;

        this.state = {
            messages: [],
            users: [],
            currentUser: null,
            shiftIsPressed: false
        };
    }

    componentDidMount() {
        this.messagePollInterval = setInterval(() => {
            this.loadMessages();
        }, 5000);
    }

    componentWillMount() {
        this.loadUsers();
        this.loadMessages();
    }

    postMessage(msg) {
        if (!this.refs.messageInput.value)
            return;

        HTTPHelper.post('/messages', { author: this.state.currentUser.id, message_text: this.refs.messageInput.value })
            .then(this.loadMessages.bind(this))

        this.refs.messageInput.value = "";
        this.refs.messageInput.blur();
    }

    loadMessages() {
        HTTPHelper.get('/messages')
            .then((result) => {
                this.setState({
                    messages: result.data
                });
            })
            .catch((sCode) => { console.error(sCode); });

    }

    loadUsers() {
        HTTPHelper.get('/users')
            .then((result) => {
                this.setState({
                    users: result.data
                }, () => {
                    let savedUserId = localStorage.getItem('currentUserId');
                    if (this.state.currentUser === null && this.state.users.length > 0) {
                        if (savedUserId) {
                            console.log(savedUserId, this.state.users);
                            let savedUser = this.state.users.filter((user) => {
                                return user.id === parseInt(savedUserId, 10);
                            });

                            this.setState({
                                currentUser: savedUser[0]
                            });
                        }
                        else {
                            this.setCurrentUser(this.state.users[0]);
                        }
                    }
                });
            });
    }
    messageInputKeyDown(e) {
        switch (e.keyCode) {
            case 13: // enter
                if (!this.state.shiftIsPressed) {
                    this.postMessage();
                    e.preventDefault();
                }
                break;
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: true
                });
                break;
            default:
                break;
        }
    }

    messageInputKeyUp(e) {
        switch (e.keyCode) {
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: false
                });
                break;
            default:
                break;
        }
    }

    setCurrentUser(user) {
        this.setState({
            currentUser: user
        }, () => {
            localStorage.setItem('currentUserId', user.id);
        });
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <h2 style={{ margin: '0px' }}>Lystens Blomme</h2>
                    <h3>Opslagstavle</h3>
                </div>
                <div className="app-body">
                    {
                        this.state.users.map((user) => {
                            if (this.state.currentUser !== null && this.state.currentUser.id === user.id)
                                return <img key={user.id} className="user-select-thumbnail current-user" alt="Thumbnail" src={user.thumbnail_url} />;
                            else
                                return <img key={user.id} onClick={this.setCurrentUser.bind(this, user)} className="user-select-thumbnail" alt="Thumbnail" src={user.thumbnail_url} />;
                        })
                    }
                    <div className="posting-as italic">Kommenterer som {this.state.currentUser ? this.state.currentUser.full_name : null}</div>
                    <div className="message-input-container">
                        <textarea
                            ref="messageInput"
                            className="message-input"
                            onFocus={() => { this.refs.messageInput.placeholder = ""; } }
                            onBlur={() => { this.refs.messageInput.placeholder = "Skriv besked..." } }
                            placeholder="Skriv besked..."
                            onKeyDown={this.messageInputKeyDown.bind(this) }
                            onKeyUp={this.messageInputKeyUp.bind(this) } />
                    </div>

                    {
                        this.state.messages.map((message) => {
                            let author = this.state.users.filter((user) => {
                                return user.id === message.author;
                            });

                            author = author[0];

                            return (
                                <div key={message.id} className="message-container">
                                    <div className="message-author-info">
                                        <img className="thumbnail" alt="Thumbnail" src={author.thumbnail_url} />
                                        <span className="message-author-name">
                                            {author.full_name}
                                            <div className="italic">{author.description}</div>
                                        </span>
                                    </div>

                                    <div className="message-text">
                                        {message.message_text}
                                        <div className="message-time italic">{moment(message.created).locale('da').fromNow()}</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;