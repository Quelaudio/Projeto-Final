import React from 'react';

const Tweet = ({ tweet }) => (
  <div className="tweet">
    <h4>{tweet.username}</h4>
    <p>{tweet.content}</p>
  </div>
);

export default Tweet;
