/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const [Feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tweets') 
      .then(response => {
        setFeed(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <ul>
        {Feed.map(feed => (
          <li key={feed.tweets_id}>{feed.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;