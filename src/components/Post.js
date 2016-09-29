import moment from 'moment';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import './../styles/Post.css';

const Post = ({ message, author }) => {
    if (!author)
        console.log('!!', message, author);

    return (
        <div key={message.id} className="post-outer">
            <div className="post-author-info">
                <img className="post-thumbnail" alt="Thumbnail" src={author.thumbnail_url} />
                <span className="post-author-name">
                    {author.full_name}
                    <div className="italic">{author.description}</div>
                </span>
            </div>

            <div className="post-text">
                <ReactMarkdown className="markdown" escapeHtml={true} source={message.message_text} />
                <div className="post-time italic">{moment(message.created).locale('da').fromNow()}</div>
            </div>
        </div>
    );
}

export default Post;