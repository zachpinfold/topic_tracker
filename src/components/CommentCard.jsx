import React from 'react';

const CommentCard = ({author, body, created_at, votes}) => {
    return (
        <div>
            <p>{author}</p>
            <p>{body}</p>
            <p>{created_at}</p>
            <p>{votes}</p>
        </div>
    );
};

export default CommentCard;