import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            users: [],
            currentUser: null
        };
    }

    httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    getUrl() {
        return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }


    loadMessages() {
        this.httpGetAsync(this.getUrl() + '/messages', (result) => {
            let parsedRes = null;
            try {
                parsedRes = JSON.parse(result);
            }
            catch (e) {
                return;
            }

            this.setState({
                messages: parsedRes.data
            });
        });
    }

    loadUsers() {
        this.httpGetAsync(this.getUrl() + '/users', (result) => {
            let parsedRes = null;
            try {
                parsedRes = JSON.parse(result);
            }
            catch (e) {
                return;
            }

            this.setState({
                users: parsedRes.data
            }, () => {
                if (this.state.currentUser === null && this.state.users.length > 0)
                    this.setState({
                        currentUser: this.state.users[0]
                    });
            });
        });
    }

    componentWillMount() {
        this.loadUsers();
        this.loadMessages();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Lystens Blomme - Opslagstavle</h2>
                </div>
                <p className="App-body">
                    {
                        this.state.users.map((user) => {
                            if (this.state.currentUser !== null && this.state.currentUser.id === user.id)
                                return <img className="thumbnail current-user" src={user.thumbnail_url} />;
                            else
                                return <img onClick={() => { this.setState({ currentUser: user }); }} className="thumbnail" src={user.thumbnail_url} />;
                        })
                    }
                    {
                        this.state.messages.map((message) => {
                            let author = this.state.users.filter((user) => {
                                return user.id === message.author;
                            });

                            author = author[0];

                            return (
                                <div className="message-container">
                                    <div className="message-author-thumbnail">
                                        <img className="thumbnail" src={author.thumbnail_url} />
                                    </div>
                                    <div className="message-text">
                                        <p>{message.message_text}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </p>
            </div>
        );
    }
}

export default App;